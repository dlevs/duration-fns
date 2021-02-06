import { DurationInput } from './types';
import { parse } from './parse';
import { UNITS_META, UNITS_META_MAP } from './lib/units';

/**
 * Convert the input value to milliseconds represented by a duration object.
 * If a number is passed this is returned verbatim as the number
 * of milliseconds.
 *
 * @example toMilliseconds({ days: 1 }) // 86400000
 */
export const toMilliseconds = (duration: DurationInput): number => {
	const parsed = parse(duration);

	return UNITS_META.reduce((total, { unit, milliseconds }) => {
		return total + (parsed[unit] * milliseconds);
	}, 0);
};

/**
 * Convert the input value to the specificed unit.
 * @example toUnit({ minutes: 2 }, 'seconds') // 120
 */
export const toUnit = (
	duration: DurationInput,
	unit: keyof typeof UNITS_META_MAP,
): number => {
	return toMilliseconds(duration) / UNITS_META_MAP[unit].milliseconds;
};

const createDurationConverter = (unit: keyof typeof UNITS_META_MAP) => {
	return (duration: DurationInput): number => toUnit(duration, unit);
};

/**
 * Convert the input value to seconds.
 * @example toSeconds({ minutes: 2 }) // 120
 */
export const toSeconds = createDurationConverter('seconds');

/**
 * Convert the input value to minutes.
 * @example toMinutes({ hours: 1, minutes: 10 }) // 70
 */
export const toMinutes = createDurationConverter('minutes');

/**
 * Convert the input value to hours.
 * @example toHours({ days: 1 }) // 24
 */
export const toHours = createDurationConverter('hours');

/**
 * Convert the input value to days.
 * @example toDays({ hours: 12 }) // 0.5
 */
export const toDays = createDurationConverter('days');

/**
 * Convert the input value to weeks.
 * @example toWeeks({ days: 14 }) // 2
 */
export const toWeeks = createDurationConverter('weeks');

/**
 * Convert the input value to months.
 * Note, this is a rough approximation as the length of a month is variable.
 *
 * @example toMonths({ months: 10, days: 365 }) // 11
 */
export const toMonths = createDurationConverter('months');

/**
 * Convert the input value to years.
 * Note, this is a rough approximation as the length of a year is variable.
 *
 * @example toYears({ years: 10, days: 365 }) // 11
 */
export const toYears = createDurationConverter('years');
