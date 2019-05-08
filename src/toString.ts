import { TimeInput } from './types';
import { parse } from './parse';
import { isZero } from './isZero';
import { getUnitCount } from './lib/getUnitCount';
import { UNITS, UNITS_MAP } from './lib/units';

const joinComponents = (component: string[]) =>
	component
		.join('')
		// Commas are mentioned in the spec as the preferred decimal delimiter
		.replace(/\./g, ',');

export const toString = (time: TimeInput): string => {
	// Zero values are a special case, since "P" is not a valid value.
	// At least one unit must be specified.
	if (isZero(time)) {
		return 'P0D';
	}

	const parsedTime = { ...parse(time) };

	// Weeks should not be included in the output, unless it is the only unit.
	if (getUnitCount(parsedTime) === 1 && parsedTime.weeks !== 0) {
		return `P${parsedTime.weeks}W`;
	}

	const components = {
		period: [] as string[],
		time: [] as string[],
	};

	// Some units should be converted before stringifying.
	// For example, weeks should not be mixed with other units, and milliseconds
	// don't exist on ISO duration strings.
	UNITS.forEach(({ unit: fromUnit, stringifyConvertTo: toUnit }) => {
		if (toUnit === undefined) {
			return;
		}

		const millisecondValue = parsedTime[fromUnit] * UNITS_MAP[fromUnit].milliseconds;

		parsedTime[toUnit] += millisecondValue / UNITS_MAP[toUnit].milliseconds;
		parsedTime[fromUnit] = 0;
	});

	// Push each non-zero unit to its relevant array
	UNITS.forEach(({ unit, ISOPrecision, ISOCharacter }) => {
		const value = parsedTime[unit];

		if (ISOPrecision !== undefined && value !== 0) {
			components[ISOPrecision].push(`${value}${ISOCharacter}`);
		}
	});

	// Build output string
	let output = `P${joinComponents(components.period)}`;

	if (components.time.length) {
		output += `T${joinComponents(components.time)}`;
	}

	return output;
};
