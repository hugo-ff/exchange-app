import { Amount } from "./type";

export function amountValidation(value: Amount): boolean {
	if (value < 0 || !Number.isInteger(value * 100)) {
		throw new Error("Amount must be a non-negative number with two decimal places.");
	}

	return true;
}
