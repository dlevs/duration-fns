import {
	toMilliseconds,
	toUnit,
	toSeconds,
	toMinutes,
	toHours,
	toDays,
	toWeeks,
	toMonths,
	toYears,
} from './toUnit';

describe('toMilliseconds()', () => {
	test('converts objects', () => {
		expect(toMilliseconds({ days: 1 })).toBe(86400000);
		expect(toMilliseconds({ days: -1 })).toBe(-86400000);
		expect(toMilliseconds({ days: 1, milliseconds: -1 })).toBe(86399999);
		expect(toMilliseconds({ hours: 1 })).toBe(3600000);
		expect(toMilliseconds({ minutes: 1 })).toBe(60000);
		expect(toMilliseconds({ seconds: 1 })).toBe(1000);
		expect(toMilliseconds({ milliseconds: 1 })).toBe(1);
		expect(toMilliseconds({
			weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1,
		})).toBe(694861001);
	});

	test('converts number of milliseconds', () => {
		expect(toMilliseconds(86400000)).toBe(86400000);
		expect(toMilliseconds(0)).toBe(0);
		expect(toMilliseconds(-20)).toBe(-20);
	});

	test('converts string durations', () => {
		expect(toMilliseconds('PT1M60S')).toBe(120000);
	});

	test('throws errors for non-integer values', () => {
		expect(() => toMilliseconds({ months: 1.5 })).toThrow();
		expect(() => toMilliseconds({ months: 1 })).not.toThrow();
	});
});

describe('toUnit()', () => {
	test('converts objects', () => {
		expect(toUnit({ milliseconds: 1 }, 'milliseconds')).toBe(1);
		expect(toUnit({ seconds: 1 }, 'seconds')).toBe(1);
		expect(toUnit({ minutes: 1 }, 'minutes')).toBe(1);
		expect(toUnit({ hours: 1 }, 'hours')).toBe(1);
		expect(toUnit({ days: 1 }, 'days')).toBe(1);
		expect(toUnit({ weeks: 1 }, 'weeks')).toBe(1);
		expect(toUnit({ months: 1 }, 'months')).toBe(1);
		expect(toUnit({ years: 1 }, 'years')).toBe(1);
	});

	test('converts number of milliseconds', () => {
		expect(toUnit(1, 'milliseconds')).toBe(1);
		expect(toUnit(1 * 1000, 'seconds')).toBe(1);
		expect(toUnit(1 * 1000 * 60, 'minutes')).toBe(1);
		expect(toUnit(1 * 1000 * 60 * 60, 'hours')).toBe(1);
		expect(toUnit(1 * 1000 * 60 * 60 * 24, 'days')).toBe(1);
		expect(toUnit(1 * 1000 * 60 * 60 * 24 * 7, 'weeks')).toBe(1);
		expect(toUnit((1 * 1000 * 60 * 60 * 24 * 365) / 12, 'months')).toBe(1);
		expect(toUnit(1 * 1000 * 60 * 60 * 24 * 365, 'years')).toBe(1);
	});

	test('converts string durations', () => {
		expect(toUnit('PT0.001S', 'milliseconds')).toBe(1);
		expect(toUnit('PT1S', 'seconds')).toBe(1);
		expect(toUnit('PT1M', 'minutes')).toBe(1);
		expect(toUnit('PT1H', 'hours')).toBe(1);
		expect(toUnit('P1D', 'days')).toBe(1);
		expect(toUnit('P1W', 'weeks')).toBe(1);
		expect(toUnit('P1M', 'months')).toBe(1);
		expect(toUnit('P1Y', 'years')).toBe(1);
	});
});

describe('toSeconds()', () => {
	test('converts objects', () => {
		expect(toSeconds({ days: 1 })).toBe(86400);
		expect(toSeconds({ days: -1 })).toBe(-86400);
		expect(toSeconds({ days: 1, milliseconds: -1 })).toBe(86399.999);
		expect(toSeconds({ hours: 1 })).toBe(3600);
		expect(toSeconds({ minutes: 1 })).toBe(60);
		expect(toSeconds({ seconds: 1 })).toBe(1);
		expect(toSeconds({ milliseconds: 1 })).toBe(0.001);
		expect(toSeconds({
			weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1,
		})).toBe(694861.001);
	});

	test('converts number of milliseconds', () => {
		expect(toSeconds(86400000)).toBe(86400);
		expect(toSeconds(0)).toBe(0);
		expect(toSeconds(-20)).toBe(-0.02);
	});

	test('converts string durations', () => {
		expect(toSeconds('PT1M30S')).toBe(90);
	});

	test('throws errors for non-integer values', () => {
		expect(() => toSeconds({ months: 1.5 })).toThrow();
		expect(() => toSeconds({ months: 1 })).not.toThrow();
	});
});

describe('toMinutes()', () => {
	test('converts objects', () => {
		expect(toMinutes({ days: 1 })).toBe(1440);
		expect(toMinutes({ days: -1 })).toBe(-1440);
		expect(toMinutes({ days: 1, minutes: -2 })).toBe(1438);
		expect(toMinutes({ hours: 1 })).toBe(60);
		expect(toMinutes({ minutes: 1 })).toBe(1);
		expect(toMinutes({ seconds: 30 })).toBe(0.5);
		expect(toMinutes({ milliseconds: 60000 })).toBe(1);
		expect(toMinutes({
			weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1,
		})).toBe(11581.016683333333);
	});

	test('converts number of milliseconds', () => {
		expect(toMinutes(86400000)).toBe(1440);
		expect(toMinutes(0)).toBe(0);
		expect(toMinutes(-60000)).toBe(-1);
	});

	test('converts string durations', () => {
		expect(toMinutes('PT6M60S')).toBe(7);
	});

	test('throws errors for non-integer values', () => {
		expect(() => toMinutes({ months: 1.5 })).toThrow();
		expect(() => toMinutes({ months: 1 })).not.toThrow();
	});
});

describe('toHours()', () => {
	test('converts objects', () => {
		expect(toHours({ days: 1 })).toBe(24);
		expect(toHours({ days: -1 })).toBe(-24);
		expect(toHours({ days: 1, hours: -2 })).toBe(22);
		expect(toHours({ hours: 1 })).toBe(1);
		expect(toHours({ minutes: 30 })).toBe(0.5);
		expect(toHours({ seconds: 30 * 60 })).toBe(0.5);
		expect(toHours({ milliseconds: 3600000 })).toBe(1);
		expect(toHours({
			weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1,
		})).toBe(193.01694472222223);
	});

	test('converts number of milliseconds', () => {
		expect(toHours(86400000)).toBe(24);
		expect(toHours(0)).toBe(0);
		expect(toHours(-86400000)).toBe(-24);
	});

	test('converts string durations', () => {
		expect(toHours('PT1H90M')).toBe(2.5);
	});

	test('throws errors for non-integer values', () => {
		expect(() => toHours({ months: 1.5 })).toThrow();
		expect(() => toHours({ months: 1 })).not.toThrow();
	});
});

describe('toDays()', () => {
	test('converts objects', () => {
		expect(toDays({ days: 1 })).toBe(1);
		expect(toDays({ days: -1 })).toBe(-1);
		expect(toDays({ days: 1, hours: -12 })).toBe(0.5);
		expect(toDays({ hours: 12 })).toBe(0.5);
		expect(toDays({ minutes: 60 * 12 })).toBe(0.5);
		expect(toDays({ seconds: 60 * 60 * 12 })).toBe(0.5);
		expect(toDays({ milliseconds: 60 * 60 * 24 * 1000 })).toBe(1);
		expect(toDays({
			weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1,
		})).toBe(8.042372696759259);
	});

	test('converts number of milliseconds', () => {
		expect(toDays(86400000)).toBe(1);
		expect(toDays(0)).toBe(0);
		expect(toDays(-86400000)).toBe(-1);
	});

	test('converts string durations', () => {
		expect(toDays('P1WT12H')).toBe(7.5);
	});

	test('throws errors for non-integer values', () => {
		expect(() => toDays({ months: 1.5 })).toThrow();
		expect(() => toDays({ months: 1 })).not.toThrow();
	});
});

describe('toWeeks()', () => {
	test('converts objects', () => {
		expect(toWeeks({ weeks: 1 })).toBe(1);
		expect(toWeeks({ weeks: 1, days: 7 })).toBe(2);
		expect(toWeeks({ days: -7 })).toBe(-1);
		expect(toWeeks({
			weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1,
		})).toBe(1.1489103852513227);
	});

	test('converts number of milliseconds', () => {
		expect(toWeeks(86400000 * 7)).toBe(1);
		expect(toWeeks(0)).toBe(0);
		expect(toWeeks(-86400000 * 7)).toBe(-1);
	});

	test('converts string durations', () => {
		expect(toWeeks('P2W7D')).toBe(3);
	});

	test('throws errors for non-integer values', () => {
		expect(() => toWeeks({ months: 1.5 })).toThrow();
		expect(() => toWeeks({ months: 1 })).not.toThrow();
	});
});

describe('toMonths()', () => {
	test('converts objects', () => {
		expect(toMonths({ years: 1 })).toBe(12);
		expect(toMonths({ years: -2 })).toBe(-24);
		expect(toMonths({ years: 1, days: -365 })).toBe(0);
		expect(toMonths({
			years: 1, months: 1, weeks: 1, days: 1, hours: 1, minutes: 1, milliseconds: 1,
		})).toBe(13.264406393074582);
	});

	test('converts number of milliseconds', () => {
		expect(toMonths(31536000000)).toBe(12);
		expect(toMonths(0)).toBe(0);
		expect(toMonths(-31536000000)).toBe(-12);
	});

	test('converts string durations', () => {
		expect(toMonths('P2Y12M')).toBe(36);
	});

	test('throws errors for non-integer values', () => {
		expect(() => toMonths({ months: 1.5 })).toThrow();
		expect(() => toMonths({ months: 1 })).not.toThrow();
	});
});

describe('toYears()', () => {
	test('converts objects', () => {
		expect(toYears({ days: 365 })).toBe(1);
		expect(toYears({ days: -365 })).toBe(-1);
		expect(toYears({ years: 1, days: -365 })).toBe(0);
		expect(toYears({ years: 1, months: 6 })).toBe(1.5);
		expect(toYears({
			years: 1, months: 1, weeks: 1, days: 1, hours: 1, minutes: 1, milliseconds: 1,
		})).toBe(1.1053671994228818);
	});

	test('converts number of milliseconds', () => {
		expect(toYears(31536000000)).toBe(1);
		expect(toYears(0)).toBe(0);
		expect(toYears(-31536000000)).toBe(-1);
	});

	test('converts string durations', () => {
		expect(toYears('P2Y12M')).toBe(3);
	});

	test('throws errors for non-integer values', () => {
		expect(() => toYears({ months: 1.5 })).toThrow();
		expect(() => toYears({ months: 1 })).not.toThrow();
	});
});
