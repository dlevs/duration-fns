import { DurationInput } from './types';
import { isZero } from './isZero';
import { getUnitCount } from './lib/getUnitCount';
import { UNITS_META, UNITS_META_MAP } from './lib/units';
import { checkAllUnitsNegative } from './lib/checkAllUnitsNegative';

interface ToStringOptions {
	decimalDelimiter: string;
}

const joinComponents = (component: string[], delimiter: ToStringOptions['decimalDelimiter']) =>
	component
		.join('')
		.replace(/\./g, delimiter);

/**
 * Stringify a duration into an ISO duration string.
 *
 * @example
 * toString({ years: 1, hours: 6 }) // 'P1YT6H'
 * toString(6000) // 'PT6S'
 */
export const toString = (
	duration: DurationInput,
	options: Partial<ToStringOptions> = {},
): string => {
	const finalOptions: ToStringOptions = {
		// Commas are mentioned in the spec as the preferred decimal delimiter
		decimalDelimiter: ',',
		...options,
	};

	// Zero values are a special case, since "P" is not a valid value.
	// At least one unit must be specified.
	if (isZero(duration)) {
		return 'P0D';
	}

	const {
		maybeAbsDuration: parsed,
		isAllNegative,
	} = checkAllUnitsNegative(duration);

	// Weeks should not be included in the output, unless it is the only unit.
	if (getUnitCount(parsed) === 1 && parsed.weeks !== 0) {
		return `P${parsed.weeks}W`;
	}

	const components = {
		period: [] as string[],
		time: [] as string[],
	};

	// Some units should be converted before stringifying.
	// For example, weeks should not be mixed with other units, and milliseconds
	// don't exist on ISO duration strings.
	UNITS_META.forEach(({ unit: fromUnit, stringifyConvertTo: toUnit }) => {
		if (toUnit == null) {
			return;
		}

		const millisecondValue = parsed[fromUnit] * UNITS_META_MAP[fromUnit].milliseconds;

		parsed[toUnit] += millisecondValue / UNITS_META_MAP[toUnit].milliseconds;
		parsed[fromUnit] = 0;
	});

	// Push each non-zero unit to its relevant array
	UNITS_META.forEach(({ unit, ISOPrecision, ISOCharacter }) => {
		const value = parsed[unit];

		if (ISOPrecision != null && value !== 0) {
			components[ISOPrecision].push(`${value}${ISOCharacter}`);
		}
	});

	// Build output string
	let output = `P${joinComponents(components.period, finalOptions.decimalDelimiter)}`;

	if (components.time.length) {
		output += `T${joinComponents(components.time, finalOptions.decimalDelimiter)}`;
	}

	// Avoid "P-1DT-1H". Instead, output "-P1DT1H".
	// https://github.com/dlevs/duration-fns/issues/22
	if (isAllNegative) {
		output = `-${output}`;
	}

	return output;
};
