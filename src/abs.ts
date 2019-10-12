import { Duration, DurationInput } from './types';
import { isNegative } from './isNegative';
import { negate } from './negate';
import { parse } from './parse';

/**
 * Get the absolute value of a duration.
 *
 * @example
 * abs({ days: -1, seconds: 1 })
 * // { days: 1, seconds: -1 }
 */
export const abs = (duration: DurationInput): Duration => {
	if (isNegative(duration)) {
		return negate(duration);
	}

	return parse(duration);
};
