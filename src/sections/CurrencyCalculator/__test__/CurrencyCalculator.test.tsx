import { faker } from "@faker-js/faker";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mock } from "jest-mock-extended";

import { CurrenciesRepository } from "../../../modules/currencyCalculator/domain/currency/CurrenciesRepository";
import { ExchangeRatesRepository } from "../../../modules/currencyCalculator/domain/exchangeRates/ExchangeRatesRepository";
import { limitDecimals } from "../../../utils/limitDecimals";
import CurrencyCalculator from "../CurrencyCalculator";
import { CurrenciesMother, CurrencyMother } from "./CurrenciesMother";
import { ExchangesRatesMother } from "./ExchangesRatesMother";

const mockCurrenciesRepository = mock<CurrenciesRepository>();
const mockRatesRepository = mock<ExchangeRatesRepository>();

describe("CurrencyCalculator", () => {
	const currencies = CurrenciesMother.create(10, CurrencyMother);
	const rates = ExchangesRatesMother.create(currencies);

	const sourceCurrency = currencies[0];
	const targetCurrency = currencies[1];

	const initialAmount = `${sourceCurrency.symbol} 1.00`;
	const exchangeRate = limitDecimals(rates[targetCurrency.code], 7);

	it("should load page with default values", async () => {
		mockCurrenciesRepository.getAll.mockResolvedValue(currencies);
		mockRatesRepository.get.mockResolvedValue(rates);

		render(
			<CurrencyCalculator
				currenciesRepository={mockCurrenciesRepository}
				ratesRepository={mockRatesRepository}
			/>
		);

		const sourceCurrencySelector = await screen.findByLabelText("From");
		const optionWithinSourceSelector = within(sourceCurrencySelector);
		const selectedSourceOption = await optionWithinSourceSelector.findByRole("option", {
			name: sourceCurrency.name,
			selected: true,
		});
		expect(selectedSourceOption).toBeInTheDocument();

		const targetCurrencySelector = await screen.findByLabelText("To");
		const optionWithinTargetSelector = within(targetCurrencySelector);
		const selectedTargetOption = optionWithinTargetSelector.getByRole("option", {
			name: targetCurrency.name,
			selected: true,
		});
		expect(selectedTargetOption).toBeInTheDocument();

		const amountInput = await screen.findByRole("input", { name: /amount/i });
		expect(amountInput).toHaveValue(`${initialAmount}`);
	});

	it("should convert currency when user changes amount", async () => {
		mockCurrenciesRepository.getAll.mockResolvedValue(currencies);
		mockRatesRepository.get.mockResolvedValue(rates);

		render(
			<CurrencyCalculator
				currenciesRepository={mockCurrenciesRepository}
				ratesRepository={mockRatesRepository}
			/>
		);

		const amountInput = await screen.findByRole("input", { name: /amount/i });
		userEvent.clear(amountInput);
		userEvent.type(amountInput, "hello");
		expect(amountInput).not.toHaveValue(); // amount must be only numbers

		userEvent.clear(amountInput);
		userEvent.type(amountInput, "-50");
		expect(amountInput).toHaveValue(`${sourceCurrency.symbol} 50`); // amount cannot be a negative number

		const amountToExchange = faker.number.int({ min: 10, max: 100 });
		userEvent.clear(amountInput);
		userEvent.type(amountInput, amountToExchange.toFixed());

		const convertedAmount = limitDecimals(exchangeRate * amountToExchange, 6);
		const exchangeResultText = `${amountToExchange} ${sourceCurrency.name} = ${convertedAmount} ${targetCurrency.name}`;

		expect(await screen.findByText(exchangeResultText)).toBeInTheDocument();
	});
});
