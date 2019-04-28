import { TimeInput } from './types';
import { parse } from './parse';
import { isZero } from './isZero';
import { UNITS, UNITS_MAP } from './lib/units';

const joinComponents = (component: string[]) =>
	component
		.join('')
		// Commas are mentioned in the spec as the preferred decimal delimiter
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

	// Some units should be converted before stringifying.
	// For example, weeks should not be mixed with other units, and milliseconds
	// don't exist on ISO duration strings.
	UNITS.forEach(({ unit: fromUnit, stringifyConvertTo: toUnit }) => {
		if (toUnit == null) {
			return;
		}

		const millisecondValue = parsedTime[fromUnit] * UNITS_MAP[fromUnit].milliseconds;

		parsedTime[toUnit] += millisecondValue / UNITS_MAP[toUnit].milliseconds;
		parsedTime[fromUnit] = 0;
	});

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
