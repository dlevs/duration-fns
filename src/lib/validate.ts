import { Duration } from '../types';
import { UNITS_LARGE_TO_SMALL } from './units';

export const validate = (duration: Readonly<Duration>) => {
	(Object.keys(duration) as (keyof Duration)[]).forEach(unit => {
		if (!UNITS_LARGE_TO_SMALL.includes(unit)) {
			throw new TypeError(`Unexpected property "${unit}" on Duration object.`);
		}

		if (!Number.isInteger(duration[unit])) {
			throw new TypeError(`Property "${unit}" must be a an integer. Received ${duration[unit]}.`);
		}
	});
};
