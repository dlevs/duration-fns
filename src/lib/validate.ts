import { Time } from '../types';
import { UNIT_KEYS } from './units';

// TODO: Validate inside the "parse" function, too
export const validate = (time: Time) => {
	(Object.keys(time) as (keyof Time)[]).forEach(unit => {
		if (!UNIT_KEYS.includes(unit)) {
			throw new TypeError(`Unexpected property "${unit}" on Time object.`);
		}

		if (
			typeof time[unit] !== 'number' ||
			Number.isNaN(time[unit]) ||
			time[unit] !== Math.floor(time[unit])
		) {
			throw new TypeError(`Property "${unit}" must be a an integer. Received ${time[unit]}.`);
		}
	});
};
