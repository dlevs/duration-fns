import { ZERO } from './lib/units';
import { abs } from './abs';

describe('abs()', () => {
	test('returns the duration as a net positive value', () => {
		expect(abs({ seconds: 10 })).toEqual({ ...ZERO, seconds: 10 });
		expect(abs({ seconds: -10 })).toEqual({ ...ZERO, seconds: 10 });
		expect(abs({ hours: 2, seconds: -10 })).toEqual({ ...ZERO, hours: 2, seconds: -10 });
		expect(abs({ hours: -2, seconds: 10 })).toEqual({ ...ZERO, hours: 2, seconds: -10 });
	});

	test('throws errors for non-integer values', () => {
		expect(() => abs({ months: 1.5 })).toThrow();
		expect(() => abs({ months: 1 })).not.toThrow();
	});
});
