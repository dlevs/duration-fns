import toMilliseconds from './toMilliseconds';
import { TimeInput } from './types';

/**
 * Multiply the value of the current time.
 *
 * @example toDays(multiplyTime({ days: 1 }, 2)) // 2
 * @returns a number in milliseconds
 */
export const multiplyTime = (time: TimeInput, multiplier: number) =>
	toMilliseconds(time) * multiplier;

export default multiplyTime;
