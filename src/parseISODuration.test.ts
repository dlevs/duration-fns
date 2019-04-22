import parseISODuration from './parseISODuration';

test('parses full ISO 8601 duration strings', () => {
	expect(parseISODuration('P3Y6M4DT12H30M5S')).toEqual({
		years: 3,
		months: 6,
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
		days: 4,
		hours: 12,
		minutes: 30,
		seconds: 5,
		milliseconds: 500,
	};
	expect(parseISODuration('P3Y6M4DT12H30M5.5S')).toEqual(expectedResult);
	expect(parseISODuration('P3Y6M4DT12H30M5,5S')).toEqual(expectedResult);
});

export default parseISODuration;
