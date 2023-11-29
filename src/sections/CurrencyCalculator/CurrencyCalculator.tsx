import React, { useEffect, useMemo, useState } from "react";

import { convertCurrency } from "../../modules/currencyCalculator/application/convertCurrency";
import { swapCurrencies } from "../../modules/currencyCalculator/application/swapCurrencies";
import { initialAmount } from "../../modules/currencyCalculator/domain/amount/initialAmount";
import { Amount } from "../../modules/currencyCalculator/domain/amount/type";
import { CurrenciesRepository } from "../../modules/currencyCalculator/domain/currency/CurrenciesRepository";
import { ICurrency } from "../../modules/currencyCalculator/domain/currency/ICurrency";
import { initialCurrencies } from "../../modules/currencyCalculator/domain/currency/initialCurrencies";
import { ExchangeRatesRepository } from "../../modules/currencyCalculator/domain/exchangeRates/ExchangeRatesRepository";
import { limitDecimals } from "../../utils/limitDecimals";
import AmountInput from "./components/AmountInput";
import CurrencySelector from "./components/CurrencySelector";
import { InfoMessage } from "./components/InfoMessage";
import ResultDisplay from "./components/ResultDisplay";
import { SwapButton } from "./components/SwapButton";
import { useCurrenciesRepository } from "./hooks/useCurrenciesRepository";
import { useExchangeRatesRepository } from "./hooks/useExchangeRatesRepository";
import { handleRateNotFound } from "./utils/handleRateNotFound";

interface CurrencyCalculatorProps {
	currenciesRepository: CurrenciesRepository;
	ratesRepository: ExchangeRatesRepository;
}

const CurrencyCalculator: React.FC<CurrencyCalculatorProps> = ({
	currenciesRepository,
	ratesRepository,
}) => {
	const { currenciesData, isLoadingCurrencies } = useCurrenciesRepository(currenciesRepository);

	const fetchedSourceCurrency: ICurrency = useMemo(
		() =>
			currenciesData.find((currency) => currency.code === initialCurrencies.sourceCurrency.code) ??
			currenciesData[0],
		[currenciesData]
	);

	const fetchedTargetCurrency: ICurrency = useMemo(
		() =>
			currenciesData.find((currency) => currency.code === initialCurrencies.targetCurrency.code) ??
			currenciesData[1],
		[currenciesData]
	);

	const [currencies, setCurrencies] = useState<ICurrency[]>(currenciesData);
	const [sourceCurrency, setSourceCurrency] = useState<ICurrency>(fetchedSourceCurrency);
	const [targetCurrency, setTargetCurrency] = useState<ICurrency>(fetchedTargetCurrency);

	useEffect(() => {
		setCurrencies(currenciesData);
		setTargetCurrency(fetchedTargetCurrency);
		setSourceCurrency(fetchedSourceCurrency);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currenciesData]);

	const { ratesData, isLoadingRates, ratesResponseError } = useExchangeRatesRepository(
		ratesRepository,
		sourceCurrency
	);

	const [amount, setAmount] = useState<Amount>(initialAmount);
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
		return <div>Loading...</div>;
	}

	return (
		<div className="relative">
			<div className="h-[60px] bg-accent px-3 py-5 font-inter text-xl font-semibold leading-5 text-white md:px-[54px] md:text-2xl">
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
								<AmountInput
									amount={amount}
									sourceCurrency={sourceCurrency}
									onChange={handleAmountChange}
								/>
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
