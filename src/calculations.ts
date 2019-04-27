import { Time, TimeInput } from './types';
import { UNIT_KEYS } from './lib/units';
import { parse } from './parse';
import { negate } from './negate';

/**
 * Add values to the current time.
 *
 * @example toDays(addTime({ days: 1 }, { hours: 12 })) // 1.5
 * @returns a number in milliseconds
 */
export const sumTime = (...times: TimeInput[]) => {
	const [firstTime, ...otherTimes] = times.map(parse);
	const output = { ...firstTime };

	otherTimes.forEach(time => {
		UNIT_KEYS.forEach(key => {
			output[key] = output[key] + time[key];
		});
	});

	return output;
};

/**
 * Add values to the current time.
 *
 * @example toDays(addTime({ days: 1 }, { hours: 12 })) // 1.5
 * @returns a number in milliseconds
 */
export const subtractTime = (time: TimeInput, ...timesToSubtract: TimeInput[]) =>
	sumTime(time, ...timesToSubtract.map(negate));

/**
 * Multiply the value of the current time.
 *
 * @example toDays(multiplyTime({ days: 1 }, 2)) // 2
 * @returns a number in milliseconds
 */
export const multiplyTime = (time: TimeInput, multiplier: number) => {
	const output: Time = { ...parse(time) };

	UNIT_KEYS.forEach(key => {
		output[key] *= multiplier;
	});

	return output;
};

/**
 * Divide the value of the current time.
 *
 * @example toMinutes(divideTime({ hours: 1, minutes: 30 }, 2)) // 45
 * @returns a number in milliseconds
 */
export const divideTime = (time: TimeInput, divisor: number) =>
	multiplyTime(time, 1 / divisor);
