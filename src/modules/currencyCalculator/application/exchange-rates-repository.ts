import type { Currency } from "../domain/currency";
import { ExchangeRates } from "../domain/exchangeRates";

export interface ExchangeRatesRepository {
	get: (baseCurrency: Currency) => Promise<ExchangeRates>;
}
