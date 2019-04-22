import divideTime from './divideTime';

describe('divideTime()', () => {
	test('works as expected', () => {
		expect(divideTime({ milliseconds: 10 }, 2)).toBe(5);
		expect(divideTime({ milliseconds: 10 }, 0.5)).toBe(20);
		expect(divideTime({ seconds: 1, milliseconds: 10 }, 10)).toBe(101);
	});

	test('accepts number and string arguments', () => {
		expect(divideTime(100, 2)).toBe(50);
		expect(divideTime('PT6S', 2)).toBe(3000);
	});
});
