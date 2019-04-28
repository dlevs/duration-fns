import {
	toMilliseconds,
	toSeconds,
	toMinutes,
	toHours,
	toDays,
	toWeeks,
	toMonths,
	toYears,
} from './toUnit';
import { UNITS_MAP } from './lib/units';

describe('toMilliseconds()', () => {
	test('converts objects', () => {
		expect(toMilliseconds({ days: 1 })).toBe(86400000);
		expect(toMilliseconds({ days: -1 })).toBe(-86400000);
		expect(toMilliseconds({ days: 1, milliseconds: -1 })).toBe(86399999);
		expect(toMilliseconds({ hours: 1 })).toBe(3600000);
		expect(toMilliseconds({ minutes: 1 })).toBe(60000);
		expect(toMilliseconds({ seconds: 1 })).toBe(1000);
		expect(toMilliseconds({ milliseconds: 1 })).toBe(1);
		expect(toMilliseconds({ weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1 })).toBe(694861001);
	});

	test('converts number of milliseconds', () => {
		expect(toMilliseconds(86400000)).toBe(86400000);
		expect(toMilliseconds(0)).toBe(0);
		expect(toMilliseconds(-20)).toBe(-20);
	});

	test('converts string durations', () => {
		expect(toMilliseconds('PT1M60S')).toBe(120000);
	});

	test('takes into account reference time when provided', () => {
		expect(toMilliseconds('P1M') / UNITS_MAP.days.milliseconds).toBe(30.416666666666668);
		expect(toMilliseconds('P1M', '2016-02-01T00:00:00.000Z') / UNITS_MAP.days.milliseconds).toBe(29);
		expect(toMilliseconds('P1M', '2018-02-01T00:00:00.000Z') / UNITS_MAP.days.milliseconds).toBe(28);
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
		expect(toSeconds({ weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1 })).toBe(694861.001);
	});

	test('converts number of milliseconds', () => {
		expect(toSeconds(86400000)).toBe(86400);
		expect(toSeconds(0)).toBe(0);
		expect(toSeconds(-20)).toBe(-0.02);
	});

	test('converts string durations', () => {
		expect(toSeconds('PT1M30S')).toBe(90);
	});

	test('takes into account reference time when provided', () => {
		expect((toSeconds('P1M') / UNITS_MAP.days.milliseconds) * UNITS_MAP.seconds.milliseconds).toBe(30.416666666666668);
		expect((toSeconds('P1M', '2016-02-01T00:00:00.000Z') / UNITS_MAP.days.milliseconds) * UNITS_MAP.seconds.milliseconds).toBe(29);
		expect((toSeconds('P1M', '2018-02-01T00:00:00.000Z') / UNITS_MAP.days.milliseconds) * UNITS_MAP.seconds.milliseconds).toBe(28);
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
		expect(toMinutes({ weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1 })).toBe(11581.016683333333);
	});

	test('converts number of milliseconds', () => {
		expect(toMinutes(86400000)).toBe(1440);
		expect(toMinutes(0)).toBe(0);
		expect(toMinutes(-60000)).toBe(-1);
	});

	test('converts string durations', () => {
		expect(toMinutes('PT6M60S')).toBe(7);
	});

	test('takes into account reference time when provided', () => {
		expect((toMinutes('P1M') / UNITS_MAP.days.milliseconds) * UNITS_MAP.minutes.milliseconds).toBe(30.416666666666664);
		expect((toMinutes('P1M', '2016-02-01T00:00:00.000Z') / UNITS_MAP.days.milliseconds) * UNITS_MAP.minutes.milliseconds).toBe(29);
		expect((toMinutes('P1M', '2018-02-01T00:00:00.000Z') / UNITS_MAP.days.milliseconds) * UNITS_MAP.minutes.milliseconds).toBe(28);
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
		expect(toHours({ weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1 })).toBe(193.01694472222223);
	});

	test('converts number of milliseconds', () => {
		expect(toHours(86400000)).toBe(24);
		expect(toHours(0)).toBe(0);
		expect(toHours(-86400000)).toBe(-24);
	});

	test('converts string durations', () => {
		expect(toHours('PT1H90M')).toBe(2.5);
	});

	test('takes into account reference time when provided', () => {
		expect((toHours('P1M') / UNITS_MAP.days.milliseconds) * UNITS_MAP.hours.milliseconds).toBe(30.416666666666664);
		expect((toHours('P1M', '2016-02-01T00:00:00.000Z') / UNITS_MAP.days.milliseconds) * UNITS_MAP.hours.milliseconds).toBe(29);
		expect((toHours('P1M', '2018-02-01T00:00:00.000Z') / UNITS_MAP.days.milliseconds) * UNITS_MAP.hours.milliseconds).toBe(28);
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
		expect(toDays({ weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1 })).toBe(8.042372696759259);
	});

	test('converts number of milliseconds', () => {
		expect(toDays(86400000)).toBe(1);
		expect(toDays(0)).toBe(0);
		expect(toDays(-86400000)).toBe(-1);
	});

	test('converts string durations', () => {
		expect(toDays('P1WT12H')).toBe(7.5);
	});

	test('takes into account reference time when provided', () => {
		expect(toDays('P1M')).toBe(30.416666666666668);
		expect(toDays('P1M', '2016-02-01T00:00:00.000Z')).toBe(29);
		expect(toDays('P1M', '2018-02-01T00:00:00.000Z')).toBe(28);
	});
});

describe('toWeeks()', () => {
	test('converts objects', () => {
		expect(toWeeks({ weeks: 1 })).toBe(1);
		expect(toWeeks({ weeks: 1, days: 7 })).toBe(2);
		expect(toWeeks({ days: -7 })).toBe(-1);
		expect(toWeeks({ weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1 })).toBe(1.1489103852513227);
	});

	test('converts number of milliseconds', () => {
		expect(toWeeks(86400000 * 7)).toBe(1);
		expect(toWeeks(0)).toBe(0);
		expect(toWeeks(-86400000 * 7)).toBe(-1);
	});

	test('converts string durations', () => {
		expect(toWeeks('P2W7D')).toBe(3);
	});

	test('takes into account reference time when provided', () => {
		expect((toWeeks('P1M') / UNITS_MAP.days.milliseconds) * UNITS_MAP.weeks.milliseconds).toBe(30.416666666666664);
		expect((toWeeks('P1M', '2016-02-01T00:00:00.000Z') / UNITS_MAP.days.milliseconds) * UNITS_MAP.weeks.milliseconds).toBe(29.000000000000004);
		expect((toWeeks('P1M', '2018-02-01T00:00:00.000Z') / UNITS_MAP.days.milliseconds) * UNITS_MAP.weeks.milliseconds).toBe(28);
	});
});

describe('toMonths()', () => {
	test('converts objects', () => {
		expect(toMonths({ years: 1 })).toBe(12);
		expect(toMonths({ years: -2 })).toBe(-24);
		expect(toMonths({ years: 1, days: -365 })).toBe(0);
		expect(toMonths({ years: 1, months: 1, weeks: 1, days: 1, hours: 1, minutes: 1, milliseconds: 1 })).toBe(13.264406393074582);
	});

	test('converts number of milliseconds', () => {
		expect(toMonths(31536000000)).toBe(12);
		expect(toMonths(0)).toBe(0);
		expect(toMonths(-31536000000)).toBe(-12);
	});

	test('converts string durations', () => {
		expect(toMonths('P2Y12M')).toBe(36);
	});

	test('takes into account reference time when provided', () => {
		expect((toMonths('P1M') / UNITS_MAP.days.milliseconds) * UNITS_MAP.months.milliseconds).toBe(30.416666666666668);
		expect((toMonths('P1M', '2016-02-01T00:00:00.000Z') / UNITS_MAP.days.milliseconds) * UNITS_MAP.months.milliseconds).toBe(29);
		expect((toMonths('P1M', '2018-02-01T00:00:00.000Z') / UNITS_MAP.days.milliseconds) * UNITS_MAP.months.milliseconds).toBe(28);
	});
});

describe('toYears()', () => {
	test('converts objects', () => {
		expect(toYears({ days: 365 })).toBe(1);
		expect(toYears({ days: -365 })).toBe(-1);
		expect(toYears({ years: 1, days: -365 })).toBe(0);
		expect(toYears({ years: 1, months: 1, weeks: 1, days: 1, hours: 1, minutes: 1, milliseconds: 1 })).toBe(1.1053671994228818);
	});

	test('converts number of milliseconds', () => {
		expect(toYears(31536000000)).toBe(1);
		expect(toYears(0)).toBe(0);
		expect(toYears(-31536000000)).toBe(-1);
	});

	test('converts string durations', () => {
		expect(toYears('P2Y12M')).toBe(3);
	});

	test('takes into account reference time when provided', () => {
		expect((toYears('P1M') / UNITS_MAP.days.milliseconds) * UNITS_MAP.years.milliseconds).toBe(30.41666666666666);
		expect((toYears('P1M', '2016-02-01T00:00:00.000Z') / UNITS_MAP.days.milliseconds) * UNITS_MAP.years.milliseconds).toBe(29.000000000000004);
		expect((toYears('P1M', '2018-02-01T00:00:00.000Z') / UNITS_MAP.days.milliseconds) * UNITS_MAP.years.milliseconds).toBe(28.000000000000004);
	});
});
