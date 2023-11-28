import { ICurrency } from "../currency/ICurrency";
import { ExchangeRates } from "./ExchangeRates";

export interface IExchangeRatesRepository {
	get: (baseCurrency: ICurrency) => Promise<ExchangeRates>;
}
