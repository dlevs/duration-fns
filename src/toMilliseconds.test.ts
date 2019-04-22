import toMilliseconds from './toMilliseconds';

describe('toMilliseconds()', () => {
	test('converts objects', () => {
		expect(toMilliseconds({ days: 1 })).toBe(86400000);
		expect(toMilliseconds({ days: -1 })).toBe(-86400000);
		expect(toMilliseconds({ days: 1, milliseconds: -1 })).toBe(86399999);
		expect(toMilliseconds({ hours: 1 })).toBe(3600000);
		expect(toMilliseconds({ minutes: 1 })).toBe(60000);
		expect(toMilliseconds({ seconds: 1 })).toBe(1000);
		expect(toMilliseconds({ milliseconds: 1 })).toBe(1);
		expect(toMilliseconds({ weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1 })).toBe(694861001);
	});

	test('converts number of milliseconds', () => {
		expect(toMilliseconds(86400000)).toBe(86400000);
		expect(toMilliseconds(0)).toBe(0);
		expect(toMilliseconds(-20)).toBe(-20);
	});
});
