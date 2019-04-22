import { parseISODuration } from './parseISODuration';

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
			seconds: 5.5,
			milliseconds: 0,
		};
		expect(parseISODuration('P3Y6M2W4DT12H30M5.5S')).toEqual(expectedResult);
		expect(parseISODuration('P3Y6M2W4DT12H30M5,5S')).toEqual(expectedResult);
	});

	test('parses shorthand values', () => {
		expect(parseISODuration('P1Y')).toEqual({
			years: 1,
			months: 0,
			weeks: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			milliseconds: 0,
		});

		expect(parseISODuration('PT1S')).toEqual({
			years: 0,
			months: 0,
			weeks: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 1,
			milliseconds: 0,
		});
	});
});

export default parseISODuration;
