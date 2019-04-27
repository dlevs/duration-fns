import { Time, TimeInput } from './types';
import { isNegative } from './isNegative';
import { negate } from './negate';
import { parse } from './parse';

export const abs = (time: TimeInput): Time => {
	if (isNegative(time)) {
		return negate(time);
	}

	return parse(time);
};
