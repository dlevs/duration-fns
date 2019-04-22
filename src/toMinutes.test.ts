import toMinutes from './toMinutes';

describe('toMinutes()', () => {
	test('converts objects', () => {
		expect(toMinutes({ days: 1 })).toBe(1440);
		expect(toMinutes({ days: -1 })).toBe(-1440);
		expect(toMinutes({ days: 1, minutes: -2 })).toBe(1438);
		expect(toMinutes({ hours: 1 })).toBe(60);
		expect(toMinutes({ minutes: 1 })).toBe(1);
		expect(toMinutes({ seconds: 30 })).toBe(0.5);
		expect(toMinutes({ milliseconds: 60000 })).toBe(1);
		expect(toMinutes({ weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1 })).toBe(11581.016683333333);
	});

	test('converts number of milliseconds', () => {
		expect(toMinutes(86400000)).toBe(1440);
		expect(toMinutes(0)).toBe(0);
		expect(toMinutes(-60000)).toBe(-1);
	});
});
