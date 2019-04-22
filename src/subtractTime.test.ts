import subtractTime from './subtractTime';

const time = { milliseconds: 10 };

describe('subtractTime()', () => {
	test('works as expected for 2 arguments', () => {
		expect(subtractTime(time, time)).toBe(0);
		expect(subtractTime(time, { seconds: 1 })).toBe(-990);
	});

	test('works as expected for a variable number of arguments', () => {
		expect(subtractTime(time, time, time)).toBe(-10);
		expect(subtractTime(time, time, time, time, time)).toBe(-30);
		// Object hasn't been mutated:
		expect(time).toMatchObject({ milliseconds: 10 });
	});

	test('accepts number and string arguments', () => {
		expect(subtractTime(100, 2000)).toBe(-1900);
		expect(subtractTime('PT6S', 'PT1S', 2000)).toBe(3000);
	});
});
