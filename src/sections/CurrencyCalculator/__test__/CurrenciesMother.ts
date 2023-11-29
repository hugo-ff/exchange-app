import { faker } from "@faker-js/faker";

import { ICurrency } from "../../../modules/currencyCalculator/domain/currency/ICurrency";

export class CurrencyMother {
	static create(params?: Partial<ICurrency>): ICurrency {
		const { code, name, symbol } = faker.finance.currency();
		const defaultParams: ICurrency = {
			code,
			name,
			symbol,
			...params,
		};

		return defaultParams;
	}
}

export class CurrenciesMother {
	static create(length: number, currencyMother: typeof CurrencyMother): ICurrency[] {
		const currenciesArray: ICurrency[] = [];
		const uniqueCurrencies: Record<string, boolean> = {};

		while (currenciesArray.length < length) {
			const currencyObject: ICurrency = currencyMother.create();
			const currencyKey = `${currencyObject.code}-${currencyObject.name}-${currencyObject.symbol}`;

			if (!uniqueCurrencies[currencyKey]) {
				uniqueCurrencies[currencyKey] = true;
				currenciesArray.push(currencyObject);
			}
		}

		return currenciesArray;
	}
}
