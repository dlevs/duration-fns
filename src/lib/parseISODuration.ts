import { Duration } from '../types';
import { ZERO, UnitKey } from './units';
import { negate } from '../negate';
import { isNegativelySigned } from './numberUtils';

const millisecondsPattern = '(?:[,.](\\d{1,3})\\d*)?';

const unitPattern = (unit: string) => `(?:(-?\\d+)${unit})?`;

const createDurationParser = (
	regex: RegExp,
	unitsOrder: UnitKey[],
) => {
	return (duration: string): Duration | null => {
		const match = duration.match(regex);

		if (!match) {
			return null;
		}

		const isDurationNegative = match[1] === '-';
		const unitStrings: (string | undefined)[] = match.slice(2);

		// Must have at least one unit match
		if (unitStrings.every(value => value === undefined)) {
			return null;
		}

		const unitNumbers = unitStrings.map((value, i) => {
			value = value ?? '0';

			const isMilliseconds = i === unitStrings.length - 1;

			return isMilliseconds
				// Pad the end of the millisecond values. For example, when taking the "6"
				// portion from the string "PT3.6S", we need to interpret that as "600
				// milliseconds".
				? Number(value.padEnd(3, '0'))
				: Number(value);
		});

		const output = { ...ZERO };

		unitsOrder.forEach((unit, i) => {
			output[unit] = unitNumbers[i];
		});

		// Milliseconds don't have their own minus symbol. It depends on the symbol
		// before the seconds value.
		if (isNegativelySigned(output.seconds)) {
			output.milliseconds *= -1;
		}

		return isDurationNegative
			? negate(output)
			: output;
	};
};

/**
 * Parse a duration string expressed in one of the following formats:
 *
 * - PYYYYMMDDThhmmss
 * - PYYYY-MM-DDThh:mm:ss
 */
const parseFullFormatISODuration = createDurationParser(
	new RegExp([
		'^(-)?P',
		'(\\d{4})', '-?',
		'(\\d{2})', '-?',
		'(\\d{2})', 'T',
		'(\\d{2})', ':?',
		'(\\d{2})', ':?',
		'(\\d{2})', millisecondsPattern,
		'$',
	].join('')),
	[
		'years',
		'months',
		'days',
		'hours',
		'minutes',
		'seconds',
		'milliseconds',
	],
);

/**
 * Parse a duration string expressed via number and unit character pairs. For
 * example:
 *
 * - P6D
 * - P1Y2D
 * - P2DT6H2,5S
 */
const parseUnitsISODuration = createDurationParser(
	new RegExp([
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
	].join('')),
	[
		'years',
		'months',
		'weeks',
		'days',
		'hours',
		'minutes',
		'seconds',
		'milliseconds',
	],
);

/**
 * Parse an ISO 8601 duration string into an object.
 *
 * The units of duration are not normalized. For example, the string `"P365D"`
 * doesn't get converted to `{ years: 1 }` since not all years are the same
 * length.
 *
 * @example parseISODuration('P365D') // { days: 365 }
 */
export const parseISODuration = (duration: string): Duration => {
	const output = (
		parseUnitsISODuration(duration) ||
		parseFullFormatISODuration(duration)
	);

	if (output === null) {
		throw new SyntaxError(`Failed to parse duration. "${duration}" is not a valid ISO duration string.`);
	}

	return output;
};
