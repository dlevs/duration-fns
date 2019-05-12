import { apply } from './apply';

describe('apply()', () => {
	test('applies a duration to a date', () => {
		expect(apply('1970-01-01Z', { seconds: 10 }).toISOString()).toBe('1970-01-01T00:00:10.000Z');
		expect(apply('1970-01-01Z', 'P1Y1M').toISOString()).toBe('1971-02-01T00:00:00.000Z');
		expect(apply('2018-01-01Z', 'P00010203T040506,2').toISOString()).toBe('2019-03-04T04:05:06.200Z');
	});

	test('applies years', () => {
		expect(apply('1970-01-01T00:00:00.000Z', 'P1Y').toISOString()).toBe('1971-01-01T00:00:00.000Z');
		expect(apply('1970-01-01T00:00:00.000Z', 'P4Y').toISOString()).toBe('1974-01-01T00:00:00.000Z');
	});

	test('applies hours', () => {
		expect(apply('2019-03-31T00:00:00.000Z', 'PT1H').toISOString()).toBe('2019-03-31T01:00:00.000Z');
		expect(apply('2019-03-31T01:00:00.000Z', 'PT1H').toISOString()).toBe('2019-03-31T02:00:00.000Z');
		expect(apply('2019-03-31T02:00:00.000Z', 'PT1H').toISOString()).toBe('2019-03-31T03:00:00.000Z');
	});

	test('handles month edge cases', () => {
		expect(apply('1970-01-31Z', 'P1M').toISOString()).toBe('1970-02-28T00:00:00.000Z');
		expect(apply('1970-02-28Z', 'P1M').toISOString()).toBe('1970-03-28T00:00:00.000Z');
		expect(apply('1970-08-31Z', 'P1M').toISOString()).toBe('1970-09-30T00:00:00.000Z');
		expect(apply('1970-12-31Z', 'P1M').toISOString()).toBe('1971-01-31T00:00:00.000Z');
	});

	// TODO: Test years

	test('does not mutate the original date', () => {
		const date = new Date('1970-01-01Z');

		expect(apply(date, 'P1Y').toISOString()).toBe('1971-01-01T00:00:00.000Z');
		expect(date.toISOString()).toBe('1970-01-01T00:00:00.000Z');
	});

	// TODO: test negative values

	// test('handles month edge cases', () => {
	// 	expect(apply('1970-01-31Z', 'P1M').toISOString()).toBe('1970-02-28T00:00:00.000Z');
	// 	expect(apply('1970-02-28Z', 'P1M').toISOString()).toBe('1970-03-28T00:00:00.000Z');
	// 	expect(apply('1970-08-31Z', 'P1M').toISOString()).toBe('1970-09-30T00:00:00.000Z');
	// 	expect(apply('1970-12-31Z', 'P1M').toISOString()).toBe('1971-01-31T00:00:00.000Z');
	// });

	test('throws errors for non-integer values', () => {
		expect(() => apply('1970-01-01Z', { months: 1.5 })).toThrow();
		expect(() => apply('1970-01-01Z', { months: 1 })).not.toThrow();
	});
});
