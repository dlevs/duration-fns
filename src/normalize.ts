import { UNITS_MAP, ZERO } from './lib/units';
import { Duration, DurationInput, DateInput } from './types';
import { between } from './between';
import { apply } from './apply';
import { toMilliseconds } from './toUnit';
import { parse } from './parse';

const normalizeUnambiguous = (duration: DurationInput): Duration => {
	// Handle fuzzy units. For example, we can normalize years and months
	// with each other, but not easily with other units as they are ambiguous.
	const {
		years, months, weeks, days, ...rest
	} = parse(duration);
	const output: Duration = {
		...ZERO,
		years: years + ~~(months / 12),
		months: (months % 12) || 0, // prevent `-0` value
	};
	let remaining = toMilliseconds({
		...rest,
		days: days + (weeks * 7),
	});

	// Normalize unambiguous units. It could be argued that `days` is ambiguous as
	// a day is not always 24 hours long, but the ISO 8601 spec says a day is 24 hours.
	// When not changing timezones, a day is consistently 24 hours, whereas months
	// and years are consistently irregular.
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
 * Convert a `Duration` object or number of milliseconds into a complete
 * `Duration` object that expresses the duration in the most appropriate units.
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

	return normalizeUnambiguous(duration);
};
