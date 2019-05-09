import { apply } from './apply';

describe('apply()', () => {
	test('applies a duration to a date', () => {
		expect(apply('1970-01-01Z', { seconds: 10 }).toISOString()).toBe('1970-01-01T00:00:10.000Z');
		expect(apply('1970-01-01Z', 'P1Y1M').toISOString()).toBe('1971-02-01T00:00:00.000Z');
		expect(apply('2018-01-01Z', 'P00010203T040506,2').toISOString()).toBe('2019-03-04T04:05:06.200Z');
	});

	test('throws errors for non-integer values', () => {
		expect(() => apply('1970-01-01Z', { months: 1.5 })).toThrow();
		expect(() => apply('1970-01-01Z', { months: 1 })).not.toThrow();
	});
});
