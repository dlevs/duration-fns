import { isNegativelySigned } from './numberUtils';

describe('isNegativelySigned()', () => {
	test('correctly identifies minus numbers', () => {
		expect(isNegativelySigned(-0)).toBe(true);
		expect(isNegativelySigned(0)).toBe(false);
		expect(isNegativelySigned(1.1)).toBe(false);
		expect(isNegativelySigned(10)).toBe(false);
		expect(isNegativelySigned(0)).toBe(false);
		expect(isNegativelySigned(-100)).toBe(true);
		expect(isNegativelySigned(-10.4)).toBe(true);
	});
});
