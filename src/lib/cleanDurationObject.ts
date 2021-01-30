import { UNITS_LARGE_TO_SMALL } from './units';
import { Duration } from '../types';

export const cleanDurationObject = (duration: Readonly<Duration>) => {
	const output = { ...duration };

	UNITS_LARGE_TO_SMALL.forEach(key => {
		// Convert `-0` to `0`. Both values will evaluate as `true` here.
		if (output[key] === 0) {
			output[key] = 0;
		}
	});

	return output;
};
