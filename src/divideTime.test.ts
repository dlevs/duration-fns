import divideTime from './divideTime';

describe('divideTime()', () => {
	test('works as expected', () => {
		expect(divideTime({ milliseconds: 10 }, 2)).toBe(5);
		expect(divideTime({ milliseconds: 10 }, 0.5)).toBe(20);
		expect(divideTime({ seconds: 1, milliseconds: 10 }, 10)).toBe(101);
	});
});
