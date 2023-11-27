import { ICurrency } from "../domain/currency/ICurrency";
import { ExchangeRatesRepository } from "../domain/exchangeRates/ExchangeRatesRepository";

const STORAGE_KEY_PREFIX = "exchange_rates_";

export interface StoredData {
	rates: [string, number][];
	expirationTime: number;
}

export function createLocalStorageExchangeRatesRepository(): ExchangeRatesRepository {
	return {
		save,
		get,
	};
}

export function getStorageKey(baseCurrency: ICurrency): string {
	return `${STORAGE_KEY_PREFIX}${baseCurrency.getCode()}`;
}

function save(baseCurrency: ICurrency, rates: Map<string, number>) {
	const storageKey = getStorageKey(baseCurrency);
	const expirationTime = calculateNextBusinessDay16hCET();

	const dataToSave: StoredData = { rates: Array.from(rates.entries()), expirationTime };

	localStorage.setItem(storageKey, JSON.stringify(dataToSave));
}

function get(baseCurrency: ICurrency): Map<string, number> | null {
	const storageKey = getStorageKey(baseCurrency);
	const storedData = localStorage.getItem(storageKey);

	if (!storedData) {
		return null;
	}

	const parsedData = JSON.parse(storedData) as StoredData;

	if (parsedData.expirationTime && parsedData.expirationTime < Date.now()) {
		localStorage.removeItem(storageKey);

		return null;
	}

	return new Map(parsedData.rates);
}

function calculateNextBusinessDay16hCET(): number {
	const now = new Date();
	const CETOffset = 1; // UTC+1 for CET
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
