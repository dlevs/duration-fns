export const MILLISECONDS_IN_A_SECOND = 1000;
export const MILLISECONDS_IN_A_MINUTE = MILLISECONDS_IN_A_SECOND * 60;
export const MILLISECONDS_IN_AN_HOUR = MILLISECONDS_IN_A_MINUTE * 60;
export const MILLISECONDS_IN_A_DAY = MILLISECONDS_IN_AN_HOUR * 24;
export const MILLISECONDS_IN_A_WEEK = MILLISECONDS_IN_A_DAY * 7;
export const MILLISECONDS_IN_A_YEAR = MILLISECONDS_IN_A_DAY * 365;
export const MILLISECONDS_IN_A_MONTH = MILLISECONDS_IN_A_YEAR / 12;

export const DEFAULT_TIME = Object.freeze({
	years: 0,
	months: 0,
	weeks: 0,
	days: 0,
	hours: 0,
	minutes: 0,
	seconds: 0,
	milliseconds: 0,
} as const);
