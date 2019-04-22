import { TimeInput } from './types';
import parseISODuration from './parseISODuration';
import {
	MILLISECONDS_IN_A_SECOND,
	MILLISECONDS_IN_A_MINUTE,
	MILLISECONDS_IN_AN_HOUR,
	MILLISECONDS_IN_A_DAY,
	MILLISECONDS_IN_A_WEEK,
	MILLISECONDS_IN_A_MONTH,
	MILLISECONDS_IN_A_YEAR,
} from './lib/constants';

/**
 * Get the number of milliseconds represented by a `Time` object.
 * If a number is passed this is returned verbatim as the number
 * of milliseconds.
 *
 * @example toMilliseconds({ days: 1 }) // 86400000
 */
const toMilliseconds = (time: TimeInput): number => {
	if (typeof time === 'number') {
		return time;
	}

	const timeObject = typeof time === 'string'
		? parseISODuration(time)
		: time;

	const	{
		years = 0,
		months = 0,
		weeks = 0,
		days = 0,
		hours = 0,
		minutes = 0,
		seconds = 0,
		milliseconds = 0,
	} = timeObject;

	return (
		years * MILLISECONDS_IN_A_YEAR +
		months * MILLISECONDS_IN_A_MONTH +
		weeks * MILLISECONDS_IN_A_WEEK +
		days * MILLISECONDS_IN_A_DAY +
		hours * MILLISECONDS_IN_AN_HOUR +
		minutes * MILLISECONDS_IN_A_MINUTE +
		seconds * MILLISECONDS_IN_A_SECOND +
		milliseconds
	);
};

export default toMilliseconds;
