import { getDaysInMonth, addMonths } from './dateUtils';

describe('getDaysInMonth()', () => {
	test('returns the correct number of days in the month for a given date', () => {
		expect(getDaysInMonth(new Date('1970-01-01Z'))).toBe(31);
		expect(getDaysInMonth(new Date('1970-02-01Z'))).toBe(28);
		expect(getDaysInMonth(new Date('1970-03-01Z'))).toBe(31);
		expect(getDaysInMonth(new Date('1970-04-01Z'))).toBe(30);
		expect(getDaysInMonth(new Date('1970-05-01Z'))).toBe(31);
		expect(getDaysInMonth(new Date('1970-06-01Z'))).toBe(30);
		expect(getDaysInMonth(new Date('1970-07-01Z'))).toBe(31);
		expect(getDaysInMonth(new Date('1970-08-01Z'))).toBe(31);
		expect(getDaysInMonth(new Date('1970-09-01Z'))).toBe(30);
		expect(getDaysInMonth(new Date('1970-10-01Z'))).toBe(31);
		expect(getDaysInMonth(new Date('1970-11-01Z'))).toBe(30);
		expect(getDaysInMonth(new Date('1970-12-01Z'))).toBe(31);
	});

	test('handles leap years', () => {
		// Non-leap years
		expect(getDaysInMonth(new Date('1970-02-01Z'))).toBe(28);
		expect(getDaysInMonth(new Date('1971-02-01Z'))).toBe(28);

		// Leap years
		expect(getDaysInMonth(new Date('1972-02-01Z'))).toBe(29);
		expect(getDaysInMonth(new Date('1976-02-01Z'))).toBe(29);
	});

	test('Works for different days of the month', () => {
		expect(getDaysInMonth(new Date('1970-04-01Z'))).toBe(30);
		expect(getDaysInMonth(new Date('1970-04-10Z'))).toBe(30);
		expect(getDaysInMonth(new Date('1970-04-18Z'))).toBe(30);
		expect(getDaysInMonth(new Date('1970-04-30Z'))).toBe(30);
	});
});

describe('addMonths()', () => {
	test('adds a month to the current date', () => {
		const date1 = new Date('1970-01-01Z');
		const date2 = new Date('1970-01-15Z');
		const date3 = new Date('1970-01-22Z');
		const date4 = new Date('1970-01-28Z');

		addMonths(date1, 1);
		addMonths(date2, 2);
		addMonths(date3, 12);
		addMonths(date4, 24);

		expect(date1.toISOString()).toBe('1970-02-01T00:00:00.000Z');
		expect(date2.toISOString()).toBe('1970-03-15T00:00:00.000Z');
		expect(date3.toISOString()).toBe('1971-01-22T00:00:00.000Z');
		expect(date4.toISOString()).toBe('1972-01-28T00:00:00.000Z');
	});

	test('handles end-of-month edge case', () => {
		const dateUsingFn = new Date('1970-01-31Z');
		const dateUsingNaive = new Date('1970-01-31Z');

		// The issue - adding a month to a date in January can lead to a result in March.
		dateUsingNaive.setMonth(dateUsingNaive.getMonth() + 1);
		expect(dateUsingNaive.toISOString()).toBe('1970-03-03T00:00:00.000Z');

		// Using `addMonths` prevents dates from overflowing into the month after
		// the expected result when the next month has fewer days than the current.
		addMonths(dateUsingFn, 1);
		expect(dateUsingFn.toISOString()).toBe('1970-02-28T00:00:00.000Z');
	});
});
