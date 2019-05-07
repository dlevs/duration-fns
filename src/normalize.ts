import { UNITS_MAP, ZERO } from './lib/units';
import { Time, TimeInput, DateInput } from './types';
import floorTowardsZero from './lib/floorTowardsZero';
import { between } from './between';
import { apply } from './apply';
import { toMilliseconds } from './toUnit';
import { subtract } from './calculations';
import { parse } from './parse';

// TODO: Rename "normalizeApprox" since it should no longer be lossy
const normalizeApprox = (time: TimeInput) => {
	let remaining = { ...parse(time) };

	const manualConversions = {
		years: remaining.years + floorTowardsZero(remaining.months / 12),
		months: remaining.months % 12 || 0, // Prevent `-0` value
		weeks: 0,
		days: remaining.days + (remaining.weeks * 7),
	};
	const output = {
		...ZERO,
		...manualConversions,
	};
	const manualKeys = Object.keys(manualConversions) as (keyof typeof manualConversions)[];
	const autoKeys = ['days', 'hours', 'minutes', 'seconds', 'milliseconds'] as const;

	manualKeys.forEach(unit => {
		remaining[unit] = 0;
	});

	autoKeys.forEach(unit => {
		const { milliseconds } = UNITS_MAP[unit];
		const valueToAdd = floorTowardsZero(toMilliseconds(remaining) / milliseconds);
		output[unit] += valueToAdd;
		remaining = subtract(remaining, { [unit]: valueToAdd });
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
 * // { remaining.years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 4, milliseconds: 0 }
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
