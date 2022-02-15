import { checkAllUnitsNegative } from './checkAllUnitsNegative';
import { ZERO } from './units';

describe('checkAllUnitsNegative()', () => {
	test('correctly identifies and flips "all negative" values', () => {
		expect(checkAllUnitsNegative({
			hours: -6,
			minutes: -2,
		})).toEqual({
			isAllNegative: true,
			maybeAbsDuration: { ...ZERO, hours: 6, minutes: 2 },
		});

		expect(checkAllUnitsNegative({
			hours: -6,
			minutes: -2,
			seconds: 0,
		})).toEqual({
			isAllNegative: true,
			maybeAbsDuration: { ...ZERO, hours: 6, minutes: 2 },
		});
	});

	test('correctly identifies and leaves alone non "all negative" values', () => {
		expect(checkAllUnitsNegative({
			hours: -6,
			minutes: -2,
			seconds: 1,
		})).toEqual({
			isAllNegative: false,
			maybeAbsDuration: { ...ZERO, hours: -6, minutes: -2, seconds: 1 },
		});

		expect(checkAllUnitsNegative(ZERO)).toEqual({
			isAllNegative: false,
			maybeAbsDuration: ZERO,
		});
	});
});
