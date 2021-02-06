import { UNITS } from './units';
import { Duration } from '../types';

export const cleanDurationObject = (duration: Readonly<Duration>): Readonly<Duration> => {
	const output = { ...duration };

	UNITS.forEach(key => {
		// Convert `-0` to `0`. Both values will evaluate as `true` here.
		if (output[key] === 0) {
			output[key] = 0;
		}
	});

	return output;
};
