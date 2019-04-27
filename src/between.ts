import { Time, DateInput } from './types';
import { parseDate } from './lib/parseDate';
import { DEFAULT_TIME, UNITS } from './lib/units';

export const between = (date1: DateInput, date2: DateInput): Time => {
	const a = parseDate(date1);
	const b = parseDate(date2);
	const output: Time = { ...DEFAULT_TIME };

	UNITS.forEach(({ unit, dateGetter }) => {
		output[unit] = dateGetter(b) - dateGetter(a);
	});

	return output;
};
