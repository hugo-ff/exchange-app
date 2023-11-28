import { ICurrency } from "../../../modules/currencyCalculator/domain/currency/ICurrency";

interface CurrencySelectorProps {
	currencies: ICurrency[];
	selectedCurrency: ICurrency;
	onChange: (newCurrency: string) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
	currencies,
	selectedCurrency,
	onChange,
}) => {
	return (
		<select
			key={selectedCurrency.code}
			value={selectedCurrency.code}
			onChange={(e) => onChange(e.target.value)}
		>
			{currencies.map((currency) => (
				<option key={currency.code} value={currency.code}>
					<p>{currency.name}</p>
				</option>
			))}
		</select>
	);
};

export default CurrencySelector;
