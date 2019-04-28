import { Time } from '../types';
import { DEFAULT_TIME, UNITS } from './units';

const normalizeDuration = (duration: string): string =>
	duration
		.replace(/,/g, '.')
		.replace(/[-:]/g, '');

const isFullFormat = (duration: string): boolean =>
	!duration
		.replace(/(P|T)/ig, '')
		.match(/[A-Z]/i);

const parseUnitsISODuration = (duration: string) => {
	const output: Time = { ...DEFAULT_TIME };
	const [date, time] = normalizeDuration(duration).split(/T/i);

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

/**
 * Parse a duration string expressed in one of the following formats:
 *
 * - PYYYYMMDDThhmmss
 * - PYYYY-MM-DDThh:mm:ss
 */
const parseFullFormatISODuration = (duration: string): Time => {
	const normalizedDuration = normalizeDuration(duration);

	return {
		years: Number(normalizedDuration.substr(1, 4)),
		months: Number(normalizedDuration.substr(5, 2)),
		weeks: 0,
		days: Number(normalizedDuration.substr(7, 2)),
		hours: Number(normalizedDuration.substr(10, 2)),
		minutes: Number(normalizedDuration.substr(12, 2)),
		seconds: Number(normalizedDuration.substr(14)),
		milliseconds: 0,
	};
};

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
	if (isFullFormat(duration)) {
		return parseFullFormatISODuration(duration);
	}

	return parseUnitsISODuration(duration);
};
