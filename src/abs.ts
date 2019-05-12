import { Duration, DurationInput } from './types';
import { isNegative } from './isNegative';
import { negate } from './negate';
import { parse } from './parse';

export const abs = (duration: DurationInput): Duration => {
	if (isNegative(duration)) {
		return negate(duration);
	}

	return parse(duration);
};
