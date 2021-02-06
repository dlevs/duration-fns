import { UNITS } from './lib/units';
import { Duration, DurationInput } from './types';
import { parse } from './parse';

/**
 * Gets the negative of the input duration.
 *
 * @example
 * negate({ days: -1 }) // { days: 1 }
 * negate({ days: -1, hours 2 }) // { days: 1, hours: -2 }
 */
export const negate = (duration: DurationInput): Duration => {
	const output = { ...parse(duration) };

	UNITS.forEach(unit => {
		output[unit] = output[unit] === 0
			? 0
			: -output[unit];
	});

	return output;
};
