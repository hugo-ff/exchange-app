import { ICurrency } from "../domain/currency/ICurrency";
import { IExchangeRateProvider } from "../domain/exchangeRateProvider/IExchangeRateProvider";

export class ExchangeRateProvider implements IExchangeRateProvider {
	private readonly rates: Map<string, number>;

	constructor(rates: Map<string, number>) {
		this.rates = rates;
	}

	getExchangeRate(sourceCurrency: ICurrency, targetCurrency: ICurrency): number {
		const sourceCurrencyCode = sourceCurrency.getCode();
		const targetCurrencyCode = targetCurrency.getCode();

		if (!this.rates.has(sourceCurrencyCode) || !this.rates.has(targetCurrencyCode)) {
			throw new Error(
				`Exchange rate not available for ${sourceCurrencyCode} to ${targetCurrencyCode}`
			);
		}

		const exchangeRate = this.rates.get(targetCurrencyCode) ?? 1;

		return exchangeRate;
	}
}
