import { ICurrency } from "../domain/currency/ICurrency";
import { ExchangeRatesRepository } from "../domain/exchangeRates/ExchangeRatesRepository";

interface ExchangeRateResponse {
	date: string;
	base: string;
	rates: Map<string, number>;
}

export async function fetchExchangeRates(
	baseCurrency: ICurrency,
	exchangeRatesRepository: ExchangeRatesRepository
): Promise<Map<string, number>> {
	const API_URL = `https://api.vatcomply.com/rates?base=${baseCurrency.getCode()}`;
	try {
		const storedData = exchangeRatesRepository.get(baseCurrency);

		if (storedData) {
			return storedData;
		}

		const response = await fetch(API_URL);

		if (!response.ok) {
			throw new Error(`Failed to fetch exchange rates. Status: ${response.status}`);
		}

		const data = (await response.json()) as ExchangeRateResponse;
		const expirationTime = calculateExpirationTime();

		exchangeRatesRepository.save(baseCurrency, data.rates, expirationTime);

		return data.rates;
	} catch (error) {
		console.error(`Error fetching exchange rates from API: ${(error as Error).message}`);
		throw error;
	}
}

function calculateExpirationTime(): number {
	const currentDate = new Date();

	if (currentDate.getDay() >= 1 && currentDate.getDay() <= 5) {
		currentDate.setUTCHours(16, 0, 0, 0);
	}

	return currentDate.getTime();
}
