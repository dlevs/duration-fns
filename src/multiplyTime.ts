import toMilliseconds from './toMilliseconds';
import normalizeTime from './normalizeTime';
import { TimeInput } from './types';

/**
 * Multiply the value of the current time.
 *
 * @example new Time({ days: 1 }).multiply(2).getDays() // 2
 * @returns a new instance of `Time`
 */
export const multiplyTime = (time: TimeInput, multiplier: number) =>
	normalizeTime(toMilliseconds(time) * multiplier);

export default multiplyTime;
