import { DurationInput } from './types';
import { toMilliseconds } from './toUnit';

export const isNegative = (duration: DurationInput) =>
	toMilliseconds(duration) < 0;
