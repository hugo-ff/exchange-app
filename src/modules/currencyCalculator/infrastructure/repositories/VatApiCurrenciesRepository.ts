import { ICurrency } from "../../domain/currency/ICurrency";
import { currenciesAdapter } from "../adapters/currenciesAdapter";
import { VatApiCurrenciesResponses } from "./VatApiCurrenciesResponses";

export class VatApiCurrenciesRepository {
	private readonly endpoint = "https://api.vatcomply.com/currencies";

	async getAll(): Promise<ICurrency[]> {
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
