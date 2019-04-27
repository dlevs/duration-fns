import { TimeInput } from './types';
import { toMilliseconds } from './toUnit';

export const isNegative = (time: TimeInput) =>
	toMilliseconds(time) < 0;
