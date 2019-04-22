import createTimeConverter from './lib/createTimeConverter';
import { MILLISECONDS_IN_A_SECOND } from './lib/constants';

/**
 * Get the number of seconds represented by a `Time` object or number of
 * milliseconds.
 *
 * @example toSeconds({ minutes: 2 }) // 120
 */
const toSeconds = createTimeConverter(MILLISECONDS_IN_A_SECOND);

export default toSeconds;
