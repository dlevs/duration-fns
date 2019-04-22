export interface Time {
	weeks: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
}

export interface AmbiguousTime extends Time {
	years: number;
	months: number;
}

export type TimeInput = Partial<Time> | number;
