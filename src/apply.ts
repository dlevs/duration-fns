import { DurationInput, DateInput } from './types';
import { addMonths } from './lib/dateUtils';
import { parse } from './parse';

/**
 * Return a new date with the duration applied.
 *
 * @example
 * const newDate = apply('2020-01-01T00:00:00.000Z', { years: 2 })
 * newDate.toISOString() // '2022-01-01T00:00:00.000Z'
 */
export const apply = (
	date: DateInput,
	duration: DurationInput,
): Date => {
	const parsedDate = new Date(date);
	const {
		years,
		months,
		weeks,
		days,
		hours,
		minutes,
		seconds,
		milliseconds,
	} = parse(duration);

	addMonths(parsedDate, (years * 12) + months);
	parsedDate.setDate(parsedDate.getDate() + (weeks * 7) + days);
	parsedDate.setHours(
		parsedDate.getHours() + hours,
		parsedDate.getMinutes() + minutes,
		parsedDate.getSeconds() + seconds,
		parsedDate.getMilliseconds() + milliseconds,
	);

	return parsedDate;
};
