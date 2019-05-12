import { UNIT_KEYS } from './units';
import { DurationInput } from '../types';
import { parse } from '../parse';

export const getUnitCount = (duration: DurationInput): number => {
	const parsedTime = { ...parse(duration) };
	let count = 0;

	UNIT_KEYS.forEach(unit => {
		if (parsedTime[unit] !== 0) {
			count++;
		}
	});

	return count;
};
