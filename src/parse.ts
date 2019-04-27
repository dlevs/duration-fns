import { DEFAULT_TIME } from './lib/units';
import { Time, TimeInput } from './types';
import { parseISODuration } from './lib/parseISODuration';

/**
 * Format various time formats to a simple `Time` object.
 */
export const parse = (time: TimeInput): Time => {
	if (typeof time === 'string') {
		return parseISODuration(time);
	}

	if (typeof time === 'number') {
		return { ...DEFAULT_TIME, milliseconds: time };
	}

	return { ...DEFAULT_TIME, ...time };
};
