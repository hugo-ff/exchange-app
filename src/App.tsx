import CurrencyCalculator from "./components/pages/CurrencyCalculator/CurrencyCalculator";
import { LocalStorageStrategy } from "./modules/currencyCalculator/infrastructure/repository-implementations/localStorage-strategy";
import { VatApiCurrenciesRepository } from "./modules/currencyCalculator/infrastructure/repository-implementations/vat/vat-api-currencies-repository";
import { VatApiExchangeRatesRepository } from "./modules/currencyCalculator/infrastructure/repository-implementations/vat/vat-api-exchange-rates-repository";

const currenciesRepository = new VatApiCurrenciesRepository();
const ratesRepository = new VatApiExchangeRatesRepository(new LocalStorageStrategy());

export const App = () => (
	<CurrencyCalculator
		currenciesRepository={currenciesRepository}
		ratesRepository={ratesRepository}
	/>
);
