import { Time, TimeInput } from './types';
import { TIME_KEYS } from './lib/constants';
import { normalizeTimeInput } from './normalize';

const createTimeReducer = (sum: (n1: number, n2: number) => number) =>
	(...times: TimeInput[]) => {
		const [firstTime, ...otherTimes] = times.map(normalizeTimeInput);
		const output = { ...firstTime };

		otherTimes.forEach(time => {
			TIME_KEYS.forEach(key => {
				output[key] = sum(output[key], time[key]);
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
export const addTime = createTimeReducer((n1, n2) => n1 + n2);

/**
 * Add values to the current time.
 *
 * @example toDays(addTime({ days: 1 }, { hours: 12 })) // 1.5
 * @returns a number in milliseconds
 */
export const subtractTime = createTimeReducer((n1, n2) => n1 - n2);

/**
 * Multiply the value of the current time.
 *
 * @example toDays(multiplyTime({ days: 1 }, 2)) // 2
 * @returns a number in milliseconds
 */
export const multiplyTime = (time: TimeInput, multiplier: number) => {
	const output: Time = { ...normalizeTimeInput(time) };

	TIME_KEYS.forEach(key => {
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
