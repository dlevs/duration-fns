import { TimeInput } from './types';
import toMilliseconds from './toMilliseconds';
import normalizeTime from './normalizeTime';

/**
 * Subtract values from the current time.
 *
 * @example new Time({ days: 1 }).subtract({ hours: 12 }).getDays() // 0.5
 * @returns a new instance of `Time`
 */
export const subtractTime = (time: TimeInput, ...timesToSubtract: TimeInput[]) =>
normalizeTime(timesToSubtract.reduce(
	(n1: number, n2: TimeInput) => n1 - toMilliseconds(n2),
	toMilliseconds(time),
));

export default subtractTime;
