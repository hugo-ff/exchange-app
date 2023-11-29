import { faker } from "@faker-js/faker";

import { ICurrency } from "../../../modules/currencyCalculator/domain/currency/ICurrency";
import { ExchangeRates } from "../../../modules/currencyCalculator/domain/exchangeRates/ExchangeRates";

export class ExchangesRatesMother {
	static create(currencies: ICurrency[]): ExchangeRates {
		const exchangeRates: ExchangeRates = {};

		currencies.forEach((currency) => {
			const rate = faker.number.float();
			exchangeRates[currency.code] = rate;
		});

		return exchangeRates;
	}
}
