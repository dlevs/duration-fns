import { UNIT_KEYS, UNITS } from './lib/units';
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

	UNIT_KEYS.forEach(unit => {
		const { dateGetter, dateSetter } = UNITS[unit];

		parsedDate[dateSetter](
			parsedDate[dateGetter]() + parsedDuration[unit],
		);
	});

	return parsedDate;
};
