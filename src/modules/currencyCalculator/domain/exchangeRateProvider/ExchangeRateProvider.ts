import { ICurrency } from "../currency/ICurrency";
import { IExchangeRateProvider } from "./IExchangeRateProvider";

export class ExchangeRateProvider implements IExchangeRateProvider {
	private readonly rates: Map<string, number>;

	constructor(rates: Map<string, number>) {
		this.rates = rates;
	}

	getExchangeRate(fromCurrency: ICurrency, toCurrency: ICurrency): number {
		const fromCurrencyCode = fromCurrency.getCode();
		const toCurrencyCode = toCurrency.getCode();

		if (!this.rates.has(fromCurrencyCode) || !this.rates.has(toCurrencyCode)) {
			throw new Error(`Exchange rate not available for ${fromCurrencyCode} to ${toCurrencyCode}`);
		}

		const exchangeRate = this.rates.get(toCurrencyCode) ?? 1;

		return exchangeRate;
	}
}
