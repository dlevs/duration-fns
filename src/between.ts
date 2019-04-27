import { Time, DateInput } from './types';
import { parseDate } from './lib/parseDate';
import { DEFAULT_TIME, UNIT_KEYS, UNITS } from './lib/units';

export const between = (date1: DateInput, date2: DateInput): Time => {
	const a = parseDate(date1);
	const b = parseDate(date2);
	const output: Time = { ...DEFAULT_TIME };

	UNIT_KEYS.forEach(unit => {
		const { dateGetter } = UNITS[unit];
		output[unit] = dateGetter(b) - dateGetter(a);
	});

	return output;
};
