import toMonths from './toMonths';

describe('toMonths()', () => {
	test('converts objects', () => {
		expect(toMonths({ years: 1 })).toBe(12);
		expect(toMonths({ years: -2 })).toBe(-24);
		expect(toMonths({ years: 1, days: -365 })).toBe(0);
		expect(toMonths({ years: 1, months: 1, weeks: 1, days: 1, hours: 1, minutes: 1, milliseconds: 1 })).toBe(13.264406393074582);
	});

	test('converts number of milliseconds', () => {
		expect(toMonths(31536000000)).toBe(12);
		expect(toMonths(0)).toBe(0);
		expect(toMonths(-31536000000)).toBe(-12);
	});

	test('converts string durations', () => {
		expect(toMonths('P2Y12M')).toBe(36);
	});
});
