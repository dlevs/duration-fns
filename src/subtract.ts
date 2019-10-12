import { Duration, DurationInput } from './types';
import { negate } from './negate';
import { sum } from './sum';

/**
 * Subtract durations from the first duration argument.
 *
 * @example
 * subtract({ days: 1 }, { hours: 12 })
 * // { days: 1, hours: -12 }
 */
export const subtract = (
	duration: DurationInput,
	...durationsToSubtract: DurationInput[]
): Duration =>
	sum(duration, ...durationsToSubtract.map(negate));
