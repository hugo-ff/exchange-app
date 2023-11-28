import { ExchangeRates } from "../../domain/exchangeRates/ExchangeRates";

export interface VatApiExchangeRatesResponse {
	date: string;
	base: string;
	rates: ExchangeRates;
}
