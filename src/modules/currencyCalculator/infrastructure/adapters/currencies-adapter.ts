import { Currency, CurrencyCode } from "../../domain/currency";
import { VatApiCurrenciesResponses } from "../repository-implementations/vat/vat-api-currencies-repository";

export function currenciesAdapter(data: VatApiCurrenciesResponses): Currency[] {
	const currencies: Currency[] = [];

	Object.keys(data).forEach((currencyCode) => {
		const currencyInfo = data[currencyCode];

		const currency: Currency = {
			code: currencyCode as CurrencyCode,
			name: currencyInfo.name,
			symbol: currencyInfo.symbol,
		};
		currencies.push(currency);
	});

	return currencies;
}
