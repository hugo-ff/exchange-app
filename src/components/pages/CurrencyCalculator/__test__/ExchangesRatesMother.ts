import { faker } from "@faker-js/faker";

import { Currency } from "@/modules/currencyCalculator/domain/currency";
import { ExchangeRates } from "@/modules/currencyCalculator/domain/exchangeRates";

export class ExchangesRatesMother {
	static create(currencies: Currency[]): ExchangeRates {
		const exchangeRates: ExchangeRates = {};

		currencies.forEach((currency) => {
			const rate = faker.number.float();
			exchangeRates[currency.code] = rate;
		});

		return exchangeRates;
	}
}
