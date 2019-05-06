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
});
