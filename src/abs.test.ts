import { DEFAULT_TIME } from './lib/units';
import { abs } from './abs';

describe('abs()', () => {
	test('returns the duration as a net positive value', () => {
		expect(abs({ seconds: 10 })).toEqual({ ...DEFAULT_TIME, seconds: 10 });
		expect(abs({ seconds: -10 })).toEqual({ ...DEFAULT_TIME, seconds: 10 });
		expect(abs({ hours: 2, seconds: -10 })).toEqual({ ...DEFAULT_TIME, hours: 2, seconds: -10 });
		expect(abs({ hours: -2, seconds: 10 })).toEqual({ ...DEFAULT_TIME, hours: 2, seconds: -10 });
	});
});
