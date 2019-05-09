import * as deepFreeze from 'deep-freeze';
import { sum } from './sum';

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

	test('throws errors for non-integer values', () => {
		expect(() => sum({ months: 1.5 }, { months: 1 })).toThrow();
		expect(() => sum({ months: 1 }, { months: 1.5 })).toThrow();
		expect(() => sum({ months: 1 }, { months: 1 })).not.toThrow();
	});
});
