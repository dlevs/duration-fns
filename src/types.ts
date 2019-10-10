export interface Duration {
	years: number;
	months: number;
	weeks: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
}

export type DurationInput = Partial<Readonly<Duration>> | number | string;

export type DateInput = Date | number | string;
