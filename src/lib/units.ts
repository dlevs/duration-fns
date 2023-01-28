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
	years: 0 as number,
	months: 0 as number,
	weeks: 0 as number,
	days: 0 as number,
	hours: 0 as number,
	minutes: 0 as number,
	seconds: 0 as number,
	milliseconds: 0 as number,
});

export type UnitKey = keyof typeof ZERO;

export const UNITS_META_MAP_LITERAL = {
	years: {
		milliseconds: MILLISECONDS_IN_A_YEAR,
		months: 12,
		dateGetter: (date: Date) => date.getFullYear(),
		ISOCharacter: 'Y',
		ISOPrecision: 'period',
	},
	months: {
		milliseconds: MILLISECONDS_IN_A_MONTH,
		months: 1,
		dateGetter: (date: Date) => date.getMonth(),
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
		dateGetter: (date: Date) => date.getDate(),
		ISOCharacter: 'D',
		ISOPrecision: 'period',
	},
	hours: {
		milliseconds: MILLISECONDS_IN_AN_HOUR,
		dateGetter: (date: Date) => date.getHours(),
		ISOCharacter: 'H',
		ISOPrecision: 'time',
	},
	minutes: {
		milliseconds: MILLISECONDS_IN_A_MINUTE,
		dateGetter: (date: Date) => date.getMinutes(),
		ISOCharacter: 'M',
		ISOPrecision: 'time',
	},
	seconds: {
		milliseconds: MILLISECONDS_IN_A_SECOND,
		dateGetter: (date: Date) => date.getSeconds(),
		ISOCharacter: 'S',
		ISOPrecision: 'time',
	},
	milliseconds: {
		milliseconds: 1,
		dateGetter: (date: Date) => date.getMilliseconds(),
		stringifyConvertTo: 'seconds',
	},
} as const;

interface Unit {
	milliseconds: number;
	months?: number;
	dateGetter(date: Date): number;
	ISOCharacter?: string;
	ISOPrecision?: 'period' | 'time';
	stringifyConvertTo?: UnitKey;
}

// Re-export with a defined signature to allow for destructuring of optional
// properties.
//
// The original `UNITS_MAP_LITERAL` is useful as TypeScript does not need a null
// check when accessing an optional property that it knows is defined for the
// specified unit (e.g. `UNITS_MAP_LITERAL.years.months`), whereas `UNITS_MAP`
// needs the null check.
export const UNITS_META_MAP: { [key in UnitKey]: Unit } = UNITS_META_MAP_LITERAL;

/**
 * All the keys of the `Duration` type, ordered from largest
 * to smallest.
 */
export const UNITS = Object.freeze([
	'years',
	'months',
	'weeks',
	'days',
	'hours',
	'minutes',
	'seconds',
	'milliseconds',
] as const);

export const UNITS_META = Object.freeze(
	UNITS.map(unit => ({
		...UNITS_META_MAP[unit],
		unit,
	})),
);
