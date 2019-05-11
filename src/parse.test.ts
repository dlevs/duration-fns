import { ZERO } from './lib/units';
import { parse } from './parse';

describe('parse()', () => {
	test('parses objects', () => {
		expect(parse({})).toEqual(ZERO);
		expect(parse({ years: 10, seconds: 5 })).toEqual({ ...ZERO, years: 10, seconds: 5 });
	});

	test('parses strings', () => {
		expect(parse('P1YT6S')).toEqual({ ...ZERO, years: 1, seconds: 6 });
		expect(parse('P1W')).toEqual({ ...ZERO, weeks: 1 });
		expect(parse('P00010203T040506')).toEqual({
			...ZERO,
			years: 1,
			months: 2,
			days: 3,
			hours: 4,
			minutes: 5,
			seconds: 6,
		});
	});

	test('parses milliseconds', () => {
		expect(parse(20)).toEqual({ ...ZERO, milliseconds: 20 });
	});

	test('does not normalize units', () => {
		expect(parse({ months: 36, days: 800 })).toEqual({ ...ZERO, months: 36, days: 800 });
		expect(parse('PT400S')).toEqual({ ...ZERO, seconds: 400 });
		expect(parse(4000)).toEqual({ ...ZERO, milliseconds: 4000 });
	});

	test('parses -0 as 0', () => {
		// Number
		expect(-0).not.toBe(0);
		expect(parse(-0)).toEqual({ ...ZERO });

		// String
		expect(parse('PT-0,1S')).toEqual({ ...ZERO, milliseconds: -100 });
		expect(parse('PT-1S')).toEqual({ ...ZERO, seconds: -1 });
		expect(parse('PT-0S')).toEqual({ ...ZERO });
		expect(parse('PT-0H')).toEqual({ ...ZERO });
		expect(parse('P-0Y')).toEqual({ ...ZERO });

		// Object
		expect(parse({ years: -0, days: -0, hours: 2 })).toEqual({ ...ZERO, hours: 2 });
	});

	describe('throws errors for malformed values', () => {
		test('non-integer values from strings', () => {
			expect(() => parse('P1.5Y')).toThrow();
			expect(() => parse('P1.5M')).toThrow();
			expect(() => parse('P1,5W')).toThrow();
			expect(() => parse('P1,5D')).toThrow();
			expect(() => parse('P1DT1,1H')).toThrow();
			expect(() => parse('P1DT1,1M')).toThrow();
			expect(() => parse('P1DT1,1S')).not.toThrow(); // Seconds can be decimal values
		});

		test('non-integer values from numbers', () => {
			expect(() => parse(600.2)).toThrow();
			expect(() => parse(600)).not.toThrow();
		});

		test('non-integer values from objects', () => {
			expect(() => parse({ years: 1.5 })).toThrow();
			expect(() => parse({ months: 1.5 })).toThrow();
			expect(() => parse({ days: 1.5 })).toThrow();
			expect(() => parse({ weeks: 1.5 })).toThrow();
			expect(() => parse({ hours: 1.5 })).toThrow();
			expect(() => parse({ seconds: 1.5 })).toThrow();
			expect(() => parse({ milliseconds: 1.5 })).toThrow();
			expect(() => parse({ milliseconds: 1 })).not.toThrow();
		});

		test('generally malformed strings', () => {
			expect(() => parse('P')).toThrow();
			expect(() => parse('Hello')).toThrow();
			expect(() => parse('1D')).toThrow();
			expect(() => parse('8')).toThrow();
			expect(() => parse('P6D2S')).toThrow();
			expect(() => parse('P2S')).toThrow();
			expect(() => parse('P2,180102T161000')).toThrow();
			expect(() => parse('P2,180102T161000')).toThrow();
		});
	});
});
