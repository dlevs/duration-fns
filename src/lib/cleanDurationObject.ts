import { UNIT_KEYS } from './units';
import { Duration } from '../types';

export const cleanDurationObject = (duration: Readonly<Duration>) => {
	const output = { ...duration };

	UNIT_KEYS.forEach(key => {
		// Convert `-0` to `0`. Both values will evaluate as `true` here.
		if (output[key] === 0) {
			output[key] = 0;
		}
	});

	return output;
};
