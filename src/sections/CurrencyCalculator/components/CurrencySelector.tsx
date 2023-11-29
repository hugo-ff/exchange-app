import { ICurrency } from "../../../modules/currencyCalculator/domain/currency/ICurrency";

interface CurrencySelectorProps {
	label: string;
	currencies: ICurrency[];
	selectedCurrency: ICurrency;
	onChange: (newCurrency: string) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
	label,
	currencies,
	selectedCurrency,
	onChange,
}) => {
	return (
		<>
			<label htmlFor={label}>{label}</label>
			<select
				id={label}
				key={selectedCurrency.code}
				value={selectedCurrency.code}
				onChange={(e) => onChange(e.target.value)}
			>
				{currencies.map((currency) => (
					<option
						key={currency.code}
						value={currency.code}
						aria-selected={currency.code === selectedCurrency.code}
					>
						{currency.name}
					</option>
				))}
			</select>
		</>
	);
};

export default CurrencySelector;
