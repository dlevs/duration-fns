import { UNITS } from './units';
import { DurationInput } from '../types';
import { parse } from '../parse';

export const getUnitCount = (duration: DurationInput): number => {
	const parsed = { ...parse(duration) };
	let count = 0;

	UNITS.forEach(unit => {
		if (parsed[unit] !== 0) {
			count++;
		}
	});

	return count;
};
