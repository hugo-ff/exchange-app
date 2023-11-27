import { IAmount } from "../domain/amount/IAmount";
import { ICurrency } from "../domain/currency/ICurrency";

export interface IAppState {
	amount: IAmount;
	sourceCurrency: ICurrency;
	targetCurrency: ICurrency;
}

export interface IUseCaseResult {
	convertedAmount: number;
	newState: IAppState;
}
