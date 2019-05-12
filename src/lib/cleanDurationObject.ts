import { UNIT_KEYS } from './units';
import { Duration } from '../types';

export const cleanDurationObject = (duration: Duration) => {
	const output = { ...duration };

	UNIT_KEYS.forEach(key => {
		if (output[key] === -0) {
			output[key] = 0;
		}
	});

	return output;
};
