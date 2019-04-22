
import floorTowardsZero from './lib/floorTowardsZero';
import subtractTime from './subtractTime';
import toWeeks from './toWeeks';
import toDays from './toDays';
import toHours from './toHours';
import toMinutes from './toMinutes';
import toSeconds from './toSeconds';
import { Time, TimeInput } from './types';

/**
 * Convert a `Time` object or number of milliseconds into a complete
 * `Time` object that expresses the time in the most appropriate units.
 *
 * @example
 * normalizeTime({ milliseconds 4000 })
 * // { weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 4, milliseconds: 0 }
 */
const normalizeTime = (time: TimeInput): Time => {
	const weeks = floorTowardsZero(toWeeks(time));
	let tally = subtractTime(time, { weeks });

	const days = floorTowardsZero(toDays(time));
	tally = subtractTime(time, { days });

	const hours = floorTowardsZero(toHours(tally));
	tally = subtractTime(tally, { hours });

	const minutes = floorTowardsZero(toMinutes(tally));
	tally = subtractTime(tally, { minutes });

	const seconds = floorTowardsZero(toSeconds(tally));
	tally = subtractTime(tally, { seconds });

	const { milliseconds } = tally;

	return { weeks, days, hours, minutes, seconds, milliseconds };
};

export default normalizeTime;
