/**
 * Like `Math.floor`, but rounds negative numbers towards zero.
 */
const floorTowardsZero = (value: number): number => {
	if (value < 0) {
		// Return value OR 0, so that -0 is normalized to 0
		return Math.ceil(value) || 0;
	}

	return Math.floor(value);
};

export default floorTowardsZero;
