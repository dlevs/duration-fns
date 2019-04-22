import multiplyTime from './multiplyTime';

describe('multiplyTime()', () => {
	test('works as expected', () => {
		expect(multiplyTime({ milliseconds: 10 }, 2)).toBe(20);
		expect(multiplyTime({ milliseconds: 10 }, 0.5)).toBe(5);
		expect(multiplyTime({ seconds: 1, milliseconds: 10 }, 10)).toBe(10100);
	});
});

test('accepts number and string arguments', () => {
	expect(multiplyTime(100, 2)).toBe(200);
	expect(multiplyTime('PT6S', 2)).toBe(12000);
});
