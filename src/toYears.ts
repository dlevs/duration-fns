import createTimeConverter from './lib/createTimeConverter';
import { MILLISECONDS_IN_A_YEAR } from './lib/constants';

/**
 * Get the number of years represented by a `Time` object or number of
 * milliseconds.
 *
 * Note, this is a rough approximation as the length of a year is variable.
 *
 * @example toYears({ years: 10, days: 365 }) // 11
 */
const toYears = createTimeConverter(MILLISECONDS_IN_A_YEAR);

export default toYears;
