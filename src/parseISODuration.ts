import { AmbiguousTime } from './types';
import normalizeTime from './normalizeTime';

type Context = 'period' | 'time';

const unitToKey = (unit: string, context: Context): keyof AmbiguousTime => {
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
	obj: Partial<AmbiguousTime>,
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

const parseISODuration = (duration: string) => {
	const parsingRegex = /([^A-Z]+)([A-Z])/gi;
	const [period, time] = duration.replace(/,/g, '.').split(/T/i);
	const output: Partial<AmbiguousTime> = {};

	let execResult;

	while (execResult = parsingRegex.exec(period)) {
		addValue(output, execResult, 'period');
	}

	while (execResult = parsingRegex.exec(time)) {
		addValue(output, execResult, 'time');
	}

	return normalizeTime(output);
};

export default parseISODuration;
