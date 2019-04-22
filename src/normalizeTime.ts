
import { Time, TimeInput } from './types';
import floorTowardsZero from './lib/floorTowardsZero';
import subtractTime from './subtractTime';
import toWeeks from './toWeeks';
import toDays from './toDays';
import toHours from './toHours';
import toMinutes from './toMinutes';
import toSeconds from './toSeconds';
import toYears from './toYears';
import toMonths from './toMonths';

/**
 * Convert a `Time` object or number of milliseconds into a complete
 * `Time` object that expresses the time in the most appropriate units.
 *
 * @example
 * normalizeTime({ milliseconds 4000 })
 * // { years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 4, milliseconds: 0 }
 */
const normalizeTime = (time: TimeInput): Time => {
	// TODO: Make this more DRY. It's prone too errors
	const years = floorTowardsZero(toYears(time));
	let milliseconds = subtractTime(time, { years });

	const months = floorTowardsZero(toMonths(milliseconds));
	milliseconds = subtractTime(milliseconds, { months });

	const weeks = floorTowardsZero(toWeeks(milliseconds));
	milliseconds = subtractTime(milliseconds, { weeks });

	const days = floorTowardsZero(toDays(milliseconds));
	milliseconds = subtractTime(milliseconds, { days });

	const hours = floorTowardsZero(toHours(milliseconds));
	milliseconds = subtractTime(milliseconds, { hours });

	const minutes = floorTowardsZero(toMinutes(milliseconds));
	milliseconds = subtractTime(milliseconds, { minutes });

	const seconds = floorTowardsZero(toSeconds(milliseconds));
	milliseconds = subtractTime(milliseconds, { seconds });

	return { years, months, weeks, days, hours, minutes, seconds, milliseconds };
};

export default normalizeTime;
