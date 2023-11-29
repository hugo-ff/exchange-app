import { ICurrency } from "../currency/ICurrency";
import { ExchangeRates } from "./ExchangeRates";

export interface ExchangeRatesRepository {
	get: (baseCurrency: ICurrency) => Promise<ExchangeRates>;
}
