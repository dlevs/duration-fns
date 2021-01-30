import { UNITS_LARGE_TO_SMALL, UNITS_META_LARGE_TO_SMALL } from './units';

const expectShallowImmutable = (arr: readonly unknown[]) => {
	// Make a copy that is not "readonly" so TypeScript stops complaining.
	const arrNonReadonly = arr as unknown[];
	expect(() => { arrNonReadonly.reverse(); }).toThrow();
	expect(() => { arrNonReadonly[0] = 1; }).toThrow();
};

describe('UNITS_LARGE_TO_SMALL', () => {
	test('is shallow immutable', () => {
		expectShallowImmutable(UNITS_LARGE_TO_SMALL);
	});
});

describe('UNITS_META_LARGE_TO_SMALL', () => {
	test('is shallow immutable', () => {
		expectShallowImmutable(UNITS_META_LARGE_TO_SMALL);
	});

	test('every unit either has ISOCharacter information or a value to convert to for stringifying', () => {
		expect(UNITS_META_LARGE_TO_SMALL.every(({
			ISOCharacter,
			ISOPrecision,
			stringifyConvertTo,
		}) => !!((ISOCharacter && ISOPrecision) || stringifyConvertTo))).toBe(true);
	});
});
