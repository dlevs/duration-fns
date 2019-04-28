import { TimeInput } from './types';
import { parse } from './parse';
import { isZero } from './isZero';
import { UNITS, UNITS_MAP } from './lib/units';

const joinComponents = (component: string[]) =>
	component
		.join('')
		.replace(/\./g, ',');

export const toString = (time: TimeInput): string => {
	if (isZero(time)) {
		return 'PT0S';
	}

	const parsedTime = { ...parse(time) };
	const components = {
		date: [] as string[],
		time: [] as string[],
	};

	// Apply milliseconds to the seconds total, since output format
	// doesn't have milliseconds unit
	parsedTime.seconds += parsedTime.milliseconds / UNITS_MAP.seconds.milliseconds;
	parsedTime.milliseconds = 0;

	// Push each non-zero unit to its relevant array
	UNITS.forEach(({ unit, ISOPrecision, ISOCharacter }) => {
		const value = parsedTime[unit];

		if (ISOPrecision != null && value !== 0) {
			components[ISOPrecision].push(`${value}${ISOCharacter}`);
		}
	});

	// Build output string
	let output = `P${joinComponents(components.date)}`;

	if (components.time.length) {
		output += `T${joinComponents(components.time)}`;
	}

	return output;
};
