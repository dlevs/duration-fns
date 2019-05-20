import { DurationInput, DateInput } from './types';
import { parse } from './parse';
import { UNITS, UNITS_MAP, ZERO } from './lib/units';
import { parseDate } from './lib/dateUtils';
import { apply } from './apply';

/**
 * Convert the input value to milliseconds represented by a `Time` object.
 * If a number is passed this is returned verbatim as the number
 * of milliseconds.
 *
 * @example toMilliseconds({ days: 1 }) // 86400000
 */
export const toMilliseconds = (
	duration: DurationInput,
	referenceDate?: DateInput,
): number => {
	if (referenceDate !== undefined) {
		// TODO: Does it work for "toMonths", etc?
		return apply(referenceDate, duration).getTime() - parseDate(referenceDate).getTime();
	}

	const parsedTime = parse(duration);

	return UNITS.reduce((total, { unit, milliseconds }) => {
		return total + (parsedTime[unit] * milliseconds);
	}, 0);
};

const createBaseTimeConverter = (unit: keyof typeof UNITS_MAP) =>
	(duration: DurationInput, referenceDate?: DateInput): number => {
		return toMilliseconds(duration, referenceDate) / UNITS_MAP[unit].milliseconds;
	};

const baseToMonths = createBaseTimeConverter('months');
const baseToYears = createBaseTimeConverter('years');

// TODO: Document this. Why handling months and years is different.
// TODO: Tidy this file, maybe move "toMilliseconds" and the conversion files out to separate files.
const createTimeConverter = (unit: keyof typeof UNITS_MAP) => {
	const baseTimeConverter = createBaseTimeConverter(unit);

	return (duration: DurationInput, referenceDate?: DateInput): number => {
		if ((unit === 'years' || unit === 'months') && referenceDate) {
			const { years, months: monthsRaw, ...rest } = parse(duration);
			const paddedRest = { ...ZERO, ...rest };
			const months = (years * 12) + monthsRaw;

			if (unit === 'years') {
				return months / 12 + baseToYears(paddedRest, referenceDate);
			}

			// TODO: Does any of this make sense? "baseToMonths" adds milliseconds for a generic month, not anything clever based on referenceDate. If that case has real-world value, then the "apply" function could also do something similar.
			// TODO: Test adding days for different month lengths for `toMonths`, and similar for years.
			return months + baseToMonths(paddedRest, referenceDate);
		}

		return baseTimeConverter(duration, referenceDate);
	};
};

/**
 * Convert the input value to seconds.
 * @example toSeconds({ minutes: 2 }) // 120
 */
export const toSeconds = createTimeConverter('seconds');

/**
 * Convert the input value to minutes.
 * @example toMinutes({ hours: 1, minutes: 10 }) // 70
 */
export const toMinutes = createTimeConverter('minutes');

/**
 * Convert the input value to hours.
 * @example toHours({ days: 1 }) // 24
 */
export const toHours = createTimeConverter('hours');

/**
 * Convert the input value to days.
 * @example toDays({ hours: 12 }) // 0.5
 */
export const toDays = createTimeConverter('days');

/**
 * Convert the input value to weeks.
 * @example toWeeks({ days: 14 }) // 2
 */
export const toWeeks = createTimeConverter('weeks');

/**
 * Convert the input value to months.
 * Note, this is a rough approximation as the length of a month is variable.
 *
 * @example toMonths({ months: 10, days: 365 }) // 11
 */
export const toMonths = createTimeConverter('months');

/**
 * Convert the input value to years.
 * Note, this is a rough approximation as the length of a year is variable.
 *
 * @example toYears({ years: 10, days: 365 }) // 11
 */
export const toYears = createTimeConverter('years');
