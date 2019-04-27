import { Time } from '../types';
import { DEFAULT_TIME, UNITS } from './units';

/**
 * Parse an ISO 8601 duration string into an object.
 *
 * The units of time are not normalized. For example, the string `"P365D"`
 * doesn't get converted to `{ years: 1 }` since not all years are the same
 * length.
 *
 * @example parseISODuration('P365D') // { days: 365 }
 */
export const parseISODuration = (duration: string): Time => {
	const output: Time = { ...DEFAULT_TIME };
	const [date, time] = duration
		.replace(/,/g, '.')
		.replace(/-:/g, '')
		.split(/T/i);

	UNITS.forEach(({ unit, ISOPrecision, ISOCharacter }) => {
		if (ISOCharacter === null) {
			return;
		}

		const regex = new RegExp(`([\\d.]+)${ISOCharacter}`, 'i');
		const portionToTest = ISOPrecision === 'time' ? time : date;

		if (!portionToTest) {
			return;
		}

		const match = portionToTest.match(regex);

		if (match === null) {
			return;
		}

		output[unit] = Number(match[1]);
	});

	return output;
};
