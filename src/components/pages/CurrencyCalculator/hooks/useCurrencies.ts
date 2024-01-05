import { useEffect, useState } from "react";

import { CurrenciesRepository } from "@/modules/currencyCalculator/application/currencies-repository";
import { currenciesService } from "@/modules/currencyCalculator/application/services/currencies-service";
import type { Currency } from "@/modules/currencyCalculator/domain/currency";

export const useCurrencies = (
	currenciesRepository: CurrenciesRepository
): {
	currenciesData: Currency[];
	isLoadingCurrencies: boolean;
	getCurrenciesError?: Error;
} => {
	const [isLoadingCurrencies, setIsLoadingCurrencies] = useState<boolean>(true);
	const [currenciesData, setCurrenciesData] = useState<Currency[]>([]);
	const [getCurrenciesError, setGetCurrenciesError] = useState<Error>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await currenciesService(currenciesRepository).getCurrencies();
				setCurrenciesData(res);
			} catch (error) {
				console.error("Error fetching currencies", error);
				setGetCurrenciesError(error as Error);
			} finally {
				setIsLoadingCurrencies(false);
			}
		};

		void fetchData();
	}, [currenciesRepository]);

	return {
		currenciesData,
		isLoadingCurrencies,
		getCurrenciesError,
	};
};
