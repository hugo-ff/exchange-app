import { IExchangeRateProvider } from "../../domain/exchangeRateProvider/IExchangeRateProvider";
import { IAppState, IUseCaseResult } from "../IAppState";

export function swapCurrencies(
	appState: IAppState,
	exchangeRateProvider: IExchangeRateProvider
): IUseCaseResult {
	const newState = {
		...appState,
		sourceCurrency: appState.targetCurrency,
		targetCurrency: appState.sourceCurrency,
	};

	const exchangeRate = exchangeRateProvider.getExchangeRate(
		newState.sourceCurrency,
		newState.targetCurrency
	);

	return {
		convertedAmount: newState.amount.getValue() * exchangeRate,
		newState,
	};
}
