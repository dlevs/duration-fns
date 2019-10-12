import { Duration } from '../types';
import { UNIT_KEYS } from './units';

export const validate = (duration: Readonly<Duration>) => {
	(Object.keys(duration) as (keyof Duration)[]).forEach(unit => {
		if (!UNIT_KEYS.includes(unit)) {
			throw new TypeError(`Unexpected property "${unit}" on Duration object.`);
		}

		if (!Number.isInteger(duration[unit])) {
			throw new TypeError(`Property "${unit}" must be a an integer. Received ${duration[unit]}.`);
		}
	});
};
