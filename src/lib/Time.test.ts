'use strict';

import * as deepFreeze from 'deep-freeze';
import Time, { floorTowardsZero, convertToMilliseconds } from '..';

const ONE_OF_EACH = deepFreeze({
	days: 1,
	hours: 1,
	minutes: 1,
	seconds: 1,
	milliseconds: 1,
});

describe('class Time', () => {
	test('.constructor()', () => {
		const time = new Time();
		expect(time).toBeInstanceOf(Time);
		expect(time.milliseconds).toBe(0);
	});

	test('.constructor(TimeObject)', () => {
		const time = new Time({ milliseconds: 1000 });
		expect(time).toBeInstanceOf(Time);
		expect(time.milliseconds).toBe(1000);
	});

	test('.toMilliseconds()', () => {
		expect(new Time({ days: 1 }).toMilliseconds()).toBe(86400000);
		expect(new Time({ days: -1 }).toMilliseconds()).toBe(-86400000);
		expect(new Time({ days: 1, milliseconds: -1 }).toMilliseconds()).toBe(86399999);
		expect(new Time({ hours: 1 }).toMilliseconds()).toBe(3600000);
		expect(new Time({ minutes: 1 }).toMilliseconds()).toBe(60000);
		expect(new Time({ seconds: 1 }).toMilliseconds()).toBe(1000);
		expect(new Time({ milliseconds: 1 }).toMilliseconds()).toBe(1);
		expect(new Time(ONE_OF_EACH).toMilliseconds()).toBe(90061001);
	});

	test('.toSeconds()', () => {
		expect(new Time({ minutes: 1 }).toSeconds()).toBe(60);
		expect(new Time(ONE_OF_EACH).toSeconds()).toBe(90061.001);
	});

	test('.toMinutes()', () => {
		expect(new Time({ hours: 1 }).toMinutes()).toBe(60);
		expect(new Time(ONE_OF_EACH).toMinutes()).toBe(1501.0166833333333);
	});

	test('.toHours()', () => {
		expect(new Time({ days: 1 }).toHours()).toBe(24);
		expect(new Time(ONE_OF_EACH).toHours()).toBe(25.016944722222224);
	});

	test('.toDays()', () => {
		expect(new Time({ hours: 12 }).toDays()).toBe(0.5);
		expect(new Time(ONE_OF_EACH).toDays()).toBe(1.0423726967592593);
	});

	test('.multiply(Number)', () => {
		const time = new Time({ hours: 10 });

		expect(time.multiply(3).toHours()).toBe(30);
		expect(time.toHours()).toBe(10);
	});

	test('.divide(Number)', () => {
		const time = new Time({ hours: 30 });

		expect(time.divide(3).toHours()).toBe(10);
		expect(time.toHours()).toBe(30);
	});

	test('.add(TimeObject)', () => {
		const time = new Time({ milliseconds: 10 });

		expect(time.add({ seconds: 6, milliseconds: 20 }).toMilliseconds()).toBe(6030);
		expect(time.toMilliseconds()).toBe(10);
	});

	test('.add(Time)', () => {
		const time = new Time({ milliseconds: 10 });

		expect(time.add(time).toMilliseconds()).toBe(20);
		expect(time.toMilliseconds()).toBe(10);
	});

	test('.subtract(TimeObject)', () => {
		const time = new Time({ milliseconds: 10 });

		expect(time.subtract({ seconds: -6, milliseconds: 20 }).toMilliseconds()).toBe(5990);
		expect(time.toMilliseconds()).toBe(10);
	});

	test('.normalizeTime()', () => {
		expect(new Time(ONE_OF_EACH).normalizeTime()).not.toBe(ONE_OF_EACH);
		expect(new Time(ONE_OF_EACH).normalizeTime()).toMatchObject(ONE_OF_EACH);
		expect(new Time({ seconds: 1 }).normalizeTime()).toMatchObject({
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 1,
			milliseconds: 0,
		});
		expect(new Time({
			days: 5,
			hours: -4,
		}).normalizeTime()).toMatchObject({
			days: 4,
			hours: 20,
			minutes: 0,
			seconds: 0,
			milliseconds: 0,
		});
		expect(new Time({
			days: 100,
			hours: 100,
			minutes: 100,
			seconds: 100,
			milliseconds: 100,
		}).normalizeTime()).toMatchObject({
			days: 104,
			hours: 5,
			minutes: 41,
			seconds: 40,
			milliseconds: 100,
		});
		expect(new Time({ days: 1.5, hours: 2 }).normalizeTime()).toMatchObject({
			days: 1,
			hours: 14,
			minutes: 0,
			seconds: 0,
			milliseconds: 0,
		});
		expect(new Time({ days: -1, milliseconds: 1 }).normalizeTime()).toMatchObject({
			days: 0,
			hours: -23,
			minutes: -59,
			seconds: -59,
			milliseconds: -999,
		});
	});

	test('.toJSON()', () => {
		expect(JSON.stringify(
			new Time({ milliseconds: 1 })),
		).toBe(
			'{"days":0,"hours":0,"minutes":0,"seconds":0,"milliseconds":1}',
		);
		expect(
			JSON.stringify(new Time({ days: 2.5, seconds: 1 })),
		).toBe(
			'{"days":2,"hours":12,"minutes":0,"seconds":1,"milliseconds":0}',
		);
	});
});

describe('floorTowardsZero(number)', () => {
	test('rounds positive numbers towards 0', () => {
		expect(floorTowardsZero(1.1)).toBe(1);
		expect(floorTowardsZero(1.9)).toBe(1);
		expect(floorTowardsZero(0.999999)).toBe(0);
	});

	test('rounds negative numbers up to 0', () => {
		expect(floorTowardsZero(-1.1)).toBe(-1);
		expect(floorTowardsZero(-1.9)).toBe(-1);
		expect(floorTowardsZero(0.999999)).toBe(0);
	});

	test('never returns negative 0', () => {
		// Illustrate issue
		expect(Math.ceil(-0.2)).toBe(-0);
		expect(Math.ceil(-0.2)).not.toBe(0);
		// Check function avoids this issue
		expect(floorTowardsZero(-0.2)).toBe(0);
		expect(floorTowardsZero(-0.2)).not.toBe(-0);
	});
});

describe('convertToMilliseconds(TimeObject)', () => {
	test('returns expected number of milliseconds for different input units', () => {
		expect(convertToMilliseconds({ days: 1 })).toBe(86400000);
		expect(convertToMilliseconds({ days: -1 })).toBe(-86400000);
		expect(convertToMilliseconds({ days: 1, milliseconds: -1 })).toBe(86399999);
		expect(convertToMilliseconds({ hours: 1 })).toBe(3600000);
		expect(convertToMilliseconds({ minutes: 1 })).toBe(60000);
		expect(convertToMilliseconds({ seconds: 1 })).toBe(1000);
		expect(convertToMilliseconds({ milliseconds: 1 })).toBe(1);
		expect(convertToMilliseconds(ONE_OF_EACH)).toBe(90061001);
	});
});
