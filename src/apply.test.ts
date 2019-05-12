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
		expect(apply('1970-01-01T00:00:00.000Z', 'P1000Y').toISOString()).toBe('2970-01-01T00:00:00.000Z');
	});

	test('applies months', () => {
		expect(apply('1970-01-01Z', 'P1M').toISOString()).toBe('1970-02-01T00:00:00.000Z');
		expect(apply('1970-01-01Z', 'P2M').toISOString()).toBe('1970-03-01T00:00:00.000Z');
		expect(apply('1970-01-14Z', 'P2M').toISOString()).toBe('1970-03-14T00:00:00.000Z');
		expect(apply('1970-12-20Z', 'P1M').toISOString()).toBe('1971-01-20T00:00:00.000Z');
	});

	test('handles end-of-month edge cases', () => {
		expect(apply('1970-01-31Z', 'P1M').toISOString()).toBe('1970-02-28T00:00:00.000Z');
		expect(apply('1970-02-28Z', 'P1M').toISOString()).toBe('1970-03-28T00:00:00.000Z');
		expect(apply('1970-08-31Z', 'P1M').toISOString()).toBe('1970-09-30T00:00:00.000Z');
		expect(apply('1970-12-31Z', 'P1M').toISOString()).toBe('1971-01-31T00:00:00.000Z');
	});

	test('applies weeks', () => {
		expect(apply('1970-01-01Z', 'P1W').toISOString()).toBe('1970-01-08T00:00:00.000Z');
		expect(apply('1970-01-01Z', 'P2W').toISOString()).toBe('1970-01-15T00:00:00.000Z');
	});

	test('applies days', () => {
		expect(apply('1970-01-01Z', 'P1D').toISOString()).toBe('1970-01-02T00:00:00.000Z');
		expect(apply('1970-01-31Z', 'P1D').toISOString()).toBe('1970-02-01T00:00:00.000Z');
		expect(apply('1970-01-12Z', 'P12D').toISOString()).toBe('1970-01-24T00:00:00.000Z');
	});

	test('applies hours', () => {
		expect(apply('1970-01-01Z', 'PT1H').toISOString()).toBe('1970-01-01T01:00:00.000Z');
		expect(apply('1970-01-01Z', 'PT24H').toISOString()).toBe('1970-01-02T00:00:00.000Z');
		expect(apply('2019-03-31T00:00:00.000Z', 'PT1H').toISOString()).toBe('2019-03-31T01:00:00.000Z');
		expect(apply('2019-03-31T00:00:00.000Z', 'PT2H').toISOString()).toBe('2019-03-31T02:00:00.000Z');
	});

	test('applies minutes', () => {
		expect(apply('1970-01-01Z', 'PT1M').toISOString()).toBe('1970-01-01T00:01:00.000Z');
		expect(apply('1970-01-01Z', 'PT64M').toISOString()).toBe('1970-01-01T01:04:00.000Z');
	});

	test('applies seconds', () => {
		expect(apply('1970-01-01Z', 'PT1S').toISOString()).toBe('1970-01-01T00:00:01.000Z');
		expect(apply('1970-01-01Z', 'PT64S').toISOString()).toBe('1970-01-01T00:01:04.000Z');
	});

	test('applies milliseconds', () => {
		expect(apply('1970-01-01Z', 'PT0,1S').toISOString()).toBe('1970-01-01T00:00:00.100Z');
		expect(apply('1970-01-01Z', 'PT0,064S').toISOString()).toBe('1970-01-01T00:00:00.064Z');
	});

	test('applies negative values', () => {
		expect(apply('1971-02-02T10:10:10.100Z', '-P1Y').toISOString()).toBe('1970-02-02T10:10:10.100Z');
		expect(apply('1971-02-02T10:10:10.100Z', 'P-1Y').toISOString()).toBe('1970-02-02T10:10:10.100Z');
		expect(apply('1971-02-02T10:10:10.100Z', 'P-1M').toISOString()).toBe('1971-01-02T10:10:10.100Z');
		expect(apply('1971-02-02T10:10:10.100Z', 'P-1W').toISOString()).toBe('1971-01-26T10:10:10.100Z');
		expect(apply('1971-02-02T10:10:10.100Z', 'P-1D').toISOString()).toBe('1971-02-01T10:10:10.100Z');
		expect(apply('1971-02-02T10:10:10.100Z', 'PT-1H').toISOString()).toBe('1971-02-02T09:10:10.100Z');
		expect(apply('1971-02-02T10:10:10.100Z', 'PT-1M').toISOString()).toBe('1971-02-02T10:09:10.100Z');
		expect(apply('1971-02-02T10:10:10.100Z', 'PT-1S').toISOString()).toBe('1971-02-02T10:10:09.100Z');
		expect(apply('1971-02-02T10:10:10.100Z', 'PT-0,010S').toISOString()).toBe('1971-02-02T10:10:10.090Z');
		expect(apply('1971-02-02T10:10:10.100Z', '-P00010101T010101,010').toISOString()).toBe('1970-01-01T09:09:09.090Z');
	});

	test('does not mutate the original date', () => {
		const date = new Date('1970-01-01Z');

		expect(apply(date, 'P1Y').toISOString()).toBe('1971-01-01T00:00:00.000Z');
		expect(date.toISOString()).toBe('1970-01-01T00:00:00.000Z');
	});

	test('throws errors for non-integer values', () => {
		expect(() => apply('1970-01-01Z', { months: 1.5 })).toThrow();
		expect(() => apply('1970-01-01Z', { months: 1 })).not.toThrow();
	});

	test('throws errors for invalid ISO durations', () => {
		expect(() => apply('1970-01-01Z', 'P1H')).toThrow();
		expect(() => apply('1970-01-01Z', 'PT1H')).not.toThrow();
	});
});
