import { vatCurrencies } from "../../../../mocks/vat_api_responses";

export class InMemoryCurrenciesRepository {
	getAll(): typeof vatCurrencies {
		return vatCurrencies;
	}
}
