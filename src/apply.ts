import { DurationInput, DateInput } from './types';
import { parseDate } from './lib/parseDate';
import { parse } from './parse';

// TODO: Tidy and move this, then test
const getDaysInMonth = (date: Date) => {
	const monthIndex = date.getMonth();
	const lastDayOfMonth = new Date(0);
	lastDayOfMonth.setFullYear(date.getFullYear(), monthIndex + 1, 0);
	lastDayOfMonth.setHours(0, 0, 0, 0);
	return lastDayOfMonth.getDate();
};

const addMonths = (date: Date, value: number) => {
		// TODO: Test me:
	const desiredMonth = date.getMonth() + value;
	const dateWithDesiredMonth = new Date(0);
	dateWithDesiredMonth.setFullYear(date.getFullYear(), desiredMonth, 1);
	dateWithDesiredMonth.setHours(0, 0, 0, 0);
	const daysInMonth = getDaysInMonth(dateWithDesiredMonth);
	// Set the last day of the new month
	// if the original date was the last day of the longer month
	date.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()));
};

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
