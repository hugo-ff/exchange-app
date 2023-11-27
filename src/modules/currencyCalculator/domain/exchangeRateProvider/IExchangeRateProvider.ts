import { ICurrency } from "../currency/ICurrency";

export interface IExchangeRateProvider {
	getExchangeRate(fromCurrency: ICurrency, toCurrency: ICurrency): number;
}
