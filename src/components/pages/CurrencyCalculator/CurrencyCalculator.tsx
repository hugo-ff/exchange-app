import React, { useEffect, useMemo, useState } from "react";

import Spinner from "@/components/atoms/Spinner";
import AmountInput from "@/components/molecules/AmountInput";
import CurrencySelector from "@/components/molecules/CurrencySelector";
import { InfoMessage } from "@/components/molecules/InfoMessage";
import ResultDisplay from "@/components/molecules/ResultDisplay";
import { SwapButton } from "@/components/molecules/SwapButton";
import { CurrenciesRepository } from "@/modules/currencyCalculator/application/currencies-repository";
import { ExchangeRatesRepository } from "@/modules/currencyCalculator/application/exchange-rates-repository";
import { convertCurrency } from "@/modules/currencyCalculator/domain/convertCurrency";
import type { Currency } from "@/modules/currencyCalculator/domain/currency";
import { initialCurrencies } from "@/modules/currencyCalculator/domain/initialCurrencies";
import { limitDecimals } from "@/modules/currencyCalculator/domain/limitDecimals";
import { swapCurrencies } from "@/modules/currencyCalculator/domain/swapCurrencies";
import type { Amount } from "@/modules/currencyCalculator/domain/value-object/amount";

import { useCurrencies } from "./hooks/useCurrencies";
import { useExchangeRates } from "./hooks/useExchangeRates";
import { handleRateNotFound } from "./utils/handleRateNotFound";

interface CurrencyCalculatorProps {
	currenciesRepository: CurrenciesRepository;
	ratesRepository: ExchangeRatesRepository;
}

const CurrencyCalculator: React.FC<CurrencyCalculatorProps> = ({
	currenciesRepository,
	ratesRepository,
}) => {
	const { currenciesData, isLoadingCurrencies } = useCurrencies(currenciesRepository);

	const fetchedSourceCurrency: Currency = useMemo(
		() =>
			currenciesData.find((currency) => currency.code === initialCurrencies.sourceCurrency.code) ??
			currenciesData[0],
		[currenciesData]
	);

	const fetchedTargetCurrency: Currency = useMemo(
		() =>
			currenciesData.find((currency) => currency.code === initialCurrencies.targetCurrency.code) ??
			currenciesData[1],
		[currenciesData]
	);

	const [currencies, setCurrencies] = useState<Currency[]>(currenciesData);
	const [sourceCurrency, setSourceCurrency] = useState<Currency>(fetchedSourceCurrency);
	const [targetCurrency, setTargetCurrency] = useState<Currency>(fetchedTargetCurrency);

	useEffect(() => {
		setCurrencies(currenciesData);
		setTargetCurrency(fetchedTargetCurrency);
		setSourceCurrency(fetchedSourceCurrency);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currenciesData]);

	const { ratesData, isLoadingRates, ratesResponseError } = useExchangeRates(
		ratesRepository,
		sourceCurrency
	);

	const [amount, setAmount] = useState<Amount>(1);
	const [convertedAmount, setConvertedAmount] = useState<Amount>(0);
	const [exchangeRate, setExchangeRate] = useState<number>();

	useEffect(() => {
		if (ratesResponseError) {
			setSourceCurrency(currenciesData[1]);
			setTargetCurrency(currenciesData[0]);
			const { validCurrencies } = handleRateNotFound(currencies, sourceCurrency);
			setCurrencies(validCurrencies);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ratesResponseError]);

	useEffect(() => {
		if (isLoadingRates || isLoadingCurrencies) {
			return;
		}
		if (ratesData[targetCurrency.code]) {
			const exchangeRate = limitDecimals(ratesData[targetCurrency.code], 7);
			setExchangeRate(exchangeRate);
		} else if (Object.entries(ratesData).length) {
			setSourceCurrency(currenciesData[1]);
			setTargetCurrency(currenciesData[0]);
			const { validCurrencies } = handleRateNotFound(currencies, targetCurrency);
			setCurrencies(validCurrencies);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ratesData, targetCurrency]);

	useEffect(() => {
		if (exchangeRate && !isLoadingCurrencies) {
			const convertedAmount = convertCurrency(amount, exchangeRate);
			setConvertedAmount(convertedAmount);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [amount, exchangeRate]);

	const handleAmountChange = (newAmount: Amount) => setAmount(newAmount);

	const handleSourceCurrencyChange = (newCurrencyCode: string) => {
		const newCurrency = currenciesData.find((currency) => currency.code === newCurrencyCode);
		newCurrency && setSourceCurrency(newCurrency);
	};

	const handleTargetCurrencyChange = (newCurrencyCode: string) => {
		const newCurrency = currenciesData.find((currency) => currency.code === newCurrencyCode);
		newCurrency && setTargetCurrency(newCurrency);
	};

	const handleSwapCurrencies = () => {
		const [newSourceCurrency, newTargetCurrency] = swapCurrencies(sourceCurrency, targetCurrency);
		setSourceCurrency(newSourceCurrency);
		setTargetCurrency(newTargetCurrency);
	};

	if (isLoadingCurrencies || isLoadingRates) {
		return (
			<div className="fixed left-0 top-0 flex h-full w-full items-center justify-center">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="relative">
			<div className="flex h-[60px] items-center bg-accent px-3 font-inter text-xl font-semibold leading-5 text-white md:px-[54px] md:text-2xl">
				<h1>Currency exchange</h1>
			</div>
			{exchangeRate && !!currencies.length && (
				<div className="relative w-full">
					<div className="h-72 bg-primary-500 px-12 pt-8 md:pt-16">
						<p className="text-center font-inter text-2xl font-semibold leading-8 text-white sm:text-3xl lg:text-4xl">
							{amount} {sourceCurrency.code} to {targetCurrency.code} - Convert{" "}
							{sourceCurrency.name} to {targetCurrency.name}
						</p>
					</div>
					<div className="absolute top-32 flex w-full items-center justify-center px-8 pb-10 sm:top-auto sm:h-full lg:px-[77px]">
						<div className=" w-full rounded-lg bg-white p-6 pb-4 shadow-md sm:px-4 md:px-8 md:pt-8 xl:w-4/5 xl:px-11">
							<div className="flex flex-col items-start justify-between gap-7 md:gap-5 lg:flex-row lg:items-center lg:gap-4 xl:gap-8 ">
								<AmountInput sourceCurrency={sourceCurrency} onChange={handleAmountChange} />
								<CurrencySelector
									label="From"
									currencies={currencies}
									selectedCurrency={sourceCurrency}
									onChange={handleSourceCurrencyChange}
								/>
								<SwapButton handleClick={handleSwapCurrencies} />
								<CurrencySelector
									label="To"
									currencies={currencies}
									selectedCurrency={targetCurrency}
									onChange={handleTargetCurrencyChange}
								/>
							</div>
							<div className="flex flex-col md:flex-row md:justify-between md:gap-5">
								<ResultDisplay
									amount={amount}
									exchangeRate={exchangeRate}
									convertedAmount={convertedAmount}
									sourceCurrency={sourceCurrency}
									targetCurrency={targetCurrency}
								/>
								<InfoMessage sourceCurrency={sourceCurrency} targetCurrency={targetCurrency} />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CurrencyCalculator;
