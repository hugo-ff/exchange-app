export interface VatApiCurrenciesResponses {
	[currencyCode: string]: {
		name: string;
		symbol: string;
	};
}
