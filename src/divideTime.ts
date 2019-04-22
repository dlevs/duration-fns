import toMilliseconds from './toMilliseconds';
import normalizeTime from './normalizeTime';
import { TimeInput } from './types';

/**
 * Divide the value of the current time.
 *
 * @example new Time({ hours: 1, minutes: 30 }).divide(2).getMinutes() // 45
 * @returns a new instance of `Time`
 */
export const divideTime = (time: TimeInput, divisor: number) =>
	normalizeTime(toMilliseconds(time) / divisor);

export default divideTime;
