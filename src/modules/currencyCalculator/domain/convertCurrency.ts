import { limitDecimals } from "./limitDecimals";
import type { Amount } from "./value-object/amount";
import { amount } from "./value-object/amount";

export function convertCurrency(amountToConvert: number, exchangeRate: number): Amount {
	if (!amount(amountToConvert)) {
		throw new Error("Amount should not be negative");
	}

	return limitDecimals(amountToConvert * exchangeRate, 6);
}
