import createTimeConverter from './lib/createTimeConverter';
import { MILLISECONDS_IN_AN_HOUR } from './lib/constants';

/**
 * Get the number of hours represented by a `Time` object or number of
 * milliseconds.
 *
 * @example toHours({ days: 1 }) // 24
 */
const toHours = createTimeConverter(MILLISECONDS_IN_AN_HOUR);

export default toHours;
