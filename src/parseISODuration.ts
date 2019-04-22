import { Time } from './types';
import { DEFAULT_TIME } from './lib/constants';

type Context = 'period' | 'time';

const unitToKey = (unit: string, context: Context): keyof Time => {
	switch (unit.toUpperCase()) {
		case 'Y':
			return 'years';
		case 'M':
			if (context === 'period') {
				return 'months';
			}
			return 'minutes';
		case 'W':
			return 'weeks';
		case 'D':
			return 'days';
		case 'H':
			return 'hours';
		case 'S':
			return 'seconds';
		default:
			throw new SyntaxError(`Unrecognised unit "${unit}" in ISO duration string`);
	}
};

const addValue = (
	obj: Partial<Time>,
	execResult: string[],
	context: Context,
) => {
	const [, valueString, unit] = execResult;
	const key = unitToKey(unit, context);
	const value = Number(valueString);

	if (isNaN(value)) {
		throw new SyntaxError(`Non-numeric duration value "${valueString}" in ISO duration string`);
	}

	obj[key] = value;
};

/**
 * Parse an ISO 8601 duration string into an object.
 *
 * The units of time are not normalized. For example, the string `"P365D"`
 * doesn't get converted to `{ years: 1 }` since not all years are the same
 * length.
 *
 * @example parseISODuration('P365D') // { days: 365 }
 */
export const parseISODuration = (duration: string) => {
	const parsingRegex = /([^A-Z]+)([A-Z])/gi;
	const [period, time] = duration.replace(/,/g, '.').split(/T/i);
	const output: Time = { ...DEFAULT_TIME };

	let execResult;

	while (execResult = parsingRegex.exec(period)) {
		addValue(output, execResult, 'period');
	}

	while (execResult = parsingRegex.exec(time)) {
		addValue(output, execResult, 'time');
	}

	return output;
};

export default parseISODuration;
