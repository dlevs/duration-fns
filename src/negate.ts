import { UNIT_KEYS } from './lib/units';
import { Duration, DurationInput } from './types';
import { parse } from './parse';

export const negate = (duration: DurationInput): Duration => {
	const output = { ...parse(duration) };

	UNIT_KEYS.forEach(unit => {
		output[unit] = output[unit] === 0
			? 0
			: -output[unit];
	});

	return output;
};
