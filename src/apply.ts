import { UNITS } from './lib/units';
import { DurationInput, DateInput } from './types';
import { parseDate } from './lib/parseDate';
import { parse } from './parse';

export const apply = (
	date: DateInput,
	duration: DurationInput,
): Date => {
	const parsedDate = parseDate(date);
	const parsedDuration = parse(duration);

	UNITS.forEach(({ unit, addToDate }) => {
		addToDate(parsedDate, parsedDuration[unit]);
	});

	return parsedDate;
};
