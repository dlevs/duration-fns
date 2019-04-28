import { UNIT_KEYS } from './units';
import { TimeInput } from '../types';
import { parse } from '../parse';

export const getUnitCount = (time: TimeInput): number => {
	const parsedTime = { ...parse(time) };
	let count = 0;

	UNIT_KEYS.forEach(unit => {
		if (parsedTime[unit] !== 0) {
			count++;
		}
	});

	return count;
};
