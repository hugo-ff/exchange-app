import { ICurrency } from "../../domain/currency/ICurrency";
import { ExchangeRates } from "../../domain/exchangeRates/ExchangeRates";
import { ExchangeRatesRepository } from "../../domain/exchangeRates/ExchangeRatesRepository";
import { StorageStrategy } from "./StorageStrategy";
import { VatApiExchangeRatesResponse } from "./VatApiExchangeRatesResponse";

interface StoredData {
	rates: ExchangeRates;
	expirationTime: number;
}

export class VatApiExchangeRatesRepository implements ExchangeRatesRepository {
	private readonly storageKeyPrefix = "exchange_rates_";
	private readonly endpoint = "https://api.vatcomply.com/rates";
	private readonly storage: StorageStrategy;

	constructor(storage: StorageStrategy) {
		this.storage = storage;
	}

	async get(baseCurrency: ICurrency): Promise<ExchangeRates> {
		const storageKey = this.getStorageKey(baseCurrency);
		const storedData = this.storage.get(storageKey);

		if (storedData) {
			const parsedData = JSON.parse(storedData) as StoredData;

			if (this.isCacheValid(parsedData)) {
				return parsedData.rates;
			}
			this.storage.remove(storageKey);
		}

		return this.fetchAndCacheRates(baseCurrency);
	}

	private async fetchAndCacheRates(baseCurrency: ICurrency): Promise<ExchangeRates> {
		try {
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
		const expirationTime = this.calculateNextBusinessDay16hCET();

		const dataToSave: StoredData = { rates, expirationTime };

		this.storage.save(storageKey, JSON.stringify(dataToSave));
	}

	private isCacheValid(parsedData: StoredData): boolean {
		return !!(parsedData.expirationTime && parsedData.expirationTime > Date.now());
	}

	private getStorageKey(baseCurrency: ICurrency): string {
		return `${this.storageKeyPrefix}${baseCurrency.code}`;
	}

	private calculateNextBusinessDay16hCET(): number {
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
}
