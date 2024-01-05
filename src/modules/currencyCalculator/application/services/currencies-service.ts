import type { Currency } from "../../domain/currency";
import { CurrenciesRepository } from "../currencies-repository";

export interface CurrenciesService {
	getCurrencies: () => Promise<Currency[]>;
}

export const currenciesService = (repository: CurrenciesRepository): CurrenciesService => ({
	getCurrencies: () => repository.getAll(),
});
