import toYears from './toYears';

describe('toYears()', () => {
	test('converts objects', () => {
		expect(toYears({ days: 365 })).toBe(1);
		expect(toYears({ days: -365 })).toBe(-1);
		expect(toYears({ years: 1, days: -365 })).toBe(0);
		expect(toYears({ years: 1, months: 1, weeks: 1, days: 1, hours: 1, minutes: 1, milliseconds: 1 })).toBe(1.1053671994228818);
	});

	test('converts number of milliseconds', () => {
		expect(toYears(31536000000)).toBe(1);
		expect(toYears(0)).toBe(0);
		expect(toYears(-31536000000)).toBe(-1);
	});
});
