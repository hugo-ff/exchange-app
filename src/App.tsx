import { VatApiCurrenciesRepository } from "./modules/currencyCalculator/infrastructure/repositories/VatApiCurrenciesRepository";
import { VatApiExchangeRatesRepository } from "./modules/currencyCalculator/infrastructure/repositories/VatApiExchangeRatesRepository";
import CurrencyCalculator from "./sections/CurrencyCalculator/CurrencyCalculator";

const currenciesRepository = new VatApiCurrenciesRepository();
const ratesRepository = new VatApiExchangeRatesRepository();

export const App = () => (
	<CurrencyCalculator
		currenciesRepository={currenciesRepository}
		ratesRepository={ratesRepository}
	/>
);
