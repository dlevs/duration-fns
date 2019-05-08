import { Time, TimeInput } from './types';
import { UNIT_KEYS } from './lib/units';
import { parse } from './parse';

/**
 * Add values to the current time.
 *
 * @example toDays(addTime({ days: 1 }, { hours: 12 })) // 1.5
 * @returns a number in milliseconds
 */
export const sum = (...times: TimeInput[]): Time => {
	const [firstTime, ...otherTimes] = times.map(parse);
	const output = { ...firstTime };

	otherTimes.forEach(time => {
		UNIT_KEYS.forEach(key => {
			output[key] += time[key];
		});
	});

	return output;
};
