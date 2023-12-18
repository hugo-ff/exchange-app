import { ICurrency } from "../../domain/currency/ICurrency";
import { VatApiCurrenciesResponses } from "../repositories/VatApiCurrenciesResponses";

export function currenciesAdapter(data: VatApiCurrenciesResponses): ICurrency[] {
	const currencies: ICurrency[] = [];

	Object.keys(data).forEach((currencyCode) => {
		const currencyInfo = data[currencyCode];

		const currency: ICurrency = {
			code: currencyCode,
			name: currencyInfo.name,
			symbol: currencyInfo.symbol,
		};
		currencies.push(currency);
	});

	return currencies;
}

// const VatCodeToDomainCodeAdapter: Record<Code, Currency> = {
// 	EUR: {
// 		symbol: "€",
// 	},
// };
