import { UNITS_MAP, ZERO } from './lib/units';
import { Duration, DurationInput, DateInput } from './types';
import { between } from './between';
import { apply } from './apply';
import { toMilliseconds } from './toUnit';
import { parse } from './parse';

// TODO: Rename "normalizeApprox" since it should no longer be lossy
const normalizeApprox = (duration: DurationInput): Duration => {
	const {
		years, months, weeks, days, ...rest
	} = parse(duration);
	const output: Duration = {
		...ZERO,
		years: years + ~~(months / 12),
		months: (months % 12) || 0, // Prevent `-0` value
	};
	let remaining = toMilliseconds({
		...rest,
		days: days + (weeks * 7),
	});

	([
		'days',
		'hours',
		'minutes',
		'seconds',
		'milliseconds',
	] as const).forEach(unit => {
		const { milliseconds } = UNITS_MAP[unit];
		output[unit] = ~~(remaining / milliseconds);
		remaining -= output[unit] * milliseconds;
	});

	return output;
};

const normalizeRelative = (
	duration: DurationInput,
	referenceDate: DateInput,
): Duration => between(referenceDate, apply(referenceDate, duration));

/**
 * Convert a `Time` object or number of milliseconds into a complete
 * `Time` object that expresses the duration in the most appropriate units.
 *
 * @example
 * normalize({ milliseconds 4000 })
 * // { years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 4, milliseconds: 0 }
 */
export const normalize = (
	duration: DurationInput,
	referenceDate?: DateInput,
): Duration => {
	if (referenceDate != null) {
		return normalizeRelative(duration, referenceDate);
	}

	return normalizeApprox(duration);
};
