import React, { useEffect, useState } from "react";

import { convertCurrency } from "../../modules/currencyCalculator/application/convertCurrency";
import { Amount } from "../../modules/currencyCalculator/domain/amount/type";
import { ICurrency } from "../../modules/currencyCalculator/domain/currency/ICurrency";
import { ExchangeRates } from "../../modules/currencyCalculator/domain/exchangeRates/ExchangeRates";
import { VatApiCurrenciesRepository } from "../../modules/currencyCalculator/infrastructure/repositories/VatApiCurrenciesRepository";
import { VatApiExchangeRatesRepository } from "../../modules/currencyCalculator/infrastructure/repositories/VatApiExchangeRatesRepository";
import AmountInput from "./components/AmountInput";
import CurrencySelector from "./components/CurrencySelector";
import ResultDisplay from "./components/ResultDisplay";

const currenciesRepository = new VatApiCurrenciesRepository();
const ratesRepository = new VatApiExchangeRatesRepository();

const CurrencyCalculator: React.FC = () => {
	const [amount, setAmount] = useState<Amount>(1.0);
	const [vatApiCurrenciesResponse, setVatApiCurrenciesResponse] = useState<ICurrency[]>([]);
	const [sourceCurrency, setSourceCurrency] = useState<ICurrency>();
	const [targetCurrency, setTargetCurrency] = useState<ICurrency>();
	const [convertedAmount, setConvertedAmount] = useState<Amount>(0);
	const [exchangeRate, setExchangeRate] = useState<number>();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		void currenciesRepository.getAll().then((res) => {
			setSourceCurrency(res.find((currency) => currency.code === "USD"));
			setTargetCurrency(res.find((currency) => currency.code === "EUR"));
			setVatApiCurrenciesResponse(res);
			setIsLoading(false);
		});
	}, []);

	const [baseRates, setBaseRates] = useState<ExchangeRates>();
	useEffect(() => {
		if (sourceCurrency && !isLoading) {
			void ratesRepository.get(sourceCurrency).then((res: ExchangeRates) => {
				setBaseRates(res);
			});
		}
	}, [isLoading, sourceCurrency]);

	useEffect(() => {
		if (targetCurrency?.code && baseRates) {
			const exchangeRate = Number(baseRates[targetCurrency.code].toFixed(7));
			setExchangeRate(exchangeRate);
		}
	}, [targetCurrency, baseRates]);

	useEffect(() => {
		if (exchangeRate && !isLoading) {
			setConvertedAmount(convertCurrency(amount, exchangeRate));
		}
	}, [amount, exchangeRate, isLoading]);

	const handleAmountChange = (newAmount: number) => {
		setAmount(newAmount);
	};

	const handleSourceCurrencyChange = (newCurrencyCode: string) => {
		const newCurrency = vatApiCurrenciesResponse.find(
			(currency) => currency.code === newCurrencyCode
		);
		setSourceCurrency(newCurrency);
	};

	const handleTargetCurrencyChange = (newCurrencyCode: string) => {
		const newCurrency = vatApiCurrenciesResponse.find(
			(currency) => currency.code === newCurrencyCode
		);
		setTargetCurrency(newCurrency);
	};

	const handleSwapCurrencies = () => {
		const temp = sourceCurrency;
		setSourceCurrency(targetCurrency);
		setTargetCurrency(temp);
	};

	return (
		<div>
			<h1>Currency Converter</h1>
			{sourceCurrency && targetCurrency && exchangeRate && (
				<>
					<AmountInput
						amount={amount}
						sourceCurrency={sourceCurrency}
						onChange={handleAmountChange}
					/>
					<CurrencySelector
						currencies={vatApiCurrenciesResponse}
						selectedCurrency={sourceCurrency}
						onChange={handleSourceCurrencyChange}
					/>
					<button onClick={handleSwapCurrencies}>Swap Currencies</button>
					<CurrencySelector
						currencies={vatApiCurrenciesResponse}
						selectedCurrency={targetCurrency}
						onChange={handleTargetCurrencyChange}
					/>
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
