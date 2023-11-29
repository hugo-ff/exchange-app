import { useEffect, useState } from "react";

import { ICurrency } from "../../../modules/currencyCalculator/domain/currency/ICurrency";
import { ExchangeRates } from "../../../modules/currencyCalculator/domain/exchangeRates/ExchangeRates";
import { ExchangeRatesRepository } from "../../../modules/currencyCalculator/domain/exchangeRates/ExchangeRatesRepository";

export const useExchangeRatesRepository = (
	ratesRepository: ExchangeRatesRepository,
	sourceCurrency?: ICurrency
): {
	ratesData: ExchangeRates;
	isLoadingRates: boolean;
	ratesResponseError?: Error;
} => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [ratesData, setRatesData] = useState<ExchangeRates>({});
	const [ratesResponseError, setRatesResponseError] = useState<Error>();

	useEffect(() => {
		if (!sourceCurrency) {
			return;
		}

		const fetchRates = async () => {
			try {
				setIsLoading(true);
				const res: ExchangeRates = await ratesRepository.get(sourceCurrency);
				setRatesData(res);
			} catch (error) {
				console.error("Error fetching rates", error);
				setRatesResponseError(error as Error);
			} finally {
				setIsLoading(false);
			}
		};
		void fetchRates();
	}, [ratesRepository, sourceCurrency]);

	return {
		ratesData,
		isLoadingRates: isLoading,
		ratesResponseError,
	};
};
