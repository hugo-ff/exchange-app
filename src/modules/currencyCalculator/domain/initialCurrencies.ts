import type { Currency } from "./currency";

export const initialCurrencies: Record<string, Currency> = {
	sourceCurrency: { code: "USD", name: "US Dollar", symbol: "$" },
	targetCurrency: { code: "EUR", name: "Euro", symbol: "€" },
};
