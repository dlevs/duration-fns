import toMilliseconds from './toMilliseconds';
import normalizeTime from './normalizeTime';
import { TimeInput } from './types';

/**
 * Add values to the current time.
 *
 * @example new Time({ days: 1 }).add({ hours: 12 }).getDays() // 1.5
 * @returns a new instance of `Time`
 */
export const addTime = (...times: TimeInput[]) =>
	normalizeTime(times.reduce(
		(n1: number, n2: TimeInput) => n1 + toMilliseconds(n2),
		0,
	));

export default addTime;
