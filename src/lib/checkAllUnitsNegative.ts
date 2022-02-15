import type { Duration, DurationInput } from '../types';
import { negate } from '../negate';
import { parse } from '../parse';
import { UNITS } from './units';

/**
 * Get an indication of whether all of the non-zero units in a duration are
 * negative. If they are, return a positive representation of the duration,
 * with `isAllNegative` set to `true`.
 */
export const checkAllUnitsNegative = (duration: DurationInput): {
	isAllNegative: boolean
	maybeAbsDuration: Duration
} => {
	const parsed = parse(duration);
	let hasPositive = false;
	let hasNegative = false;

	UNITS.forEach((unit) => {
		const value = parsed[unit];
		if (value < 0) {
			hasNegative = true;
		} else if (value > 0) {
			hasPositive = true;
		}
	});

	if (hasNegative && !hasPositive) {
		return {
			isAllNegative: true,
			maybeAbsDuration: negate(parsed),
		};
	}

	return {
		isAllNegative: false,
		maybeAbsDuration: parsed,
	};
};
