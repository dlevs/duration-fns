import { getUnitCount } from './getUnitCount';

describe('getUnitCount()', () => {
	test('returns the count of units that are not zero', () => {
		expect(getUnitCount({ milliseconds: 10, seconds: 0 })).toBe(1);
		expect(getUnitCount({})).toBe(0);
		expect(getUnitCount(0)).toBe(0);
		expect(getUnitCount(2200)).toBe(1);
		expect(getUnitCount('P2Y1DT6S')).toBe(3);
	});
});
