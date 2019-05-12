import { DurationInput, DateInput } from './types';
import { parseDate, addMonths } from './lib/dateUtils';
import { parse } from './parse';

export const apply = (
	date: DateInput,
	duration: DurationInput,
): Date => {
	const parsedDate = parseDate(date);
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
