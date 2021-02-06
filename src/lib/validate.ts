import { Duration } from '../types';
import { UNITS } from './units';

export const validate = (duration: Readonly<Duration>): void => {
	(Object.keys(duration) as (keyof Duration)[]).forEach(unit => {
		if (!UNITS.includes(unit)) {
			throw new TypeError(`Unexpected property "${unit}" on Duration object.`);
		}

		if (!Number.isInteger(duration[unit])) {
			throw new TypeError(`Property "${unit}" must be a an integer. Received ${duration[unit]}.`);
		}
	});
};
