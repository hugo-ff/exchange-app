import { Amount } from "./type";

/**
 * Validates the amount value to ensure it is a non-negative number with two decimal places.
 *
 * @param {number} value - The amount value to be validated.
 * @throws {Error} Throws an error if the amount is negative or doesn't have two decimal places.
 * @returns {boolean} Returns true if the amount is valid.
 */
export function amountValidation(value: Amount): boolean {
	if (value < 0 || !Number.isInteger(value * 100)) {
		throw new Error("Amount must be a non-negative number with two decimal places.");
	}

	return true;
}
