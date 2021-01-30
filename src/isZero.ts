import { DurationInput } from './types';
import { toMilliseconds } from './toUnit';

/**
 * Returns `true` if all the units of the duration sum to zero.
 *
 * Note, this function performs implicit normalization, so ambiguous
 * units, like months, work with average values.
 *
 * @example
 * isZero('P0D') // true
 * isZero({ years: 0 }) // true
 * isZero({ days: 1, hours: -24 }) // true
 * isZero({ days: 1 }) // false
 */
export const isZero = (duration: DurationInput): boolean =>
	toMilliseconds(duration) === 0;
