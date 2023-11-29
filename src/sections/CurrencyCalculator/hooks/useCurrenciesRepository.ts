import { useEffect, useState } from "react";

import { CurrenciesRepository } from "../../../modules/currencyCalculator/domain/currency/CurrenciesRepository";
import { ICurrency } from "../../../modules/currencyCalculator/domain/currency/ICurrency";

export const useCurrenciesRepository = (
	currenciesRepository: CurrenciesRepository
): {
	currenciesData: ICurrency[];
	isLoadingCurrencies: boolean;
	getCurrenciesError?: Error;
} => {
	const [isLoadingCurrencies, setIsLoadingCurrencies] = useState<boolean>(true);
	const [currenciesData, setCurrenciesData] = useState<ICurrency[]>([]);
	const [getCurrenciesError, setGetCurrenciesError] = useState<Error>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await currenciesRepository.getAll();
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
