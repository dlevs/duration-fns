import { UNIT_KEYS } from './lib/units';
import { Time, TimeInput } from './types';
import { parse } from './parse';

export const negate = (time: TimeInput): Time => {
	const output = { ...parse(time) };

	UNIT_KEYS.forEach(unit => {
		output[unit] = output[unit] === 0
			? 0
			: -output[unit];
	});

	return output;
};
