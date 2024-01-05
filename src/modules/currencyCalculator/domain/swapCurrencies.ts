import type { Currency } from "./currency";

export function swapCurrencies(sourceCurrency: Currency, targetCurrency: Currency): Currency[] {
	return [targetCurrency, sourceCurrency];
}
