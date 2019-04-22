import { TimeInput } from './types';
import toMilliseconds from './toMilliseconds';

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

export default subtractTime;
