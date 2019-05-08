import { Time } from '../types';
import { ZERO, UNITS } from './units';
import { negate } from '../negate';
import { floorTowardsZero } from './floorTowardsZero';

const isFullFormat = (duration: string): boolean =>
	!duration
		.replace(/(P|T)/ig, '')
		.match(/[A-Z]/i);

const parseUnitsISODuration = (duration: string) => {
	const output: Time = { ...ZERO };
	const [period, time] = duration.split(/T/i);

	UNITS.forEach(({ unit, ISOPrecision, ISOCharacter }) => {
		if (ISOCharacter === undefined) {
			return;
		}

		const regex = new RegExp(`([-\\d.]+)${ISOCharacter}`, 'i');
		const portionToTest = ISOPrecision === 'time' ? time : period;

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
	const normalizedDuration = duration.replace(/[-:]/g, '');

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
	const normalizedDuration = duration.replace(/,/g, '.');
	const absDuration = normalizedDuration.replace(/^-/, '');
	const isNegative = normalizedDuration !== absDuration;
	const output = isFullFormat(absDuration)
		? parseFullFormatISODuration(absDuration)
		: parseUnitsISODuration(absDuration);

	const flooredSeconds = floorTowardsZero(output.seconds);
	// This should be the only place in the library where we deal with non-integers.
	// Round the values since we end up with results like `100.00000000000009` when we'd
	// expect `100`.
	output.milliseconds = Math.round((output.seconds - flooredSeconds) * 1000);
	output.seconds = flooredSeconds;

	return isNegative
		? negate(output)
		: output;
};
