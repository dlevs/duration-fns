import { UNIT_KEYS } from './units';
import { Duration } from '../types';

export const cleanDurationObject = (duration: Duration) => {
	const output = { ...duration };

	UNIT_KEYS.forEach(key => {
		// This statement also evaluates to true when `output[key]` is positive `0`.
		// Either way, the result is the same and the value is normalized.
		if (output[key] === -0) {
			// On node v12.2.0, assigning a value of `0` to a property that was previously
			// `-0` does not always have an effect, so we assign a non-zero value first.
			// https://github.com/nodejs/node/issues/27784
			output[key] = 1;
			output[key] = 0;
		}
	});

	return output;
};
