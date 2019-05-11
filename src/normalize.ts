import { UNITS_MAP } from './lib/units';
import { Time, TimeInput, DateInput } from './types';
import { floorTowardsZero } from './lib/numberUtils';
import { between } from './between';
import { apply } from './apply';
import { toMilliseconds } from './toUnit';
import { subtract } from './subtract';
import { parse } from './parse';

// TODO: Rename "normalizeApprox" since it should no longer be lossy
const normalizeApprox = (time: TimeInput): Time => {
	const { years, months, weeks, days, ...rest } = parse(time);
	const output: Time = {
		...rest,
		years: years + floorTowardsZero(months / 12),
		months: months % 12 || 0, // Prevent `-0` value
		weeks: 0,
		days: 0,
	};
	let remaining: Time = {
		...rest,
		years: 0,
		months: 0,
		weeks: 0,
		days: days + (weeks * 7),
	};

	([
		'days',
		'hours',
		'minutes',
		'seconds',
		'milliseconds',
	] as const).forEach(unit => {
		const { milliseconds } = UNITS_MAP[unit];
		output[unit] = floorTowardsZero(toMilliseconds(remaining) / milliseconds);
		remaining = subtract(remaining, { [unit]: output[unit] });
	});

	return output;
};

const normalizeRelative = (
	time: TimeInput,
	referenceDate: DateInput,
): Time => between(referenceDate, apply(referenceDate, time));

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
	if (referenceDate !== undefined) {
		return normalizeRelative(time, referenceDate);
	}

	return normalizeApprox(time);
};
