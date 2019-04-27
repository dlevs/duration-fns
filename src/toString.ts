import { TimeInput } from './types';
import { abs } from './abs';
import { UNITS, UNIT_KEYS } from './lib/units';

export const toString = (time: TimeInput): string => {
	const parsedTime = abs(time);
	let output = 'P';

	UNIT_KEYS.forEach(unit => {
		const value = parsedTime[unit];

		if (value === 0) {
			return;
		}

		const { ISOPrecision, ISOCharacter } = UNITS[unit];
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
