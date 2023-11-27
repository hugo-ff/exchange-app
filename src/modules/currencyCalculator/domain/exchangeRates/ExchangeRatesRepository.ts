import { ICurrency } from "../currency/ICurrency";

export interface ExchangeRatesRepository {
	save: (baseCurrency: ICurrency, rates: Map<string, number>, expirationTime: number) => void;
	get: (baseCurrency: ICurrency) => Map<string, number> | null;
}
