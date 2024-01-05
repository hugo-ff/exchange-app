import { vatCurrencies } from "../../../mocks/vat_api_responses";

export type CurrencyCode = keyof typeof vatCurrencies;

export interface Currency {
	code: CurrencyCode;
	name: string;
	symbol: string;
}
