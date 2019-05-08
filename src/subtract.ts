import { Time, TimeInput } from './types';
import { negate } from './negate';
import { sum } from './sum';

/**
 * Add values to the current time.
 *
 * @example toDays(addTime({ days: 1 }, { hours: 12 })) // 1.5
 * @returns a number in milliseconds
 */
export const subtract = (time: TimeInput, ...timesToSubtract: TimeInput[]): Time =>
	sum(time, ...timesToSubtract.map(negate));
