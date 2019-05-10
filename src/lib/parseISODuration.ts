import { Time } from '../types';
import { ZERO, UNITS } from './units';
import { negate } from '../negate';
import { floorTowardsZero } from './floorTowardsZero';

// const ms = '(?:[,.](\\d{1,3})\\d*)?';
// const digit =

const fullFormatRegex = /^(-)?P(\d{4})-?(\d{2})-?(\d{2})T(\d{2}):?(\d{2}):?(\d{2})(?:[,.](\d{1,3})\d*)?$/;
// TODO: Can we generate this regex? This feels error prone. It's not readable.
// const fullFormatRegex = new RegExp(`^(-)?P$`);


const unitsFormatRegex = /^-?P(-?\d+Y)?(-?\d+M)?(-?\d+W)?(-?\d+D)?(T(-?\d+H)?(-?\d+M)?(-?\d+([,.]\d+)?S)?)?$/;
const hasAtLeastOneUnitRegex = /\d[A-Z]/;

const parseNumber = (value: string | undefined) => Number(value || '0');

const parseFullFormatISODuration = (duration: string): Time | null => {
	const match = duration.match(fullFormatRegex);

	if (!match) {
		return null;
	}

	const output = { ...ZERO };
	const isNegative = match[1] === '-';
	[
		output.years,
		output.months,
		output.days,
		output.hours,
		output.minutes,
		output.seconds,
		output.milliseconds,
	] = match.slice(2).map(parseNumber);

	return isNegative ? negate(output) : output;
};

const parseUnitsISODuration = (duration: string) => {
	const match = duration.match(unitsFormatRegex);

	if (!match || !hasAtLeastOneUnitRegex.test(duration)) {
		return null;
	}

	const output = { ...ZERO };
	const isNegative = match[1] === '-';
	[
		output.years,
		output.months,
		output.months,
		output.days,
		output.hours,
		output.minutes,
		output.seconds,
		output.milliseconds,
	] = match.slice(2).map(parseNumber);

	return isNegative ? negate(output) : output;
};

const getDurationStringFormat = (duration: string): Time | null =>
	parseUnitsISODuration(duration) ||
	parseFullFormatISODuration(duration);

/**
 * Parse a duration string expressed in one of the following formats:
 *
 * - PYYYYMMDDThhmmss
 * - PYYYY-MM-DDThh:mm:ss
 */
// const parseFullFormatISODuration = (duration: string): Time => {
// 	const normalizedDuration = duration.replace(/[-:]/g, '');

// 	return {
// 		years: Number(normalizedDuration.substr(1, 4)),
// 		months: Number(normalizedDuration.substr(5, 2)),
// 		weeks: 0,
// 		days: Number(normalizedDuration.substr(7, 2)),
// 		hours: Number(normalizedDuration.substr(10, 2)),
// 		minutes: Number(normalizedDuration.substr(12, 2)),
// 		seconds: Number(normalizedDuration.substr(14)),
// 		milliseconds: 0,
// 	};
// };

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
	const format = getDurationStringFormat(duration);

	if (format === 'invalid') {
		throw new SyntaxError(`Failed to parse duration. "${duration}" is not a valid ISO duration string.`);
	}

	const normalizedDuration = duration.replace(/,/g, '.');
	const absDuration = normalizedDuration.replace(/^-/, '');
	const isNegative = normalizedDuration !== absDuration;

	const output = format === 'full'
		? parseFullFormatISODuration(absDuration)
		: parseUnitsISODuration(absDuration);

	// Convert decimal seconds value into seconds and milliseconds
	const flooredSeconds = floorTowardsZero(output.seconds);
	// Round the values since we end up with results like `100.00000000000009`
	// when we'd expect `100`.
	output.milliseconds = Math.round((output.seconds - flooredSeconds) * 1000);
	output.seconds = flooredSeconds;

	return isNegative
		? negate(output)
		: output;
};
