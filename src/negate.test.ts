import { DEFAULT_TIME } from './lib/units';
import { negate } from './negate';

describe('negate()', () => {
	test('negates values', () => {
		expect(negate('P1D')).toEqual({ ...DEFAULT_TIME, days: -1 });
		expect(negate('P-1D')).toEqual({ ...DEFAULT_TIME, days: 1 });
		expect(negate({ days: 1, seconds: -2 })).toEqual({ ...DEFAULT_TIME, days: -1, seconds: 2 });
	});

	test('Does not convert `0` to negative `0`', () => {
		expect(negate({})).toEqual(DEFAULT_TIME);
		expect(negate(0)).toEqual(DEFAULT_TIME);
		expect(negate(0).days).toBe(0);
		expect(negate(0).days).not.toBe(-0);
	});
});
