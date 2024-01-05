import type { Currency } from "@/modules/currencyCalculator/domain/currency";

interface CurrencySelectorProps {
	label: string;
	currencies: Currency[];
	selectedCurrency: Currency;
	onChange: (newCurrency: string) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
	label,
	currencies,
	selectedCurrency,
	onChange,
}) => {
	return (
		<div className="flex w-full flex-col md:flex-1 md:shrink-0">
			<label htmlFor={label} className="mb-4 text-base font-semibold leading-5 text-black">
				{label}
			</label>
			<select
				id={label}
				key={selectedCurrency.code}
				value={selectedCurrency.code}
				onChange={(e) => onChange(e.target.value)}
				className="rounded border border-gray-300 bg-white p-2 text-base font-semibold leading-5 text-black"
			>
				{currencies.map((currency) => (
					<option
						key={currency.code}
						value={currency.code}
						aria-selected={currency.code === selectedCurrency.code}
						className="font-semibold leading-5 text-black"
					>
						{currency.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default CurrencySelector;
