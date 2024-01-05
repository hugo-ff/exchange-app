import { CurrenciesRepository } from "../../../application/currencies-repository";
import type { Currency } from "../../../domain/currency";
import { currenciesAdapter } from "../../adapters/currencies-adapter";
import { VITE_CURRENCIES_ENDPOINT } from "./constants";

export interface VatApiCurrenciesResponses {
	[currencyCode: string]: {
		name: string;
		symbol: string;
	};
}

export class VatApiCurrenciesRepository implements CurrenciesRepository {
	private readonly endpoint = VITE_CURRENCIES_ENDPOINT;

	async getAll(): Promise<Currency[]> {
		try {
			const response = await fetch(this.endpoint);
			if (!response.ok) {
				throw new Error(`Failed to fetch currencies. Status: ${response.status}`);
			}
			const data = (await response.json()) as VatApiCurrenciesResponses;

			const adaptedData = currenciesAdapter(data);

			return adaptedData;
		} catch (error) {
			console.error(`Error fetching currencies from API: ${(error as Error).message}`);
			throw error;
		}
	}
}
