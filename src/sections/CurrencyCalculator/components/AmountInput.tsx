import CurrencyInput from "react-currency-input-field";

import { Amount } from "../../../modules/currencyCalculator/domain/amount/type";
import { ICurrency } from "../../../modules/currencyCalculator/domain/currency/ICurrency";

interface AmountInputProps {
	amount: Amount;
	sourceCurrency: ICurrency;
	onChange: (newAmount: number) => void;
}

const AmountInput: React.FC<AmountInputProps> = ({ amount, sourceCurrency, onChange }) => {
	return (
		<CurrencyInput
			id="amount-input"
			name="amount-input"
			placeholder="Please enter a number"
			defaultValue={"1.00"}
			decimalsLimit={2}
			onValueChange={(value) => onChange(Number(value) || 0)}
			allowNegativeValue={false}
			step={0.01}
			maxLength={15}
			disableGroupSeparators={true}
			value={amount}
			prefix={`${sourceCurrency.symbol} `}
			decimalScale={2}
		/>
	);
};

export default AmountInput;