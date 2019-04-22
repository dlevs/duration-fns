import createTimeConverter from './lib/createTimeConverter';
import { MILLISECONDS_IN_A_DAY } from './lib/constants';

/**
 * Get the number of days represented by a `Time` object or number of
 * milliseconds.
 *
 * @example toDays({ hours: 12 }) // 0.5
 */
const toDays = createTimeConverter(MILLISECONDS_IN_A_DAY);

export default toDays;
