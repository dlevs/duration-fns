// Durations defined by ISO 31-1
const MILLISECONDS_IN_A_SECOND = 1000;
const MILLISECONDS_IN_A_MINUTE = MILLISECONDS_IN_A_SECOND * 60;
const MILLISECONDS_IN_AN_HOUR = MILLISECONDS_IN_A_MINUTE * 60;
const MILLISECONDS_IN_A_DAY = MILLISECONDS_IN_AN_HOUR * 24;

// Durations defined by common sense
const MILLISECONDS_IN_A_WEEK = MILLISECONDS_IN_A_DAY * 7;
const MILLISECONDS_IN_A_YEAR = MILLISECONDS_IN_A_DAY * 365;
const MILLISECONDS_IN_A_MONTH = MILLISECONDS_IN_A_YEAR / 12;

export const ZERO = Object.freeze({
	years: 0,
	months: 0,
	weeks: 0,
	days: 0,
	hours: 0,
	minutes: 0,
	seconds: 0,
	milliseconds: 0,
});

export type UnitKey = keyof typeof ZERO;
interface Unit {
	milliseconds: number;
	dateGetter(date: Date): number;
	ISOCharacter?: string;
	ISOPrecision?: 'period' | 'time';
	stringifyConvertTo?: UnitKey;
}

// TODO: ISOCharacter and ISOPrecision no longer needed to parse duration string. Can they be removed? Needed still to stringify?
export const UNITS_MAP: { [key in UnitKey]: Unit } = {
	years: {
		milliseconds: MILLISECONDS_IN_A_YEAR,
		// TODO: Test adding a year on leap year
		dateGetter: date => date.getFullYear(),
		ISOCharacter: 'Y',
		ISOPrecision: 'period',
	},
	months: {
		milliseconds: MILLISECONDS_IN_A_MONTH,
		dateGetter: date => date.getMonth(),
		ISOCharacter: 'M',
		ISOPrecision: 'period',
	},
	weeks: {
		milliseconds: MILLISECONDS_IN_A_WEEK,
		dateGetter: () => 0,
		ISOCharacter: 'W',
		ISOPrecision: 'period',
		stringifyConvertTo: 'days',
	},
	days: {
		milliseconds: MILLISECONDS_IN_A_DAY,
		dateGetter: date => date.getDate(),
		ISOCharacter: 'D',
		ISOPrecision: 'period',
	},
	hours: {
		milliseconds: MILLISECONDS_IN_AN_HOUR,
		dateGetter: date => date.getHours(),
		ISOCharacter: 'H',
		ISOPrecision: 'time',
	},
	minutes: {
		milliseconds: MILLISECONDS_IN_A_MINUTE,
		dateGetter: date => date.getMinutes(),
		ISOCharacter: 'M',
		ISOPrecision: 'time',
	},
	seconds: {
		milliseconds: MILLISECONDS_IN_A_SECOND,
		dateGetter: date => date.getSeconds(),
		ISOCharacter: 'S',
		ISOPrecision: 'time',
	},
	milliseconds: {
		milliseconds: 1,
		dateGetter: date => date.getMilliseconds(),
		stringifyConvertTo: 'seconds',
	},
};

export const UNIT_KEYS = [
	'years',
	'months',
	'weeks',
	'days',
	'hours',
	'minutes',
	'seconds',
	'milliseconds',
] as const;

export const UNITS = UNIT_KEYS.map(unit => ({
	...UNITS_MAP[unit],
	unit,
}));
