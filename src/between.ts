import { Time, DateInput } from './types';
import { parseDate } from './lib/parseDate';

export const between = (date1: DateInput, date2: DateInput): Time => {
	const a = parseDate(date1);
	const b = parseDate(date2);

	return {
		years: b.getFullYear() - a.getFullYear(),
		months: b.getMonth() - a.getMonth(),
		weeks: 0,
		days: b.getDate() - a.getDate(),
		hours: b.getHours() - a.getHours(),
		minutes: b.getMinutes() - a.getMinutes(),
		seconds: b.getSeconds() - a.getSeconds(),
		milliseconds: b.getMilliseconds() - a.getMilliseconds(),
	};
};
