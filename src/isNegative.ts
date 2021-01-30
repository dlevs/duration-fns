import { DurationInput } from './types';
import { toMilliseconds } from './toUnit';

/**
 * Returns `true` if a duration is negative overall.
 *
 * Note, this function performs implicit normalization, so ambiguous
 * units, like months, work with average values.
 *
 * @example
 * isNegative('P-1D') // true
 * isNegative({ days: 1, hours: -25 }) // true
 * isNegative({ days: 1, hours: -23 }) // false
 */
export const isNegative = (duration: DurationInput): boolean =>
	toMilliseconds(duration) < 0;
