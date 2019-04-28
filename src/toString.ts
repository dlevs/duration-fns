import { TimeInput } from './types';
import { abs } from './abs';
import { isZero } from './isZero';
import { UNITS, UNITS_MAP } from './lib/units';

export const toString = (time: TimeInput): string => {
	if (isZero(time)) {
		return 'PT0S';
	}

	const parsedTime = { ...abs(time) };
	const components = {
		date: [] as string[],
		time: [] as string[],
	};

	// Apply milliseconds to the seconds total, since output cannot have
	parsedTime.seconds += parsedTime.milliseconds / UNITS_MAP.seconds.milliseconds;
	parsedTime.milliseconds = 0;

	// Push each non-zero unit to its relevant array
	UNITS.forEach(({ unit, ISOPrecision, ISOCharacter }) => {
		const value = parsedTime[unit];

		if (ISOPrecision != null && value !== 0) {
			components[ISOPrecision].push(`${ISOCharacter}${value}`);
		}
	});

	// Build output string
	let output = `P${components.date.join('')}`;

	if (components.time.length) {
		output += `T${components.time.join('')}`;
	}

	return output;
};
