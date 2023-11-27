import { Amount } from "../../domain/amount/Amount";
import { IExchangeRateProvider } from "../../domain/exchangeRateProvider/IExchangeRateProvider";
import { IAppState, IUseCaseResult } from "../IAppState";

export function changeAmount(
	appState: IAppState,
	newAmount: number,
	exchangeRateProvider: IExchangeRateProvider
): IUseCaseResult {
	const updatedAmount = new Amount(newAmount);

	const newState = { ...appState, amount: updatedAmount };

	const exchangeRate = exchangeRateProvider.getExchangeRate(
		appState.sourceCurrency,
		appState.targetCurrency
	);

	return {
		convertedAmount: updatedAmount.getValue() * exchangeRate,
		newState,
	};
}
