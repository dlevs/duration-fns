import { DEFAULT_TIME, UNITS } from './lib/units';
import { Time, TimeInput, DateInput } from './types';
import floorTowardsZero from './lib/floorTowardsZero';
import { between } from './between';
import { apply } from './apply';
import { toMilliseconds } from './toUnit';
import { subtractTime } from './calculations';

const normalizeApprox = (time: TimeInput) => {
	let remaining = time;
	const output: Time = { ...DEFAULT_TIME };

	UNITS.forEach(({ unit, milliseconds }) => {
		output[unit] = floorTowardsZero(toMilliseconds(remaining) / milliseconds);
		remaining = subtractTime(remaining, { [unit]: output[unit] });
	});

	return output;
};

const normalizeRelative = (
	time: TimeInput,
	referenceDate: DateInput,
) => between(referenceDate, apply(referenceDate, time));

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
	referenceDate?: DateInput,
): Time => {
	if (referenceDate != null) {
		return normalizeRelative(time, referenceDate);
	}

	return normalizeApprox(time);
};
