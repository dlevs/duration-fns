import { Duration } from '../types';
import { UNIT_KEYS } from './units';

export const validate = (duration: Duration) => {
	(Object.keys(duration) as (keyof Duration)[]).forEach(unit => {
		if (!UNIT_KEYS.includes(unit)) {
			throw new TypeError(`Unexpected property "${unit}" on Time object.`);
		}

		if (
			// tslint:disable-next-line:strict-type-predicates
			typeof duration[unit] !== 'number' ||
			Number.isNaN(duration[unit]) ||
			duration[unit] !== Math.floor(duration[unit])
		) {
			throw new TypeError(`Property "${unit}" must be a an integer. Received ${duration[unit]}.`);
		}
	});
};
