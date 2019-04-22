import addTime from './addTime';

const time = { milliseconds: 10 };

describe('addTime()', () => {
	test('works as expected for 2 arguments', () => {
		expect(addTime(time, time)).toBe(20);
		expect(addTime(time, { seconds: 1 })).toBe(1010);
		expect(addTime(time, { seconds: -1 })).toBe(-990);
	});

	test('works as expected for a variable number of arguments', () => {
		expect(addTime(time, time, time)).toBe(30);
		expect(addTime(time, time, time, time, time)).toBe(50);
		// Object hasn't been mutated:
		expect(time).toMatchObject({ milliseconds: 10 });
	});

	test('accepts number and string arguments', () => {
		expect(addTime(100, 2000)).toBe(2100);
		expect(addTime('PT6S', 'PT1S', 2000)).toBe(9000);
	});
});
