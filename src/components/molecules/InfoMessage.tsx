import type { Currency } from "@/modules/currencyCalculator/domain/currency";

interface InfoMessageProps {
	targetCurrency: Currency;
	sourceCurrency: Currency;
}

export const InfoMessage: React.FC<InfoMessageProps> = ({ targetCurrency, sourceCurrency }) => {
	return (
		<div className="flex w-1/2 shrink-0 flex-col items-end self-end">
			<div className="hidden rounded-lg bg-primary-50 pb-4 pl-8 pr-4 pt-5 shadow-md lg:block">
				<p className="font-inter text-sm font-normal leading-9 text-black">
					We use the mid-market rate for our Converter. This is for informational purposes only. You
					won’t receive this rate when sending money.
				</p>
			</div>
			<div>
				<p className="absolute left-8 mt-5 w-80 whitespace-normal text-left font-inter text-xs font-light leading-5 text-black sm:w-full lg:relative lg:left-0 lg:mt-2 lg:text-right lg:leading-10">
					<span className="underline">{sourceCurrency.name}</span> to{" "}
					<span className="underline">{targetCurrency.name}</span> conversion — Last updated Nov 29,
					2023, 16:00 CET
				</p>
			</div>
		</div>
	);
};
