import { ICurrency } from "../domain/currency/ICurrency";

export function swapCurrencies(sourceCurrency: ICurrency, targetCurrency: ICurrency): ICurrency[] {
	return [targetCurrency, sourceCurrency];
}
