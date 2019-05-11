import { ZERO } from './lib/units';
import { Time, TimeInput } from './types';
import { parseISODuration } from './lib/parseISODuration';
import { validate } from './lib/validate';
import { cleanDurationObject } from './lib/cleanDurationObject';

const baseParse = (time: TimeInput): Time => {
	if (typeof time === 'string') {
		return parseISODuration(time);
	}

	if (typeof time === 'number') {
		return { ...ZERO, milliseconds: time };
	}

	return { ...ZERO, ...time };
};

/**
 * Format various time formats to a simple `Time` object.
 */
export const parse = (time: TimeInput): Time => {
	const output = baseParse(time);

	validate(output);

	return cleanDurationObject(output);
};
