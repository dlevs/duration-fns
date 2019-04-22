import toMilliseconds from './toMilliseconds';
import { TimeInput } from './types';

/**
 * Divide the value of the current time.
 *
 * @example toMinutes(divideTime({ hours: 1, minutes: 30 }, 2)) // 45
 * @returns a number in milliseconds
 */
export const divideTime = (time: TimeInput, divisor: number) =>
	toMilliseconds(time) / divisor;

export default divideTime;
