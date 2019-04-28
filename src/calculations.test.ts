import * as deepFreeze from 'deep-freeze';
import { sum, subtract, multiply, divide } from './calculations';

const time = deepFreeze({ milliseconds: 10 });

describe('sum()', () => {
	test('works as expected for 2 arguments', () => {
		expect(sum(time, time)).toMatchObject({ milliseconds: 20 });
		expect(sum(time, { seconds: 1 })).toMatchObject({ seconds: 1, milliseconds: 10 });
		expect(sum(time, { seconds: -1 })).toMatchObject({ seconds: -1, milliseconds: 10 });
	});

	test('works as expected for a variable number of arguments', () => {
		expect(sum(time, time, time, time, time)).toMatchObject({ milliseconds: 50 });
	});

	test('accepts number and string arguments', () => {
		expect(sum(100, 2000)).toMatchObject({ milliseconds: 2100 });
		expect(sum('PT6S', 'PT1S', 2000)).toMatchObject({
			seconds: 7,
			milliseconds: 2000,
		});
	});
});

describe('subtract()', () => {
	test('works as expected for 2 arguments', () => {
		expect(subtract(time, time)).toMatchObject({ milliseconds: 0 });
		expect(subtract(time, { seconds: 1 })).toMatchObject({ seconds: -1, milliseconds: 10 });
	});

	test('works as expected for a variable number of arguments', () => {
		expect(subtract(time, time, time)).toMatchObject({ milliseconds: -10 });
		expect(subtract(time, time, time, time, time)).toMatchObject({ milliseconds: -30 });
	});

	test('accepts number and string arguments', () => {
		expect(subtract(100, 2000)).toMatchObject({ milliseconds: -1900 });
		expect(subtract('PT6S', 'PT1S', 2000)).toMatchObject({
			seconds: 5,
			milliseconds: -2000,
		});
	});
});

describe('multiply()', () => {
	test('works as expected', () => {
		expect(multiply({ milliseconds: 10 }, 2)).toMatchObject({ milliseconds: 20 });
		expect(multiply({ milliseconds: 10 }, 0.5)).toMatchObject({ milliseconds: 5 });
		expect(multiply({ seconds: 1, milliseconds: 10 }, 10)).toMatchObject({
			seconds: 10,
			milliseconds: 100,
		});
	});

	test('accepts number and string arguments', () => {
		expect(multiply(100, 2)).toMatchObject({ milliseconds: 200 });
		expect(multiply('PT6S', 2)).toMatchObject({ seconds: 12 });
	});
});

describe('divide()', () => {
	test('works as expected', () => {
		expect(divide({ milliseconds: 10 }, 2)).toMatchObject({ milliseconds: 5 });
		expect(divide({ milliseconds: 10, seconds: 5 }, 0.5)).toMatchObject({
			seconds: 10,
			milliseconds: 20,
		});
		expect(divide({ seconds: 1, milliseconds: 10 }, 10)).toMatchObject({
			seconds: 0.1,
			milliseconds: 1,
		});
	});

	test('accepts number and string arguments', () => {
		expect(divide(100, 2)).toMatchObject({ milliseconds: 50 });
		expect(divide('PT6S', 2)).toMatchObject({ seconds: 3 });
	});
});
