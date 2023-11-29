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
		<div className="flex w-full flex-1 shrink-0 flex-col md:grow-0">
			<label htmlFor="amount-input" className="mb-4 text-base font-semibold leading-5 text-black">
				Amount
			</label>
			<CurrencyInput
				id="amount-input"
				name="amount-input"
				role="input"
				defaultValue={"1.00"}
				decimalsLimit={2}
				decimalScale={2}
				onValueChange={(value) => onChange(Number(value) || 0)}
				allowNegativeValue={false}
				step={0.01}
				maxLength={15}
				disableGroupSeparators={true}
				prefix={`${sourceCurrency.symbol} `}
				className="rounded border border-gray-300 bg-white p-2 text-base font-semibold leading-5 text-black"
			/>
		</div>
	);
};

export default AmountInput;
