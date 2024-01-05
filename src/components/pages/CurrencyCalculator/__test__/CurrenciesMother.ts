import { faker } from "@faker-js/faker";

import { Currency, CurrencyCode } from "@/modules/currencyCalculator/domain/currency";

export class CurrencyMother {
	static create(params?: Partial<Currency>): Currency {
		const { code, name, symbol } = faker.finance.currency();
		const defaultParams: Currency = {
			code: code as CurrencyCode,
			name,
			symbol,
			...params,
		};

		return defaultParams;
	}
}

export class CurrenciesMother {
	static create(length: number, currencyMother: typeof CurrencyMother): Currency[] {
		const currenciesArray: Currency[] = [];
		const uniqueCurrencies: Record<string, boolean> = {};

		while (currenciesArray.length < length) {
			const currencyObject: Currency = currencyMother.create();
			const currencyKey = `${currencyObject.code}-${currencyObject.name}-${currencyObject.symbol}`;

			if (!uniqueCurrencies[currencyKey]) {
				uniqueCurrencies[currencyKey] = true;
				currenciesArray.push(currencyObject);
			}
		}

		return currenciesArray;
	}
}
