import { Duration, DurationInput } from './types';
import { UNIT_KEYS } from './lib/units';
import { parse } from './parse';

/**
 * Add values to the current duration.
 *
 * @example toDays(addTime({ days: 1 }, { hours: 12 })) // 1.5
 * @returns a number in milliseconds
 */
export const sum = (...durations: DurationInput[]): Duration => {
	const [firstTime, ...otherTimes] = durations.map(parse);
	const output = { ...firstTime };

	otherTimes.forEach(duration => {
		UNIT_KEYS.forEach(key => {
			output[key] += duration[key];
		});
	});

	return output;
};
