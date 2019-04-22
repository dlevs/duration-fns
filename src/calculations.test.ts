import * as deepFreeze from 'deep-freeze';
import { addTime, subtractTime, multiplyTime, divideTime } from './calculations';

const time = deepFreeze({ milliseconds: 10 });

describe('addTime()', () => {
	test('works as expected for 2 arguments', () => {
		expect(addTime(time, time)).toMatchObject({ milliseconds: 20 });
		expect(addTime(time, { seconds: 1 })).toMatchObject({ seconds: 1, milliseconds: 10 });
		expect(addTime(time, { seconds: -1 })).toMatchObject({ seconds: -1, milliseconds: 10 });
	});

	test('works as expected for a variable number of arguments', () => {
		expect(addTime(time, time, time, time, time)).toMatchObject({ milliseconds: 50 });
	});

	test('accepts number and string arguments', () => {
		expect(addTime(100, 2000)).toMatchObject({ milliseconds: 2100 });
		expect(addTime('PT6S', 'PT1S', 2000)).toMatchObject({
			seconds: 7,
			milliseconds: 2000,
		});
	});
});

describe('subtractTime()', () => {
	test('works as expected for 2 arguments', () => {
		expect(subtractTime(time, time)).toMatchObject({ milliseconds: 0 });
		expect(subtractTime(time, { seconds: 1 })).toMatchObject({ seconds: -1, milliseconds: 10 });
	});

	test('works as expected for a variable number of arguments', () => {
		expect(subtractTime(time, time, time)).toMatchObject({ milliseconds: -10 });
		expect(subtractTime(time, time, time, time, time)).toMatchObject({ milliseconds: -30 });
	});

	test('accepts number and string arguments', () => {
		expect(subtractTime(100, 2000)).toMatchObject({ milliseconds: -1900 });
		expect(subtractTime('PT6S', 'PT1S', 2000)).toMatchObject({
			seconds: 5,
			milliseconds: -2000,
		});
	});
});

describe('multiplyTime()', () => {
	test('works as expected', () => {
		expect(multiplyTime({ milliseconds: 10 }, 2)).toMatchObject({ milliseconds: 20 });
		expect(multiplyTime({ milliseconds: 10 }, 0.5)).toMatchObject({ milliseconds: 5 });
		expect(multiplyTime({ seconds: 1, milliseconds: 10 }, 10)).toMatchObject({
			seconds: 10,
			milliseconds: 100,
		});
	});

	test('accepts number and string arguments', () => {
		expect(multiplyTime(100, 2)).toMatchObject({ milliseconds: 200 });
		expect(multiplyTime('PT6S', 2)).toMatchObject({ seconds: 12 });
	});
});

describe('divideTime()', () => {
	test('works as expected', () => {
		expect(divideTime({ milliseconds: 10 }, 2)).toMatchObject({ milliseconds: 5 });
		expect(divideTime({ milliseconds: 10, seconds: 5 }, 0.5)).toMatchObject({
			seconds: 10,
			milliseconds: 20,
		});
		expect(divideTime({ seconds: 1, milliseconds: 10 }, 10)).toMatchObject({
			seconds: 0.1,
			milliseconds: 1,
		});
	});

	test('accepts number and string arguments', () => {
		expect(divideTime(100, 2)).toMatchObject({ milliseconds: 50 });
		expect(divideTime('PT6S', 2)).toMatchObject({ seconds: 3 });
	});
});
