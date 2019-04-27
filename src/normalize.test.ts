import { DEFAULT_TIME } from './lib/units';
import { normalize } from './normalize';
import * as deepFreeze from 'deep-freeze';

const ONE_OF_EACH = deepFreeze({
	years: 1,
	months: 1,
	weeks: 1,
	days: 1,
	hours: 1,
	minutes: 1,
	seconds: 1,
	milliseconds: 1,
});

describe('normalize()', () => {
	test('normal usage', () => {
		expect(normalize(ONE_OF_EACH)).not.toBe(ONE_OF_EACH);
		expect(normalize(ONE_OF_EACH)).toEqual(ONE_OF_EACH);
		expect(normalize({ seconds: 1 })).toEqual({
			...DEFAULT_TIME,
			seconds: 1,
		});
		expect(normalize({
			days: 5,
			hours: -4,
		})).toEqual({
			...DEFAULT_TIME,
			days: 4,
			hours: 20,
		});
		expect(normalize({
			years: 100,
			months: 100,
			weeks: 100,
			days: 100,
			hours: 100,
			minutes: 100,
			seconds: 100,
			milliseconds: 100,
		})).toEqual({
			years: 110,
			months: 6,
			weeks: 1,
			days: 6,
			hours: 9,
			minutes: 41,
			seconds: 40,
			milliseconds: 100,
		});
		expect(normalize({ days: 1.5, hours: 2 })).toEqual({
			...DEFAULT_TIME,
			days: 1,
			hours: 14,
		});
		expect(normalize({ days: -1, milliseconds: 1 })).toEqual({
			...DEFAULT_TIME,
			hours: -23,
			minutes: -59,
			seconds: -59,
			milliseconds: -999,
		});
	});

	test('converts raw milliseconds', () => {
		expect(normalize(4200)).toEqual({
			...DEFAULT_TIME,
			seconds: 4,
			milliseconds: 200,
		});
	});

	test('converts string durations', () => {
		expect(normalize('P14M')).toEqual({
			...DEFAULT_TIME,
			years: 1,
			months: 2,
		});
	});

	test('TODO: write something better here', () => {
		expect(normalize('P1M', '2018-01-20T00:00:00.000Z')).toEqual({
			...DEFAULT_TIME,
			months: 1,
		});

		// Normal year
		expect(normalize('P60D', '2018-02-01T00:00:00.000Z')).toEqual({
			...DEFAULT_TIME,
			months: 2,
			days: 1,
		});

		// Leap year
		expect(normalize('P60D', '2016-02-01T00:00:00.000Z')).toEqual({
			...DEFAULT_TIME,
			months: 2,
		});

		expect(normalize('P60D', '2018-03-01T00:00:00.000Z')).toEqual({
			...DEFAULT_TIME,
			months: 1,
			days: 29,
		});
	});
});
