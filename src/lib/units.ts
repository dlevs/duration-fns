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
	addToDate(date: Date, value: number): void;
	dateGetter(date: Date): number;
	ISOCharacter?: string;
	ISOPrecision?: 'period' | 'time';
	stringifyConvertTo?: UnitKey;
}

const addMilliseconds = (date: Date, value: number) =>
	date.setMilliseconds(date.getMilliseconds() + value);

// TODO: ISOCharacter and ISOPrecision no longer needed to parse duration string. Can they be removed? Needed still to stringify?
export const UNITS_MAP: { [key in UnitKey]: Unit } = {
	years: {
		milliseconds: MILLISECONDS_IN_A_YEAR,
		// TODO: Test adding a year on leap year
		addToDate: (date, value) => date.setFullYear(date.getFullYear() + value),
		dateGetter: date => date.getFullYear(),
		ISOCharacter: 'Y',
		ISOPrecision: 'period',
	},
	months: {
		milliseconds: MILLISECONDS_IN_A_MONTH,
		addToDate: (date, value) => {
			// TODO: Test me:
			// https://stackoverflow.com/questions/2706125/javascript-function-to-add-x-months-to-a-date
			const day = date.getDate();
			date.setMonth(date.getMonth() + value, 1);

			const month = date.getMonth();
			date.setDate(day);
			if (date.getMonth() !== month) {
				date.setDate(0);
			}

			return date.getMonth();
		},
		dateGetter: date => date.getMonth(),
		ISOCharacter: 'M',
		ISOPrecision: 'period',
	},
	weeks: {
		milliseconds: MILLISECONDS_IN_A_WEEK,
		addToDate: (date, value) => date.setDate(date.getDate() + (value * 7)),
		dateGetter: () => 0,
		ISOCharacter: 'W',
		ISOPrecision: 'period',
		stringifyConvertTo: 'days',
	},
	days: {
		milliseconds: MILLISECONDS_IN_A_DAY,
		addToDate: (date, value) => date.setDate(date.getDate() + value),
		dateGetter: date => date.getDate(),
		ISOCharacter: 'D',
		ISOPrecision: 'period',
	},
	hours: {
		milliseconds: MILLISECONDS_IN_AN_HOUR,
		addToDate: (date, value) => addMilliseconds(date, value * MILLISECONDS_IN_AN_HOUR),
		dateGetter: date => date.getHours(),
		ISOCharacter: 'H',
		ISOPrecision: 'time',
	},
	minutes: {
		milliseconds: MILLISECONDS_IN_A_MINUTE,
		addToDate: (date, value) => addMilliseconds(date, value * MILLISECONDS_IN_A_MINUTE),
		dateGetter: date => date.getMinutes(),
		ISOCharacter: 'M',
		ISOPrecision: 'time',
	},
	seconds: {
		milliseconds: MILLISECONDS_IN_A_SECOND,
		addToDate: (date, value) => addMilliseconds(date, value * MILLISECONDS_IN_A_SECOND),
		dateGetter: date => date.getSeconds(),
		ISOCharacter: 'S',
		ISOPrecision: 'time',
	},
	milliseconds: {
		milliseconds: 1,
		addToDate: addMilliseconds,
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
