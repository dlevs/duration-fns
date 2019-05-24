import { UNIT_KEYS } from './units';
import { Duration } from '../types';

export const cleanDurationObject = (duration: Duration) => {
	const output = { ...duration };

	UNIT_KEYS.forEach(key => {
		// This statement also evaluates to true when `output[key]` is positive `0`.
		// Either way, the result is the same and the value is normalized.
		if (output[key] === -0) {
			output[key] = 0;
		}
	});

	return output;
};
