import { DEFAULT_TIME, UNIT_KEYS, UNITS } from './lib/units';
import { Time, TimeInput } from './types';
import floorTowardsZero from './lib/floorTowardsZero';
import { between } from './between';
import { apply } from './apply';
import { toMilliseconds } from './toUnit';
import { subtractTime } from './calculations';

/**
 * Convert a `Time` object or number of milliseconds into a complete
 * `Time` object that expresses the time in the most appropriate units.
 *
 * @example
 * normalize({ milliseconds 4000 })
 * // { years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 4, milliseconds: 0 }
 */
export const normalize = (
	time: TimeInput,
	referenceDate?: string | number | Date,
): Time => {
	if (referenceDate != null) {
		return between(referenceDate, apply(referenceDate, time));
	}

	let remaining = time;
	const output: Time = { ...DEFAULT_TIME };

	UNIT_KEYS.forEach(unit => {
		const { milliseconds } = UNITS[unit];

		output[unit] = floorTowardsZero(toMilliseconds(remaining) / milliseconds);
		remaining = subtractTime(remaining, { [unit]: output[unit] });
	});

	return output;
};
