import { Time } from '../types';
import { ZERO } from './units';
import { negate } from '../negate';

// Util functions
// ------------------------------------

/**
 * Parse numbers from strings, and convert `undefined` to `0` instead of `NaN`.
 */
const parseNumber = (value: string | undefined) =>
	Number(value || '0');

/**
 * Pad the end of the millisecond values parsed from a regex.
 *
 * For example, when taking the "6" portion from the string "PT3.6S", we need to
 * interpret that as "600 milliseconds".
 */
const parseMilliseconds = (value: string | undefined) =>
	Number((value || '0').padEnd(3, '0'));

// Util regex patterns
// ------------------------------------
const millisecondsPattern = '(?:[,.](\\d{1,3})\\d*)?';
const unitPattern = (unit: string) => `(?:(-?\\d+)${unit})?`;
const hasAtLeastOneUnitRegex = /\d[A-Z]/;

// Main parsing regex patterns
// ------------------------------------
const unitsFormatRegex = new RegExp([
	'^(-)?P',
	unitPattern('Y'),
	unitPattern('M'),
	unitPattern('W'),
	unitPattern('D'),
	'(?:T',
	unitPattern('H'),
	unitPattern('M'),
	unitPattern(`${millisecondsPattern}S`),
	')?$',
].join(''));

const fullFormatRegex = new RegExp([
	'^(-)?P',
	'(\\d{4})', '-?',
	'(\\d{2})', '-?',
	'(\\d{2})', 'T',
	'(\\d{2})', ':?',
	'(\\d{2})', ':?',
	'(\\d{2})', millisecondsPattern,
	'$',
].join(''));

// Parsing functions
// ------------------------------------

/**
 * Parse a duration string expressed in one of the following formats:
 *
 * - PYYYYMMDDThhmmss
 * - PYYYY-MM-DDThh:mm:ss
 */
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
	] = match.slice(2).map(parseNumber);
	output.milliseconds = parseMilliseconds(match[8]);

	return isNegative ? negate(output) : output;
};

// TODO: This fn is very similar to the one above. Can it be more DRY? Add JSDoc comment.
const parseUnitsISODuration = (duration: string): Time | null => {
	const match = duration.match(unitsFormatRegex);

	if (!match || !hasAtLeastOneUnitRegex.test(duration)) {
		return null;
	}

	const output = { ...ZERO };
	const isNegative = match[1] === '-';
	[
		output.years,
		output.months,
		output.weeks,
		output.days,
		output.hours,
		output.minutes,
		output.seconds,
	] = match.slice(2).map(parseNumber);
	output.milliseconds = parseMilliseconds(match[9]);

	// TODO: Test this, and add comment:
	if (output.seconds < 0) {
		output.milliseconds *= -1;
	}

	return isNegative ? negate(output) : output;
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
	const output = (
		parseUnitsISODuration(duration) ||
		parseFullFormatISODuration(duration)
	);

	if (output === null) {
		throw new SyntaxError(`Failed to parse duration. "${duration}" is not a valid ISO duration string.`);
	}

	return output;
};
