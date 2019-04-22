import toWeeks from './toWeeks';

describe('toWeeks()', () => {
	test('converts objects', () => {
		expect(toWeeks({ weeks: 1 })).toBe(1);
		expect(toWeeks({ weeks: 1, days: 7 })).toBe(2);
		expect(toWeeks({ days: -7 })).toBe(-1);
		expect(toWeeks({ weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1 })).toBe(1.1489103852513227);
	});

	test('converts number of milliseconds', () => {
		expect(toWeeks(86400000 * 7)).toBe(1);
		expect(toWeeks(0)).toBe(0);
		expect(toWeeks(-86400000 * 7)).toBe(-1);
	});

	test('converts string durations', () => {
		expect(toWeeks('P2W7D')).toBe(3);
	});
});
