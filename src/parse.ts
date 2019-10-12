import { ZERO } from './lib/units';
import { Duration, DurationInput } from './types';
import { parseISODuration } from './lib/parseISODuration';
import { validate } from './lib/validate';
import { cleanDurationObject } from './lib/cleanDurationObject';

const baseParse = (duration: DurationInput): Duration => {
	if (typeof duration === 'string') {
		return parseISODuration(duration);
	}

	if (typeof duration === 'number') {
		return { ...ZERO, milliseconds: duration };
	}

	return { ...ZERO, ...duration };
};

/**
 * Parse various duration formats to a simple suration object.
 */
export const parse = (duration: DurationInput): Duration => {
	const output = baseParse(duration);

	validate(output);

	return cleanDurationObject(output);
};
