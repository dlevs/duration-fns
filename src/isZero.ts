import { TimeInput } from './types';
import { toMilliseconds } from './toUnit';

export const isZero = (time: TimeInput) =>
	toMilliseconds(time) === 0;
