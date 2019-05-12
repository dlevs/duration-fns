import { DurationInput } from './types';
import { toMilliseconds } from './toUnit';

export const isZero = (duration: DurationInput) =>
	toMilliseconds(duration) === 0;
