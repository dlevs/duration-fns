import { addTime, subtractTime, multiplyTime, divideTime } from './calculations';

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

describe('multiplyTime()', () => {
	test('works as expected', () => {
		expect(multiplyTime({ milliseconds: 10 }, 2)).toBe(20);
		expect(multiplyTime({ milliseconds: 10 }, 0.5)).toBe(5);
		expect(multiplyTime({ seconds: 1, milliseconds: 10 }, 10)).toBe(10100);
	});

	test('accepts number and string arguments', () => {
		expect(multiplyTime(100, 2)).toBe(200);
		expect(multiplyTime('PT6S', 2)).toBe(12000);
	});
});

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
