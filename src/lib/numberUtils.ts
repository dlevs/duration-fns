/**
 * Like `Math.floor`, but rounds negative numbers towards zero.
 */
export const floorTowardsZero = (value: number): number => {
	if (value < 0) {
		// Return value OR 0, so that -0 is normalized to 0
		return Math.ceil(value) || 0;
	}

	return Math.floor(value);
};

/**
 * Returns `true` if the passed value is `-0`.
 * See http://2ality.com/2012/03/signedzero.html
 */
export const isNegativeZero = (n: number) =>
	n === 0 && ((1 / n) < 0);

/**
 * Returns `true` if the passed value less than `0`, or equal to `-0`.
 */
export const isNegativelySigned = (n: number) =>
	n < 0 || isNegativeZero(n);
