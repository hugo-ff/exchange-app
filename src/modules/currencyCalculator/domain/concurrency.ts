import { vatCurrencies } from "../../../mocks/vat_api_responses";

export type Code = keyof typeof vatCurrencies;

export interface Currency {
	name: string;
	symbol: string;
}
