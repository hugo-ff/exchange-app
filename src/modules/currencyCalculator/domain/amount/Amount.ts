import { IAmount } from "./IAmount";

export class Amount implements IAmount {
	private readonly value: number;

	constructor(value: number) {
		if (value < 0 || !Number.isInteger(value * 100)) {
			throw new Error("Amount must be a non-negative number with two decimal places.");
		}
		this.value = value;
	}

	getValue(): number {
		return this.value;
	}
}
