import { isNegative } from './isNegative';

describe('isNegative()', () => {
	test('returns `true` for negative durations', () => {
		expect(isNegative('P-1D')).toBe(true);
		expect(isNegative({ days: 1, hours: -25 })).toBe(true);
		expect(isNegative({ seconds: 1, milliseconds: -2000 })).toBe(true);
	});

	test('returns `false` for positive durations', () => {
		expect(isNegative('P1D')).toBe(false);
		expect(isNegative({ days: 1, hours: -23 })).toBe(false);
		expect(isNegative({ hours: 1, seconds: 1, milliseconds: -2000 })).toBe(false);
	});
});
