import toSeconds from './toSeconds';

describe('toSeconds()', () => {
	test('converts objects', () => {
		expect(toSeconds({ days: 1 })).toBe(86400);
		expect(toSeconds({ days: -1 })).toBe(-86400);
		expect(toSeconds({ days: 1, milliseconds: -1 })).toBe(86399.999);
		expect(toSeconds({ hours: 1 })).toBe(3600);
		expect(toSeconds({ minutes: 1 })).toBe(60);
		expect(toSeconds({ seconds: 1 })).toBe(1);
		expect(toSeconds({ milliseconds: 1 })).toBe(0.001);
		expect(toSeconds({ weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1 })).toBe(694861.001);
	});

	test('converts number of milliseconds', () => {
		expect(toSeconds(86400000)).toBe(86400);
		expect(toSeconds(0)).toBe(0);
		expect(toSeconds(-20)).toBe(-0.02);
	});
});
