import type { Currency } from "../domain/currency";

export interface CurrenciesRepository {
	getAll: () => Promise<Currency[]>;
}
