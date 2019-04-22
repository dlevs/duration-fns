import createTimeConverter from './lib/createTimeConverter';
import { MILLISECONDS_IN_A_MONTH } from './lib/constants';

/**
 * Get the number of months represented by a `Time` object or number of
 * milliseconds.
 *
 * Note, this is a rough approximation as the length of a month is variable.
 *
 * @example toMonths({ months: 10, days: 365 }) // 11
 */
const toMonths = createTimeConverter(MILLISECONDS_IN_A_MONTH);

export default toMonths;
