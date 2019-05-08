import { parseISODuration } from './parseISODuration';
import { ZERO } from './units';

describe('parseISODuration()', () => {
	test('parses full ISO 8601 duration strings', () => {
		expect(parseISODuration('P3Y6M4DT12H30M5S')).toEqual({
			years: 3,
			months: 6,
			weeks: 0,
			days: 4,
			hours: 12,
			minutes: 30,
			seconds: 5,
			milliseconds: 0,
		});
	});

	test('parses full ISO 8601 duration strings with decimals', () => {
		const expectedResult = {
			years: 3,
			months: 6,
			weeks: 2,
			days: 4,
			hours: 12,
			minutes: 30,
			seconds: 5,
			milliseconds: 500,
		};
		expect(parseISODuration('P3Y6M2W4DT12H30M5.5S')).toEqual(expectedResult);
		expect(parseISODuration('P3Y6M2W4DT12H30M5,5S')).toEqual(expectedResult);
	});

	test('parses shorthand values', () => {
		expect(parseISODuration('P1Y')).toEqual({
			...ZERO,
			years: 1,
		});

		expect(parseISODuration('P1YT2S')).toEqual({
			...ZERO,
			years: 1,
			seconds: 2,
		});

		expect(parseISODuration('P22W')).toEqual({
			...ZERO,
			weeks: 22,
		});

		expect(parseISODuration('P1M10W')).toEqual({
			...ZERO,
			months: 1,
			weeks: 10,
		});

		expect(parseISODuration('PT1S')).toEqual({
			...ZERO,
			seconds: 1,
		});
	});

	test('parses alternative format values', () => {
		const expected = {
			years: 2018,
			months: 1,
			weeks: 0,
			days: 2,
			hours: 16,
			minutes: 10,
			seconds: 22,
			milliseconds: 40,
		};

		expect(parseISODuration('P2018-01-02T16:10:22,04')).toEqual(expected);
		expect(parseISODuration('P2018-01-02T16:10:22.0400000')).toEqual(expected);
		expect(parseISODuration('P20180102T161022.04')).toEqual(expected);
		expect(parseISODuration('P20180102T161000')).toEqual({ ...expected, seconds: 0, milliseconds: 0 });
		expect(parseISODuration('P00001202T161022.04')).toEqual({ ...expected, years: 0, months: 12 });
		expect(parseISODuration('P00001202T161022,04')).toEqual({ ...expected, years: 0, months: 12 });
	});

	test('parses negative values', () => {
		const expected = {
			years: -2018,
			months: -1,
			weeks: 0,
			days: -2,
			hours: -16,
			minutes: -10,
			seconds: -22,
			milliseconds: -40,
		};

		expect(parseISODuration('-P2018-01-02T16:10:22,04')).toEqual(expected);
		expect(parseISODuration('-P2018Y01M02DT16H10M22,04S')).toEqual(expected);
		expect(parseISODuration('P-2018Y-01M-02DT-16H-10M-22,04S')).toEqual(expected);
		expect(parseISODuration('P2Y-10D')).toEqual({ ...ZERO, years: 2, days: -10 });
		expect(parseISODuration('-P-2Y-10D')).toEqual({ ...ZERO, years: 2, days: 10 });
	});

	test('convert decimal seconds into milliseconds', () => {
		expect(parseISODuration('PT2,123S')).toEqual({ ...ZERO, seconds: 2, milliseconds: 123 });
		expect(parseISODuration('-PT2,123S')).toEqual({ ...ZERO, seconds: -2, milliseconds: -123 });
		expect(parseISODuration('PT-2,123S')).toEqual({ ...ZERO, seconds: -2, milliseconds: -123 });
		expect(parseISODuration('P2018-01-02T16:10:22,6')).toMatchObject({ seconds: 22, milliseconds: 600 });
		expect(parseISODuration('-P2018-01-02T16:10:22,6')).toMatchObject({ seconds: -22, milliseconds: -600 });
		expect(parseISODuration('P00001202T161006.04')).toMatchObject({ seconds: 6, milliseconds: 40 });
		expect(parseISODuration('-P00001202T161006.04')).toMatchObject({ seconds: -6, milliseconds: -40 });
	});
});
