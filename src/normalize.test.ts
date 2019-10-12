import { ZERO } from './lib/units';
import { normalize } from './normalize';

const ONE_OF_EACH = Object.freeze({
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
		expect(normalize(ZERO)).toEqual(ZERO);

		expect(normalize(ZERO)).not.toBe(ZERO);

		expect(normalize(ONE_OF_EACH)).toEqual({
			...ONE_OF_EACH,
			weeks: 0,
			days: 8,
		});

		expect(normalize({
			days: 5,
			hours: -4,
		})).toEqual({
			...ZERO,
			days: 4,
			hours: 20,
		});

		expect(normalize({ days: -1, milliseconds: 1 })).toEqual({
			...ZERO,
			hours: -23,
			minutes: -59,
			seconds: -59,
			milliseconds: -999,
		});

		expect(normalize({
			years: 1,
			months: 14,
			weeks: 1,
			days: 40,
			hours: 26,
			minutes: 62,
			seconds: 62,
			milliseconds: 1002,
		})).toEqual({
			years: 2,
			months: 2,
			weeks: 0,
			days: 48,
			hours: 3,
			minutes: 3,
			seconds: 3,
			milliseconds: 2,
		});
	});

	test('works with minus values', () => {
		expect(normalize({
			years: 1,
			months: -9,
			seconds: 1,
			milliseconds: -500,
		})).toEqual({
			...ZERO,
			years: 0,
			months: 3,
			seconds: 0,
			milliseconds: 500,
		});

		expect(normalize({
			years: 1,
			months: -14,
		})).toEqual({
			...ZERO,
			months: -2,
		});

		expect(normalize({
			years: 1,
			months: -24,
		})).toEqual({
			...ZERO,
			years: -1,
		});

		expect(normalize({
			years: -1,
			months: 12,
			weeks: 1,
			days: -7,
			hours: 2,
			minutes: -120,
			seconds: -2,
			milliseconds: 2000,
		})).toEqual(ZERO);
	});

	test('converts raw milliseconds', () => {
		expect(normalize(4200)).toEqual({
			...ZERO,
			seconds: 4,
			milliseconds: 200,
		});
	});

	test('converts string durations', () => {
		expect(normalize('P14M')).toEqual({
			...ZERO,
			years: 1,
			months: 2,
		});

		expect(normalize('P14MT-61.2S')).toEqual({
			...ZERO,
			years: 1,
			months: 2,
			minutes: -1,
			seconds: -1,
			milliseconds: -200,
		});
	});

	test('calculates durations based on reference time when provided', () => {
		expect(normalize('P1M', '2018-01-20T00:00:00.000Z')).toEqual({
			...ZERO,
			months: 1,
		});

		// Normal year
		expect(normalize('P29D', '2018-02-01T00:00:00.000Z')).toEqual({
			...ZERO,
			months: 1,
			days: 1,
		});

		// Leap year
		expect(normalize('P29D', '2016-02-01T00:00:00.000Z')).toEqual({
			...ZERO,
			months: 1,
		});

		expect(normalize('P29D', '2018-03-01T00:00:00.000Z')).toEqual({
			...ZERO,
			days: 29,
		});

		expect(normalize({ days: 31 }, '2020-12-01')).toEqual({
			...ZERO,
			months: 1,
		});

		expect(normalize({ days: -31 }, '2020-12-01')).toEqual({
			...ZERO,
			months: -2,
			days: 30,
		});

		expect(normalize({ days: 31 }, '2020-02-01')).toEqual({
			...ZERO,
			months: 1,
			days: 2,
		});

		expect(normalize({ days: -31 }, '2020-02-01')).toEqual({
			...ZERO,
			months: -1,
		});
	});

	test('throws errors for non-integer values', () => {
		expect(() => normalize({ months: 1.5 })).toThrow();
		expect(() => normalize({ months: 1 })).not.toThrow();
	});
});
