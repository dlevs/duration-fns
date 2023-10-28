import { validate } from './validate';
import { ZERO } from '../lib/units';

describe('validate()', () => {
	test('catches unexpected units', () => {
		// Sanity check. No error should be thrown for expected properties.
		expect(() => validate({ ...ZERO, days: 1 })).not.toThrow();

		// @ts-expect-error Deliberate error case for tests
		expect(() => validate({ ...ZERO, deys: 1 })).toThrow('Unexpected property "deys" on Duration object.');
	});

	test('catches non-integer values', () => {
		// @ts-expect-error Deliberate error case for tests
		expect(() => validate({ days: '1' })).toThrow('Property "days" must be a an integer. Received 1.');
	});
});
