import { UNITS, UNITS_META } from './units';

const expectShallowImmutable = (arr: readonly unknown[]) => {
	// Make a copy that is not "readonly" so TypeScript stops complaining.
	const arrNonReadonly = arr as unknown[];
	expect(() => { arrNonReadonly.reverse(); }).toThrow();
	expect(() => { arrNonReadonly[0] = 1; }).toThrow();
};

describe('UNITS', () => {
	test('is shallow immutable', () => {
		expectShallowImmutable(UNITS);
	});
});

describe('UNITS_META', () => {
	test('is shallow immutable', () => {
		expectShallowImmutable(UNITS_META);
	});

	test('every unit either has ISOCharacter information or a value to convert to for stringifying', () => {
		expect(UNITS_META.every(({
			ISOCharacter,
			ISOPrecision,
			stringifyConvertTo,
		}) => !!((ISOCharacter && ISOPrecision) || stringifyConvertTo))).toBe(true);
	});
});
