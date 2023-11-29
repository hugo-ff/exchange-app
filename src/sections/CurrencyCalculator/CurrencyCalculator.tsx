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
import ResultDisplay from "./components/ResultDisplay";
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
		<div>
			<h1>Currency Converter</h1>
			{exchangeRate && !!currencies.length && (
				<>
					<div>
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
						<button aria-label="swap-currencies" onClick={handleSwapCurrencies}>
							Swap Currencies
						</button>
						<CurrencySelector
							label="To"
							currencies={currencies}
							selectedCurrency={targetCurrency}
							onChange={handleTargetCurrencyChange}
						/>
					</div>
					<ResultDisplay
						amount={amount}
						exchangeRate={exchangeRate}
						convertedAmount={convertedAmount}
						sourceCurrency={sourceCurrency}
						targetCurrency={targetCurrency}
					/>
				</>
			)}
		</div>
	);
};

export default CurrencyCalculator;
