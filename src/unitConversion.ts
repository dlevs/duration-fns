import { TimeInput } from './types';
import { normalizeTimeInput } from './normalize';
import {
	MILLISECONDS_IN_A_SECOND,
	MILLISECONDS_IN_A_MINUTE,
	MILLISECONDS_IN_AN_HOUR,
	MILLISECONDS_IN_A_DAY,
	MILLISECONDS_IN_A_WEEK,
	MILLISECONDS_IN_A_MONTH,
	MILLISECONDS_IN_A_YEAR,
} from './lib/constants';

/**
 * Convert the input value to milliseconds represented by a `Time` object.
 * If a number is passed this is returned verbatim as the number
 * of milliseconds.
 *
 * @example toMilliseconds({ days: 1 }) // 86400000
 */
export const toMilliseconds = (time: TimeInput): number => {
	const	{
		years,
		months,
		weeks,
		days,
		hours,
		minutes,
		seconds,
		milliseconds,
	} = normalizeTimeInput(time);

	return (
		years * MILLISECONDS_IN_A_YEAR +
		months * MILLISECONDS_IN_A_MONTH +
		weeks * MILLISECONDS_IN_A_WEEK +
		days * MILLISECONDS_IN_A_DAY +
		hours * MILLISECONDS_IN_AN_HOUR +
		minutes * MILLISECONDS_IN_A_MINUTE +
		seconds * MILLISECONDS_IN_A_SECOND +
		milliseconds
	);
};

const createTimeConverter = (divisor: number) =>
	(time: TimeInput) => toMilliseconds(time) / divisor;

/**
 * Convert the input value to seconds.
 * @example toSeconds({ minutes: 2 }) // 120
 */
export const toSeconds = createTimeConverter(MILLISECONDS_IN_A_SECOND);

/**
 * Convert the input value to minutes.
 * @example toMinutes({ hours: 1, minutes: 10 }) // 70
 */
export const toMinutes = createTimeConverter(MILLISECONDS_IN_A_MINUTE);

/**
 * Convert the input value to hours.
 * @example toHours({ days: 1 }) // 24
 */
export const toHours = createTimeConverter(MILLISECONDS_IN_AN_HOUR);

/**
 * Convert the input value to days.
 * @example toDays({ hours: 12 }) // 0.5
 */
export const toDays = createTimeConverter(MILLISECONDS_IN_A_DAY);

/**
 * Convert the input value to weeks.
 * @example toWeeks({ days: 14 }) // 2
 */
export const toWeeks = createTimeConverter(MILLISECONDS_IN_A_WEEK);

/**
 * Convert the input value to months.
 * Note, this is a rough approximation as the length of a month is variable.
 *
 * @example toMonths({ months: 10, days: 365 }) // 11
 */
export const toMonths = createTimeConverter(MILLISECONDS_IN_A_MONTH);

/**
 * Convert the input value to years.
 * Note, this is a rough approximation as the length of a year is variable.
 *
 * @example toYears({ years: 10, days: 365 }) // 11
 */
export const toYears = createTimeConverter(MILLISECONDS_IN_A_YEAR);
