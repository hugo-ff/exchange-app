import { Currency } from "@/modules/currencyCalculator/domain/currency";

export const handleRateNotFound = (
	currentCurrencies: Currency[],
	currencyWithoutRate: Currency
): { validCurrencies: Currency[] } => {
	const validCurrencies = currentCurrencies.filter(
		(currency: Currency) => currency.code !== currencyWithoutRate.code
	);

	return { validCurrencies };
};
