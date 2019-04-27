const MILLISECONDS_IN_A_SECOND = 1000;
const MILLISECONDS_IN_A_MINUTE = MILLISECONDS_IN_A_SECOND * 60;
const MILLISECONDS_IN_AN_HOUR = MILLISECONDS_IN_A_MINUTE * 60;
const MILLISECONDS_IN_A_DAY = MILLISECONDS_IN_AN_HOUR * 24;
const MILLISECONDS_IN_A_WEEK = MILLISECONDS_IN_A_DAY * 7;
const MILLISECONDS_IN_A_YEAR = MILLISECONDS_IN_A_DAY * 365;
const MILLISECONDS_IN_A_MONTH = MILLISECONDS_IN_A_YEAR / 12;

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

export const DEFAULT_TIME = {
	years: 0,
	months: 0,
	weeks: 0,
	days: 0,
	hours: 0,
	minutes: 0,
	seconds: 0,
	milliseconds: 0,
} as const;

export const UNITS = {
	years: {
		milliseconds: MILLISECONDS_IN_A_YEAR,
		dateSetter: 'setFullYear',
		dateGetter: 'getFullYear',
		ISOCharacter: 'Y',
		ISOPrecision: 'date',
	},
	months: {
		milliseconds: MILLISECONDS_IN_A_MONTH,
		dateSetter: 'setMonth',
		dateGetter: 'getMonth',
		ISOCharacter: 'M',
		ISOPrecision: 'date',
	},
	weeks: {
		milliseconds: MILLISECONDS_IN_A_WEEK,
		dateSetter: 'setDate',
		dateGetter: 'getDate',
		ISOCharacter: 'W',
		ISOPrecision: 'date',
		// TODO: Test
		skipInNormalization: true,
	},
	days: {
		milliseconds: MILLISECONDS_IN_A_DAY,
		dateSetter: 'setDate',
		dateGetter: 'getDate',
		ISOCharacter: 'D',
		ISOPrecision: 'date',
	},
	hours: {
		milliseconds: MILLISECONDS_IN_AN_HOUR,
		dateSetter: 'setHours',
		dateGetter: 'getHours',
		ISOCharacter: 'H',
		ISOPrecision: 'time',
	},
	minutes: {
		milliseconds: MILLISECONDS_IN_A_MINUTE,
		dateSetter: 'setMinutes',
		dateGetter: 'getMinutes',
		ISOCharacter: 'M',
		ISOPrecision: 'time',
	},
	seconds: {
		milliseconds: MILLISECONDS_IN_A_SECOND,
		dateSetter: 'setSeconds',
		dateGetter: 'getSeconds',
		ISOCharacter: 'S',
		ISOPrecision: 'time',
	},
	milliseconds: {
		milliseconds: 1,
		dateSetter: 'setMilliseconds',
		dateGetter: 'getMilliseconds',
		ISOCharacter: 'M',
		ISOPrecision: 'time',
	},
} as const;
