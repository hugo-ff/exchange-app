import { ICurrency } from "./ICurrency";

export class Currency implements ICurrency {
	private readonly code: string;
	private readonly name: string;
	private readonly symbol: string;

	constructor(code: string, name: string, symbol: string) {
		this.code = code;
		this.name = name;
		this.symbol = symbol;
	}

	getCode(): string {
		return this.code;
	}

	getName(): string {
		return this.name;
	}

	getSymbol(): string {
		return this.symbol;
	}
}
