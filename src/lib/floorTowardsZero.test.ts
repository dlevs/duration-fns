import { floorTowardsZero } from './floorTowardsZero';

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
