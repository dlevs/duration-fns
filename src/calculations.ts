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
export const sum = (...times: TimeInput[]) => {
	const [firstTime, ...otherTimes] = times.map(parse);
	const output = { ...firstTime };

	otherTimes.forEach(time => {
		UNIT_KEYS.forEach(key => {
			output[key] += time[key];
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
export const subtract = (time: TimeInput, ...timesToSubtract: TimeInput[]) =>
	sum(time, ...timesToSubtract.map(negate));

/**
 * Multiply the value of the current time.
 *
 * @example toDays(multiplyTime({ days: 1 }, 2)) // 2
 * @returns a number in milliseconds
 */
export const multiply = (time: TimeInput, multiplier: number) => {
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
export const divide = (time: TimeInput, divisor: number) =>
	multiply(time, 1 / divisor);
