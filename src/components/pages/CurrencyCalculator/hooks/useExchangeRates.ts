import { useEffect, useState } from "react";

import { ExchangeRatesRepository } from "@/modules/currencyCalculator/application/exchange-rates-repository";
import { ratesService } from "@/modules/currencyCalculator/application/services/rates-service";
import type { Currency } from "@/modules/currencyCalculator/domain/currency";
import type { ExchangeRates } from "@/modules/currencyCalculator/domain/exchangeRates";

export const useExchangeRates = (
	ratesRepository: ExchangeRatesRepository,
	sourceCurrency?: Currency
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
				const res: ExchangeRates = await ratesService(ratesRepository).getRates(sourceCurrency);
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
