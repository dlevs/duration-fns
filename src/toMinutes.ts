import createTimeConverter from './lib/createTimeConverter';
import { MILLISECONDS_IN_A_MINUTE } from './lib/constants';

/**
 * Get the number of minutes represented by a `Time` object or number of
 * milliseconds.
 *
 * @example toMinutes({ hours: 1, minutes: 10 }) // 70
 */
const toMinutes = createTimeConverter(MILLISECONDS_IN_A_MINUTE);

export default toMinutes;
