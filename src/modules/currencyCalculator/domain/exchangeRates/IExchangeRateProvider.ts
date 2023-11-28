import { ICurrency } from "../currency/ICurrency";
import { ExchangeRates } from "./ExchangeRates";

export interface IExchangeRateProvider {
	getExchangeRate(targetCurrency: ICurrency): number;
	setExchangeRates(rates: ExchangeRates): void;
}
