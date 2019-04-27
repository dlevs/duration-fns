import { TimeInput } from './types';
import { abs } from './abs';
import { UNITS } from './lib/units';

export const toString = (time: TimeInput): string => {
	const parsedTime = abs(time);
	let output = 'P';

	UNITS.forEach(({ unit, ISOPrecision, ISOCharacter }) => {
		const value = parsedTime[unit];

		if (value === 0) {
			return;
		}

		const prefix = ISOPrecision === 'time' && output.indexOf('T') === -1
			? 'T'
			: '';

		output += `${prefix}${ISOCharacter}${value}`;
	});

	if (output === 'P') {
		return 'PT0S';
	}

	return output;
};
