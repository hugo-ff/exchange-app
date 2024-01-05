import type { Currency } from "@/modules/currencyCalculator/domain/currency";
import type { Amount } from "@/modules/currencyCalculator/domain/value-object/amount";

interface ResultDisplayProps {
	amount: Amount;
	exchangeRate: number;
	convertedAmount: Amount;
	sourceCurrency: Currency;
	targetCurrency: Currency;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
	amount,
	exchangeRate,
	convertedAmount,
	sourceCurrency,
	targetCurrency,
}) => (
	<div className="mt-4 flex shrink-0 flex-col md:mt-10 lg:mb-28 lg:mt-16 lg:w-1/2">
		<p className="flex flex-col font-inter text-xl font-semibold leading-9 text-black md:text-2xl lg:text-3xl">
			<span>
				{amount} {sourceCurrency.name} =
			</span>
			<span>
				{convertedAmount} {targetCurrency.name}
			</span>
		</p>
		<p className="font-inter text-base font-normal leading-9 text-gray-600 md:mt-3">
			1 {sourceCurrency.code} = {exchangeRate} {targetCurrency.code}
		</p>
	</div>
);

export default ResultDisplay;
