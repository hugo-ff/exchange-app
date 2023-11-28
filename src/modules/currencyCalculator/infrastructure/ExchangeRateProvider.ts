import { ICurrency } from "../domain/currency/ICurrency";
import { ExchangeRates } from "../domain/exchangeRates/ExchangeRates";
import { IExchangeRateProvider } from "../domain/exchangeRates/IExchangeRateProvider";

export class ExchangeRateProvider implements IExchangeRateProvider {
	private rates: ExchangeRates = {};

	getExchangeRate(targetCurrency: ICurrency): number {
		const targetCurrencyCode = targetCurrency.code;

		const exchangeRate = this.rates[targetCurrencyCode];

		return exchangeRate;
	}

	setExchangeRates(rates: ExchangeRates): void {
		this.rates = rates;
	}
}
