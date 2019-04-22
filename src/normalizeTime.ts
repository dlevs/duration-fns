
import { DEFAULT_TIME } from './lib/constants';
import { Time, TimeInput } from './types';
import floorTowardsZero from './lib/floorTowardsZero';
import subtractTime from './subtractTime';
import toYears from './toYears';
import toMonths from './toMonths';
import toWeeks from './toWeeks';
import toDays from './toDays';
import toHours from './toHours';
import toMinutes from './toMinutes';
import toSeconds from './toSeconds';
import toMilliseconds from './toMilliseconds';

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
 * normalizeTime({ milliseconds 4000 })
 * // { years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 4, milliseconds: 0 }
 */
const normalizeTime = (time: TimeInput) => {
	let tally = time;
	const output: Time = { ...DEFAULT_TIME };

	for (const { key, convertTo } of units) {
		output[key] = floorTowardsZero(convertTo(tally));
		tally = subtractTime(tally, { [key]: output[key] });
	}

	return output;
};

export default normalizeTime;
