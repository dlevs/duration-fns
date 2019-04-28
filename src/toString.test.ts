import { DEFAULT_TIME } from './lib/units';
import { toString } from './toString';

describe('normalize()', () => {
	test('normal usage', () => {
		expect(toString('P1Y')).toBe('P1Y');
		expect(toString({ years: 1 })).toBe('P1Y');

		expect(toString('P1Y1M1DT1H1M1S')).toBe('P1Y1M1DT1H1M1S');
		expect(toString({ seconds: 4, milliseconds: 1000 })).toBe('PT5S');
		expect(toString('P6000Y')).toBe('P6000Y');
	});

	test('converts milliseconds and weeks to compatible units', () => {
		expect(toString(4000)).toBe('PT4S');
		expect(toString('P1Y1M1W1DT1H1M1S')).toBe('P1Y1M8DT1H1M1S');
		expect(toString('P1W1D')).toBe('P8D');
	});

	test('does not convert weeks when it is the sole unit', () => {
		expect(toString('P2W')).toBe('P2W');
		expect(toString({ weeks: 6 })).toBe('P6W');
	});

	test('handles negative values', () => {
		expect(toString({ years: -2 })).toBe('P-2Y');
		expect(toString({ years: -2, days: 10 })).toBe('P-2Y10D');
		expect(toString({ years: 1, seconds: -6 })).toBe('P1YT-6S');
	});

	test('represents decimal seconds', () => {
		expect(toString(4500)).toBe('PT4,5S');
	});

	test('can express a duration of "zero"', () => {
		expect(toString(DEFAULT_TIME)).toBe('PT0S');
		expect(toString('P0D')).toBe('PT0S');
	});
});
