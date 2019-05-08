import { Time } from '../types';
import { UNIT_KEYS } from './units';

export const validate = (time: Time) => {
	(Object.keys(time) as (keyof Time)[]).forEach(unit => {
		if (!UNIT_KEYS.includes(unit)) {
			throw new TypeError(`Unexpected property "${unit}" on Time object.`);
		}

		if (
			// tslint:disable-next-line:strict-type-predicates
			typeof time[unit] !== 'number' ||
			Number.isNaN(time[unit]) ||
			time[unit] !== Math.floor(time[unit])
		) {
			throw new TypeError(`Property "${unit}" must be a an integer. Received ${time[unit]}.`);
		}
	});
};
