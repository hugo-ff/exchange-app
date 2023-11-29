import { ICurrency } from "../../../modules/currencyCalculator/domain/currency/ICurrency";

export const handleRateNotFound = (
	currentCurrencies: ICurrency[],
	currencyWithoutRate: ICurrency
): { validCurrencies: ICurrency[] } => {
	const validCurrencies = currentCurrencies.filter(
		(currency: ICurrency) => currency.code !== currencyWithoutRate.code
	);

	return { validCurrencies };
};
