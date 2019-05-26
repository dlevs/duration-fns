import { subtract } from './subtract';

const duration = Object.freeze({ milliseconds: 10 });

describe('subtract()', () => {
	test('works as expected for 2 arguments', () => {
		expect(subtract(duration, duration)).toMatchObject({ milliseconds: 0 });
		expect(subtract(duration, { seconds: 1 })).toMatchObject({ seconds: -1, milliseconds: 10 });
	});

	test('works as expected for a variable number of arguments', () => {
		expect(subtract(duration, duration, duration)).toMatchObject({ milliseconds: -10 });
		expect(subtract(duration, duration, duration, duration, duration)).toMatchObject({
			milliseconds: -30,
		});
	});

	test('accepts number and string arguments', () => {
		expect(subtract(100, 2000)).toMatchObject({ milliseconds: -1900 });
		expect(subtract('PT6S', 'PT1S', 2000)).toMatchObject({
			seconds: 5,
			milliseconds: -2000,
		});
	});

	test('throws errors for non-integer values', () => {
		expect(() => subtract({ months: 1.5 }, { months: 1 })).toThrow();
		expect(() => subtract({ months: 1 }, { months: 1.5 })).toThrow();
		expect(() => subtract({ months: 1 }, { months: 1 })).not.toThrow();
	});
});
