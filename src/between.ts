import { Duration, DateInput } from './types';
import { ZERO, UNITS } from './lib/units';

export const between = (date1: DateInput, date2: DateInput): Duration => {
	const a = new Date(date1);
	const b = new Date(date2);
	const output: Duration = { ...ZERO };

	UNITS.forEach(({ unit, dateGetter }) => {
		output[unit] = dateGetter(b) - dateGetter(a);
	});

	return output;
};
