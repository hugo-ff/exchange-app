import { ICurrency } from "../currency/ICurrency";

export interface CurrenciesRepository {
	getAll: () => Promise<ICurrency[]>;
}
