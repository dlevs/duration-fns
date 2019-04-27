import { TimeInput } from './types';
import { abs } from './abs';
import { UNITS, UNITS_MAP } from './lib/units';

export const toString = (time: TimeInput): string => {
	const parsedTime = { ...abs(time) };
	let output = 'P';

	// Apply milliseconds to the seconds total, since output cannot have
	parsedTime.seconds += parsedTime.milliseconds / UNITS_MAP.seconds.milliseconds;
	parsedTime.milliseconds = 0;

	// Build output string
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
