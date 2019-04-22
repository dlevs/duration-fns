import normalizeTime from './normalizeTime';
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

describe('normalizeTime()', () => {
	test('normal usage', () => {
		expect(normalizeTime(ONE_OF_EACH)).not.toBe(ONE_OF_EACH);
		expect(normalizeTime(ONE_OF_EACH)).toMatchObject(ONE_OF_EACH);
		expect(normalizeTime({ seconds: 1 })).toMatchObject({
			years: 0,
			months: 0,
			weeks: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 1,
			milliseconds: 0,
		});
		expect(normalizeTime({
			days: 5,
			hours: -4,
		})).toMatchObject({
			years: 0,
			months: 0,
			weeks: 0,
			days: 4,
			hours: 20,
			minutes: 0,
			seconds: 0,
			milliseconds: 0,
		});
		expect(normalizeTime({
			years: 100,
			months: 100,
			weeks: 100,
			days: 100,
			hours: 100,
			minutes: 100,
			seconds: 100,
			milliseconds: 100,
		})).toMatchObject({
			years: 110,
			months: 6,
			weeks: 1,
			days: 6,
			hours: 9,
			minutes: 41,
			seconds: 40,
			milliseconds: 100,
		});
		expect(normalizeTime({ days: 1.5, hours: 2 })).toMatchObject({
			years: 0,
			months: 0,
			weeks: 0,
			days: 1,
			hours: 14,
			minutes: 0,
			seconds: 0,
			milliseconds: 0,
		});
		expect(normalizeTime({ days: -1, milliseconds: 1 })).toMatchObject({
			years: 0,
			months: 0,
			weeks: 0,
			days: 0,
			hours: -23,
			minutes: -59,
			seconds: -59,
			milliseconds: -999,
		});
	});

	test('converts raw milliseconds', () => {
		expect(normalizeTime(4200)).toEqual({
			years: 0,
			months: 0,
			weeks: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 4,
			milliseconds: 200,
		});
	});

	test('converts string durations', () => {
		expect(normalizeTime('P14M')).toEqual({
			years: 1,
			months: 2,
			weeks: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			milliseconds: 0,
		});
	});
});
