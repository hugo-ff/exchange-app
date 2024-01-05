import type { Currency } from "../../domain/currency";
import { ExchangeRates } from "../../domain/exchangeRates";
import { ExchangeRatesRepository } from "../exchange-rates-repository";

interface RatesService {
	getRates: (baseCurrency: Currency) => Promise<ExchangeRates>;
}

export const ratesService = (repository: ExchangeRatesRepository): RatesService => ({
	getRates: (baseCurrency: Currency) => repository.get(baseCurrency),
});
