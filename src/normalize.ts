import { DEFAULT_TIME } from './lib/constants';
import { Time, TimeInput } from './types';
import floorTowardsZero from './lib/floorTowardsZero';
import { subtractTime } from './calculations';
import { parseISODuration } from './parseISODuration';
import {
	toYears,
	toMonths,
	toWeeks,
	toDays,
	toHours,
	toMinutes,
	toSeconds,
	toMilliseconds,
} from './unitConversion';

const units = [
	{
		key: 'years',
		convertTo: toYears,
	},
	{
		key: 'months',
		convertTo: toMonths,
	},
	{
		key: 'weeks',
		convertTo: toWeeks,
	},
	{
		key: 'days',
		convertTo: toDays,
	},
	{
		key: 'hours',
		convertTo: toHours,
	},
	{
		key: 'minutes',
		convertTo: toMinutes,
	},
	{
		key: 'seconds',
		convertTo: toSeconds,
	},
	{
		key: 'milliseconds',
		convertTo: toMilliseconds,
	},
] as const;

/**
 * Convert a `Time` object or number of milliseconds into a complete
 * `Time` object that expresses the time in the most appropriate units.
 *
 * @example
 * normalizeTimeUnits({ milliseconds 4000 })
 * // { years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 4, milliseconds: 0 }
 */
export const normalizeTimeUnits = (time: TimeInput): Time => {
	let tally = time;
	const output: Time = { ...DEFAULT_TIME };

	for (const { key, convertTo } of units) {
		output[key] = floorTowardsZero(convertTo(tally));
		tally = subtractTime(tally, { [key]: output[key] });
	}

	return output;
};

/**
 * Format various time formats to a simple `Time` object.
 */
export const normalizeTimeInput = (time: TimeInput): Time => {
	if (typeof time === 'string') {
		return parseISODuration(time);
	}

	if (typeof time === 'number') {
		return { ...DEFAULT_TIME, milliseconds: time };
	}

	return { ...DEFAULT_TIME, ...time };
};
