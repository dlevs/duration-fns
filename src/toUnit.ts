import { TimeInput } from './types';
import { parse } from './parse';
import { UNITS, UNIT_KEYS } from './lib/units';

/**
 * Convert the input value to milliseconds represented by a `Time` object.
 * If a number is passed this is returned verbatim as the number
 * of milliseconds.
 *
 * @example toMilliseconds({ days: 1 }) // 86400000
 */
export const toMilliseconds = (time: TimeInput): number => {
	const parsedTime = parse(time);

	return UNIT_KEYS.reduce((total, unit) => {
		return total + (parsedTime[unit] * UNITS[unit].milliseconds);
	}, 0);
};

const createTimeConverter = (unit: keyof typeof UNITS) =>
	(time: TimeInput) => toMilliseconds(time) / UNITS[unit].milliseconds;

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
