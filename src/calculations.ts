import { toMilliseconds } from './unitConversion';
import { TimeInput } from './types';

/**
 * Add values to the current time.
 *
 * @example toDays(addTime({ days: 1 }, { hours: 12 })) // 1.5
 * @returns a number in milliseconds
 */
export const addTime = (...times: TimeInput[]) =>
	times.reduce(
		(n1: number, n2: TimeInput) => n1 + toMilliseconds(n2),
		0,
	);

/**
 * Subtract values from the current time.
 *
 * @example toDays(subtractTime({ days: 1 }, { hours: 12 })) // 0.5
 * @returns a number in milliseconds
 */
export const subtractTime = (time: TimeInput, ...timesToSubtract: TimeInput[]) =>
	timesToSubtract.reduce(
		(n1: number, n2: TimeInput) => n1 - toMilliseconds(n2),
		toMilliseconds(time),
	);

/**
 * Multiply the value of the current time.
 *
 * @example toDays(multiplyTime({ days: 1 }, 2)) // 2
 * @returns a number in milliseconds
 */
export const multiplyTime = (time: TimeInput, multiplier: number) =>
	toMilliseconds(time) * multiplier;

/**
 * Divide the value of the current time.
 *
 * @example toMinutes(divideTime({ hours: 1, minutes: 30 }, 2)) // 45
 * @returns a number in milliseconds
 */
export const divideTime = (time: TimeInput, divisor: number) =>
	toMilliseconds(time) / divisor;
