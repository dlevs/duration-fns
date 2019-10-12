import { isZero } from './isZero';

describe('isZero()', () => {
	test('returns `true` for zero durations', () => {
		expect(isZero('P0D')).toBe(true);
		expect(isZero({ days: 0 })).toBe(true);
		expect(isZero(0)).toBe(true);
		expect(isZero({})).toBe(true);
	});

	test('treats `-0` as `0`', () => {
		expect(isZero('-P0D')).toBe(true);
		expect(isZero('P-0D')).toBe(true);
		expect(isZero({ days: -0 })).toBe(true);
		expect(isZero(-0)).toBe(true);
	});

	test('returns `false` for non-zero durations', () => {
		expect(isZero('P1D')).toBe(false);
		expect(isZero({ milliseconds: 2 })).toBe(false);
		expect(isZero(-3)).toBe(false);
		expect(isZero({ seconds: -1 })).toBe(false);
	});
});
