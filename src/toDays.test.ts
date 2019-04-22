import toDays from './toDays';

describe('toDays()', () => {
	test('converts objects', () => {
		expect(toDays({ days: 1 })).toBe(1);
		expect(toDays({ days: -1 })).toBe(-1);
		expect(toDays({ days: 1, hours: -12 })).toBe(0.5);
		expect(toDays({ hours: 12 })).toBe(0.5);
		expect(toDays({ minutes: 60 * 12 })).toBe(0.5);
		expect(toDays({ seconds: 60 * 60 * 12 })).toBe(0.5);
		expect(toDays({ milliseconds: 60 * 60 * 24 * 1000 })).toBe(1);
		expect(toDays({ weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1 })).toBe(8.042372696759259);
	});

	test('converts number of milliseconds', () => {
		expect(toDays(86400000)).toBe(1);
		expect(toDays(0)).toBe(0);
		expect(toDays(-86400000)).toBe(-1);
	});
});
