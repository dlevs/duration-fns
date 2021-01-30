import { UNITS_LARGE_TO_SMALL } from './units';
import { DurationInput } from '../types';
import { parse } from '../parse';

export const getUnitCount = (duration: DurationInput): number => {
	const parsed = { ...parse(duration) };
	let count = 0;

	UNITS_LARGE_TO_SMALL.forEach(unit => {
		if (parsed[unit] !== 0) {
			count++;
		}
	});

	return count;
};
