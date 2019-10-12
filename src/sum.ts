import { Duration, DurationInput } from './types';
import { UNIT_KEYS, ZERO } from './lib/units';
import { parse } from './parse';

/**
 * Sum durations.
 *
 * @example toDays(sum({ days: 1 }, { hours: 12 })) // 1.5
 * @returns a number in milliseconds
 */
export const sum = (...durations: DurationInput[]): Duration => {
	const output = { ...ZERO };

	durations.map(parse).forEach(duration => {
		UNIT_KEYS.forEach(key => {
			output[key] += duration[key];
		});
	});

	return output;
};
