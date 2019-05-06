import { Time, DateInput } from './types';
import { parseDate } from './lib/parseDate';
import { ZERO, UNITS } from './lib/units';

export const between = (date1: DateInput, date2: DateInput): Time => {
	const a = parseDate(date1);
	const b = parseDate(date2);
	const output: Time = { ...ZERO };

	UNITS.forEach(({ unit, dateGetter }) => {
		output[unit] = dateGetter(b) - dateGetter(a);
	});

	return output;
};
