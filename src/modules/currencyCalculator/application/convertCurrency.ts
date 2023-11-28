import { amountValidation } from "../domain/amount/amountValidation";
import { Amount } from "../domain/amount/type";

export function convertCurrency(amount: Amount, exchangeRate: number): Amount {
	if (!amountValidation(amount)) {
		throw new Error("Amount should not be negative");
	}

	return amount * exchangeRate;
}
