const MILLISECONDS_IN_A_SECOND = 1000;
const MILLISECONDS_IN_A_MINUTE = MILLISECONDS_IN_A_SECOND * 60;
const MILLISECONDS_IN_AN_HOUR = MILLISECONDS_IN_A_MINUTE * 60;
const MILLISECONDS_IN_A_DAY = MILLISECONDS_IN_AN_HOUR * 24;
const MILLISECONDS_IN_A_WEEK = MILLISECONDS_IN_A_DAY * 7;
const MILLISECONDS_IN_A_YEAR = MILLISECONDS_IN_A_DAY * 365;
const MILLISECONDS_IN_A_MONTH = MILLISECONDS_IN_A_YEAR / 12;

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

export const UNITS_MAP = {
	years: {
		milliseconds: MILLISECONDS_IN_A_YEAR,
		addToDate: (date: Date, value: number) => date.setFullYear(date.getFullYear() + value),
		dateGetter: (date: Date) => date.getFullYear(),
		ISOCharacter: 'Y',
		ISOPrecision: 'date',
		isAlternativeUnit: false,
	},
	months: {
		milliseconds: MILLISECONDS_IN_A_MONTH,
		addToDate: (date: Date, value: number) => date.setMonth(date.getMonth() + value),
		dateGetter: (date: Date) => date.getMonth(),
		ISOCharacter: 'M',
		ISOPrecision: 'date',
		isAlternativeUnit: false,
	},
	weeks: {
		milliseconds: MILLISECONDS_IN_A_WEEK,
		addToDate: (date: Date, value: number) => date.setDate(date.getDate() + (value * 7)),
		dateGetter: () => 0,
		ISOCharacter: 'W',
		ISOPrecision: 'date',
		// TODO: Test
		isAlternativeUnit: true,
	},
	days: {
		milliseconds: MILLISECONDS_IN_A_DAY,
		addToDate: (date: Date, value: number) => date.setDate(date.getDate() + value),
		dateGetter: (date: Date) => date.getDate(),
		ISOCharacter: 'D',
		ISOPrecision: 'date',
		isAlternativeUnit: false,
	},
	hours: {
		milliseconds: MILLISECONDS_IN_AN_HOUR,
		addToDate: (date: Date, value: number) => date.setHours(date.getHours() + value),
		dateGetter: (date: Date) => date.getHours(),
		ISOCharacter: 'H',
		ISOPrecision: 'time',
		isAlternativeUnit: false,
	},
	minutes: {
		milliseconds: MILLISECONDS_IN_A_MINUTE,
		addToDate: (date: Date, value: number) => date.setMinutes(date.getMinutes() + value),
		dateGetter: (date: Date) => date.getMinutes(),
		ISOCharacter: 'M',
		ISOPrecision: 'time',
		isAlternativeUnit: false,
	},
	seconds: {
		milliseconds: MILLISECONDS_IN_A_SECOND,
		addToDate: (date: Date, value: number) => date.setSeconds(date.getSeconds() + value),
		dateGetter: (date: Date) => date.getSeconds(),
		ISOCharacter: 'S',
		ISOPrecision: 'time',
		isAlternativeUnit: false,
	},
	milliseconds: {
		milliseconds: 1,
		addToDate: (date: Date, value: number) => date.setMilliseconds(date.getMilliseconds() + value),
		dateGetter: (date: Date) => date.getMilliseconds(),
		ISOCharacter: null,
		ISOPrecision: null,
		isAlternativeUnit: false,
	},
} as const;

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
