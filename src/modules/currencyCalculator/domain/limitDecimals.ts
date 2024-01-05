/**
 * Limits the number of decimal places for a given number.
 *
 * @param {number} number - The number to limit decimals for.
 * @param {number} decimalCount - The desired number of decimal places.
 * @returns {number} - The number with limited decimal places.
 *
 * @example
 * const numberWithDecimals = 12.3456789;
 * const limitedNumber = limitDecimals(numberWithDecimals, 6);
 * console.log(limitedNumber); // Output: 12.345679
 */
export function limitDecimals(number: number, decimalCount: number): number {
	const numberWithDecimals = parseFloat(number.toFixed(decimalCount));

	return numberWithDecimals;
}
