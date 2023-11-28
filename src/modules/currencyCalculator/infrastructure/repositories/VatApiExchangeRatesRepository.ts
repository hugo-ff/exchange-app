import { ICurrency } from "../../domain/currency/ICurrency";
import { ExchangeRates } from "../../domain/exchangeRates/ExchangeRates";
import { IExchangeRatesRepository } from "../../domain/exchangeRates/IExchangeRatesRepository";
import { VatApiExchangeRatesResponse } from "./VatApiExchangeRatesResponse";

function calculateNextBusinessDay16hCET(): number {
	const now = new Date();
	const localOffsetInMinutes = now.getTimezoneOffset();
	const CETOffset = -(localOffsetInMinutes / 60) + 1;
	const currentHour = now.getUTCHours() + CETOffset;

	if (currentHour < 16) {
		now.setUTCHours(16, 0, 0, 0);
	} else {
		now.setDate(now.getUTCDate() + 1);

		while (now.getUTCDay() === 0 || now.getUTCDay() === 6) {
			now.setDate(now.getUTCDate() + 1);
		}

		now.setUTCHours(16, 0, 0, 0);
	}

	return now.getTime();
}

interface StoredData {
	rates: ExchangeRates;
	expirationTime: number;
}

export class VatApiExchangeRatesRepository implements IExchangeRatesRepository {
	private readonly storageKeyPrefix = "exchange_rates_";
	private readonly endpoint = "https://api.vatcomply.com/rates";
	private readonly cache: Storage = localStorage;

	async get(baseCurrency: ICurrency): Promise<ExchangeRates> {
		const storageKey = this.getStorageKey(baseCurrency);
		try {
			const storedData = this.cache.getItem(storageKey);

			if (storedData) {
				const parsedData = JSON.parse(storedData) as StoredData;

				if (parsedData.expirationTime && parsedData.expirationTime < Date.now()) {
					this.cache.removeItem(storageKey);
				} else {
					return parsedData.rates;
				}
			}

			const apiUrl = `${this.endpoint}?base=${baseCurrency.code}`;
			const response = await fetch(apiUrl);

			if (!response.ok) {
				throw new Error(`Failed to fetch exchange rates. Status: ${response.status}`);
			}

			const data = (await response.json()) as VatApiExchangeRatesResponse;

			this.save(baseCurrency, data.rates);

			return data.rates;
		} catch (error) {
			console.error(`Error fetching exchange rates from API: ${(error as Error).message}`);
			throw error;
		}
	}

	private save(baseCurrency: ICurrency, rates: ExchangeRates): void {
		const storageKey = this.getStorageKey(baseCurrency);
		const expirationTime = calculateNextBusinessDay16hCET();

		const dataToSave: StoredData = { rates, expirationTime };

		this.cache.setItem(storageKey, JSON.stringify(dataToSave));
	}

	private getStorageKey(baseCurrency: ICurrency): string {
		return `${this.storageKeyPrefix}${baseCurrency.code}`;
	}
}
