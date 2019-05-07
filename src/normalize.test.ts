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
		expect(normalize(ONE_OF_EACH)).not.toBe(ONE_OF_EACH);
		expect(normalize({ seconds: 1 })).toEqual({
			...ZERO,
			seconds: 1,
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
});

// TODO: Sort these tests out
// describe('normalize()', () => {
// 	test('normal usage', () => {
// 		expect(normalize(ONE_OF_EACH)).not.toBe(ONE_OF_EACH);
// 		expect(normalize({ seconds: 1 })).toEqual({
// 			...ZERO,
// 			seconds: 1,
// 		});
// 		expect(normalize({
// 			days: 5,
// 			hours: -4,
// 		})).toEqual({
// 			...ZERO,
// 			days: 4,
// 			hours: 20,
// 		});
// 		expect(normalize({
// 			years: 100,
// 			months: 100,
// 			weeks: 100,
// 			days: 100,
// 			hours: 100,
// 			minutes: 100,
// 			seconds: 100,
// 			milliseconds: 100,
// 		})).toEqual({
// 			years: 110,
// 			months: 6,
// 			weeks: 1,
// 			days: 6,
// 			hours: 9,
// 			minutes: 41,
// 			seconds: 40,
// 			milliseconds: 100,
// 		});
// 		expect(normalize({ days: 1.5, hours: 2 })).toEqual({
// 			...ZERO,
// 			days: 1,
// 			hours: 14,
// 		});
// 		expect(normalize({ days: -1, milliseconds: 1 })).toEqual({
// 			...ZERO,
// 			hours: -23,
// 			minutes: -59,
// 			seconds: -59,
// 			milliseconds: -999,
// 		});
// 	});

// 	test('converts raw milliseconds', () => {
// 		expect(normalize(4200)).toEqual({
// 			...ZERO,
// 			seconds: 4,
// 			milliseconds: 200,
// 		});
// 	});

// 	test('converts string durations', () => {
// 		expect(normalize('P14M')).toEqual({
// 			...ZERO,
// 			years: 1,
// 			months: 2,
// 		});
// 	});

// 	test('calculates durations based on reference time when provided', () => {
// 		expect(normalize('P1M', '2018-01-20T00:00:00.000Z')).toEqual({
// 			...ZERO,
// 			months: 1,
// 		});

// 		// Normal year
// 		expect(normalize('P60D', '2018-02-01T00:00:00.000Z')).toEqual({
// 			...ZERO,
// 			months: 2,
// 			days: 1,
// 		});

// 		// Leap year
// 		expect(normalize('P60D', '2016-02-01T00:00:00.000Z')).toEqual({
// 			...ZERO,
// 			months: 2,
// 		});

// 		expect(normalize('P60D', '2018-03-01T00:00:00.000Z')).toEqual({
// 			...ZERO,
// 			months: 1,
// 			days: 29,
// 		});
// 	});

// 	test('converts non-integer values', () => {
// 		expect(normalize({ seconds: 2.5 })).toEqual({
// 			...ZERO,
// 			seconds: 2,
// 			milliseconds: 500,
// 		});

// 		expect(normalize({ seconds: 2.5 }, '2018-01-01Z')).toEqual({
// 			...ZERO,
// 			seconds: 2,
// 			milliseconds: 500,
// 		});
// 	});
// });
