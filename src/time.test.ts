'use strict';

import * as deepFreeze from 'deep-freeze';
import Time from './time';

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

	test('.subtract(Time)', () => {
		const time = new Time({ milliseconds: 10 });

		expect(time.subtract(time).toMilliseconds()).toBe(0);
		expect(time.subtract(time).subtract(time).toMilliseconds()).toBe(-10);
		expect(time.toMilliseconds()).toBe(10);
	});

	test('.toComponents()', () => {
		expect(new Time(ONE_OF_EACH).toComponents()).not.toBe(ONE_OF_EACH);
		expect(new Time(ONE_OF_EACH).toComponents()).toMatchObject(ONE_OF_EACH);
		expect(new Time({ seconds: 1 }).toComponents()).toMatchObject({
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 1,
			milliseconds: 0,
		});
		expect(new Time({
			days: 5,
			hours: -4,
		}).toComponents()).toMatchObject({
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
		}).toComponents()).toMatchObject({
			days: 104,
			hours: 5,
			minutes: 41,
			seconds: 40,
			milliseconds: 100,
		});
		expect(new Time({ days: 1.5, hours: 2 }).toComponents()).toMatchObject({
			days: 1,
			hours: 14,
			minutes: 0,
			seconds: 0,
			milliseconds: 0,
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
