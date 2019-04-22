import toMilliseconds from '../toMilliseconds';
import { TimeInput } from '../types';

const createTimeConverter = (divisor: number) =>
	(time: TimeInput) => toMilliseconds(time) / divisor;

export default createTimeConverter;
