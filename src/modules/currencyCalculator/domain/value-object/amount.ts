export function amount(value: number): number | never {
	if (value < 0 || !Number.isInteger(value * 100)) {
		throw new Error("Amount must be a non-negative number with two decimal places.");
	}

	return value;
}

export type Amount = ReturnType<typeof amount>;
