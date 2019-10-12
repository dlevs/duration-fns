import { ZERO } from './units';
import { cleanDurationObject } from './cleanDurationObject';

const ONE_OF_EACH = Object.freeze({
	years: 1,
	months: 2,
	weeks: 3,
	days: 4,
	hours: 5,
	minutes: 6,
	seconds: 7,
	milliseconds: 8,
});

const UNCLEAN_ZERO = Object.freeze({
	years: -0,
	months: -0,
	weeks: -0,
	days: -0,
	hours: -0,
	minutes: -0,
	seconds: -0,
	milliseconds: -0,
});

describe('cleanDurationObject', () => {
	test('converts -0 to 0', () => {
		expect(UNCLEAN_ZERO).not.toEqual(ZERO);
		expect(cleanDurationObject(UNCLEAN_ZERO)).toEqual(ZERO);
		expect(cleanDurationObject(ZERO)).toEqual(ZERO);
		expect(cleanDurationObject(ZERO)).not.toBe(ZERO);
		expect(cleanDurationObject(ONE_OF_EACH)).toEqual(ONE_OF_EACH);
		expect(cleanDurationObject(ONE_OF_EACH)).not.toBe(ONE_OF_EACH);
	});
});
