import toMilliseconds from './toMilliseconds';
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

// TODO: This (and all other calculation functions) should return a time object to
// avoid the lossy conversion to millisceonds...?

export default addTime;
