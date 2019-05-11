import { floorTowardsZero, isNegativeZero, isNegativelySigned } from './numberUtils';

describe('floorTowardsZero()', () => {
	test('rounds positive numbers towards 0', () => {
		expect(floorTowardsZero(1.1)).toBe(1);
		expect(floorTowardsZero(1.9)).toBe(1);
		expect(floorTowardsZero(0.999999)).toBe(0);
	});

	test('rounds negative numbers up to 0', () => {
		expect(floorTowardsZero(-1.1)).toBe(-1);
		expect(floorTowardsZero(-1.9)).toBe(-1);
		expect(floorTowardsZero(0.999999)).toBe(0);
	});

	test('never returns negative 0', () => {
		// Illustrate issue
		expect(Math.ceil(-0.2)).toBe(-0);
		expect(Math.ceil(-0.2)).not.toBe(0);
		// Check function avoids this issue
		expect(floorTowardsZero(-0.2)).toBe(0);
		expect(floorTowardsZero(-0.2)).not.toBe(-0);
	});
});

describe('isNegativeZero()', () => {
	test('correctly identifies -0', () => {
		expect(isNegativeZero(-0)).toBe(true);
		expect(isNegativeZero(0)).toBe(false);
		expect(isNegativeZero(1.1)).toBe(false);
		expect(isNegativeZero(10)).toBe(false);
		expect(isNegativeZero(0)).toBe(false);
		expect(isNegativeZero(-100)).toBe(false);
		expect(isNegativeZero(-10.4)).toBe(false);
	});
});

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
