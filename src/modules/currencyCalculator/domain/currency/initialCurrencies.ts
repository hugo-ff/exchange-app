import { ICurrency } from "./ICurrency";

export const initialCurrencies: Record<string, ICurrency> = {
	sourceCurrency: { code: "USD", name: "US Dollar", symbol: "$" },
	targetCurrency: { code: "EUR", name: "Euro", symbol: "€" },
};
