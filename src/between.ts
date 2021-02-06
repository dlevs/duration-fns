import { Duration, DateInput } from './types';
import { ZERO, UNITS_META } from './lib/units';

/**
 * Gets the difference between two dates, expressed as a duration object.
 *
 * @example
 * between('2022-01-01', '2020-01-01') // { years: -2, months: 0, weeks: 0, ... }
 */
export const between = (date1: DateInput, date2: DateInput): Duration => {
	const a = new Date(date1);
	const b = new Date(date2);
	const output: Duration = { ...ZERO };

	UNITS_META.forEach(({ unit, dateGetter }) => {
		output[unit] = dateGetter(b) - dateGetter(a);
	});

	return output;
};
