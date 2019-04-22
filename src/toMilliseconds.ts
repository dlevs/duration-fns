import { TimeInput } from './types';
import {
	MILLISECONDS_IN_A_SECOND,
	MILLISECONDS_IN_A_MINUTE,
	MILLISECONDS_IN_AN_HOUR,
	MILLISECONDS_IN_A_DAY,
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

	const	{
		days = 0,
		hours = 0,
		minutes = 0,
		seconds = 0,
		milliseconds = 0,
	} = time;

	return (
		days * MILLISECONDS_IN_A_DAY +
		hours * MILLISECONDS_IN_AN_HOUR +
		minutes * MILLISECONDS_IN_A_MINUTE +
		seconds * MILLISECONDS_IN_A_SECOND +
		milliseconds
	);
};

export default toMilliseconds;
