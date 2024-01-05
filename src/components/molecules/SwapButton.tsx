import { ExchangeIcon } from "@/assets/ExchangeIcon";

interface SwapButtonProps {
	handleClick: () => void;
}

export const SwapButton: React.FC<SwapButtonProps> = ({ handleClick }) => (
	<button aria-label="swap-currencies" onClick={handleClick}>
		<div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-500 lg:mt-8">
			<ExchangeIcon />
		</div>
	</button>
);
