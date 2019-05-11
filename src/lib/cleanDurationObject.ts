import { UNIT_KEYS } from './units';
import { Time } from '../types';

// TODO: Naming is not consistent here with `time` and `Time`.
export const cleanDurationObject = (time: Time) => {
	const output = { ...time };

	UNIT_KEYS.forEach(key => {
		if (output[key] === -0) {
			output[key] = 0;
		}
	});

	return output;
};
