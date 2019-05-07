import { ZERO } from './lib/units';
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
			years: 1,
			months: -9,
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
	});

	test('calculates durations based on reference time when provided', () => {
		expect(normalize('P1M', '2018-01-20T00:00:00.000Z')).toEqual({
			...ZERO,
			months: 1,
		});

		// Normal year
		expect(normalize('P60D', '2018-02-01T00:00:00.000Z')).toEqual({
			...ZERO,
			months: 2,
			days: 1,
		});

		// Leap year
		expect(normalize('P60D', '2016-02-01T00:00:00.000Z')).toEqual({
			...ZERO,
			months: 2,
		});

		expect(normalize('P60D', '2018-03-01T00:00:00.000Z')).toEqual({
			...ZERO,
			months: 1,
			days: 29,
		});
	});
});
