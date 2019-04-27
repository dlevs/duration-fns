import { UNITS } from './lib/units';
import { TimeInput, DateInput } from './types';
import { parseDate } from './lib/parseDate';
import { parse } from './parse';

// TODO: Rename all to "Duration"?
export const apply = (
	date: DateInput,
	duration: TimeInput,
): Date => {
	const parsedDate = parseDate(date);
	const parsedDuration = parse(duration);

	UNITS.forEach(({ unit, addToDate }) => {
		addToDate(parsedDate, parsedDuration[unit]);
	});

	return parsedDate;
};
