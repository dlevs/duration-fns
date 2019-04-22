import createTimeConverter from './lib/createTimeConverter';
import { MILLISECONDS_IN_A_WEEK } from './lib/constants';

/**
 * Get the number of weeks represented by a `Time` object or number of
 * milliseconds.
 *
 * @example toWeeks({ days: 14 }) // 2
 */
const toWeeks = createTimeConverter(MILLISECONDS_IN_A_WEEK);

export default toWeeks;
