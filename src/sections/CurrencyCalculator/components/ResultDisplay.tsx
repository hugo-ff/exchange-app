import { Amount } from "../../../modules/currencyCalculator/domain/amount/type";
import { ICurrency } from "../../../modules/currencyCalculator/domain/currency/ICurrency";

interface ResultDisplayProps {
	amount: Amount;
	exchangeRate: number;
	convertedAmount: Amount;
	sourceCurrency: ICurrency;
	targetCurrency: ICurrency;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
	amount,
	exchangeRate,
	convertedAmount,
	sourceCurrency,
	targetCurrency,
}) => (
	<div>
		<p>
			{amount} {sourceCurrency.name} = {convertedAmount} {targetCurrency.name}
		</p>
		<p>
			1 {sourceCurrency.code} = {exchangeRate} {targetCurrency.code}
		</p>
	</div>
);

export default ResultDisplay;
