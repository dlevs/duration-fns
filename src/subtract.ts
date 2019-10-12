import { Duration, DurationInput } from './types';
import { negate } from './negate';
import { sum } from './sum';

/**
 * Subtract durations from the first duration argument.
 *
 * @example toDays(subtract({ days: 1 }, { hours: 12 })) // 1.5
 * @returns a number in milliseconds
 */
export const subtract = (
	duration: DurationInput,
	...durationsToSubtract: DurationInput[]
): Duration =>
	sum(duration, ...durationsToSubtract.map(negate));
