import { ZERO } from './lib/units';
import { negate } from './negate';

describe('negate()', () => {
	test('negates values', () => {
		expect(negate('P1D')).toEqual({ ...ZERO, days: -1 });
		expect(negate('P-1D')).toEqual({ ...ZERO, days: 1 });
		expect(negate({ days: 1, seconds: -2 })).toEqual({ ...ZERO, days: -1, seconds: 2 });
	});

	test('Does not convert `0` to negative `0`', () => {
		expect(negate({})).toEqual(ZERO);
		expect(negate(0)).toEqual(ZERO);
		expect(negate(0).days).toBe(0);
		expect(negate(0).days).not.toBe(-0);
	});

	test('throws errors for non-integer values', () => {
		expect(() => negate({ months: 1.5 })).toThrow();
		expect(() => negate({ months: 1 })).not.toThrow();
	});
});
