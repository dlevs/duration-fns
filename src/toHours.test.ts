import toHours from './toHours';

describe('toHours()', () => {
	test('converts objects', () => {
		expect(toHours({ days: 1 })).toBe(24);
		expect(toHours({ days: -1 })).toBe(-24);
		expect(toHours({ days: 1, hours: -2 })).toBe(22);
		expect(toHours({ hours: 1 })).toBe(1);
		expect(toHours({ minutes: 30 })).toBe(0.5);
		expect(toHours({ seconds: 30 * 60 })).toBe(0.5);
		expect(toHours({ milliseconds: 3600000 })).toBe(1);
		expect(toHours({ weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1 })).toBe(193.01694472222223);
	});

	test('converts number of milliseconds', () => {
		expect(toHours(86400000)).toBe(24);
		expect(toHours(0)).toBe(0);
		expect(toHours(-86400000)).toBe(-24);
	});

	test('converts string durations', () => {
		expect(toHours('PT1H90M')).toBe(2.5);
	});
});
