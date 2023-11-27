import { ICurrency } from "../../domain/currency/ICurrency";
import { IExchangeRateProvider } from "../../domain/exchangeRateProvider/IExchangeRateProvider";
import { IAppState, IUseCaseResult } from "../IAppState";

export function changeCurrency(
	appState: IAppState,
	newSourceCurrency: ICurrency,
	newTargetCurrency: ICurrency,
	exchangeRateProvider: IExchangeRateProvider
): IUseCaseResult {
	const newState = {
		...appState,
		sourceCurrency: newSourceCurrency,
		targetCurrency: newTargetCurrency,
	};

	const exchangeRate = exchangeRateProvider.getExchangeRate(newSourceCurrency, newTargetCurrency);

	return {
		convertedAmount: newState.amount.getValue() * exchangeRate,
		newState,
	};
}
