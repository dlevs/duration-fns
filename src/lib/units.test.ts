import { UNITS } from './units';

describe('UNITS', () => {
	test('every unit either has ISOCharacter information or a value to convert to for stringifying', () => {
		expect(UNITS.every(({
			ISOCharacter,
			ISOPrecision,
			stringifyConvertTo,
		}) => (ISOCharacter && ISOPrecision) || stringifyConvertTo)).toBe(true);
	});
});
