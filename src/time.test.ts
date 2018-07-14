'use strict';

import * as deepFreeze from 'deep-freeze';
import time from './time';

const ONE_OF_EACH = deepFreeze({
	days: 1,
	hours: 1,
	minutes: 1,
	seconds: 1,
	milliseconds: 1,
});
const ONE_OF_EACH_SUM = 90061001;

describe('TimeConverter', () => {
	test('is a function', () => {
		expect(typeof time).toBe('function');
	});
	test('basic functionality', () => {
		expect(time({ days: 1 }).toHours()).toBe(24);
		expect(time({ days: 2.5 }).toHours()).toBe(60);
		expect(time({ hours: 60 }).toDays()).toBe(2.5);
		expect(time({ seconds: 60 }).toMilliseconds()).toBe(60000);
		expect(time({ seconds: 1, milliseconds: 2000 }).toSeconds()).toBe(3);
		expect(time({ milliseconds: 1234567 }).toMilliseconds()).toBe(1234567);

		// All params
		// TODO: Separate into separate test. Do we want this to round?
		expect(time(ONE_OF_EACH).toMilliseconds()).toBe(90061001);
		expect(time(ONE_OF_EACH).toSeconds()).toBe(90061.001);
		expect(time(ONE_OF_EACH).toMinutes()).toBe(1501.0166833333333);
		expect(time(ONE_OF_EACH).toHours()).toBe(25.016944722222224);
		expect(time(ONE_OF_EACH).toDays()).toBe(1.0423726967592593);

		// No param
		expect(time({}).toMilliseconds()).toBe(0);
		expect(time().toMilliseconds()).toBe(0);
	});

	test('.toComponents()', () => {
		expect(time(ONE_OF_EACH).toComponents()).not.toBe(ONE_OF_EACH);
		expect(time(ONE_OF_EACH).toComponents()).toMatchObject(ONE_OF_EACH);
		expect(time({ seconds: 1 }).toComponents()).toMatchObject({
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 1,
			milliseconds: 0,
		});
		expect(time({
			days: 5,
			hours: 4,
			minutes: 3,
			seconds: 2,
			milliseconds: 1,
		}).toComponents()).toMatchObject({
			days: 5,
			hours: 4,
			minutes: 3,
			seconds: 2,
			milliseconds: 1,
		});
		expect(time({ days: 1.5, hours: 2 }).toComponents()).toMatchObject({
			days: 1,
			hours: 14,
			minutes: 0,
			seconds: 0,
			milliseconds: 0,
		});
	});

	test('.multiply()', () => {
		const originalTime = time({ hours: 10 });
		const newTime = originalTime.multiply(3);

		expect(newTime).not.toBe(originalTime);
		expect(newTime.toHours()).toBe(30);
		expect(originalTime.toHours()).toBe(10);
	});

	test('.divide()', () => {
		const originalTime = time({ hours: 30 });
		const newTime = originalTime.divide(3);

		expect(newTime).not.toBe(originalTime);
		expect(newTime.toHours()).toBe(10);
		expect(originalTime.toHours()).toBe(30);
	});

	test('.add()', () => {
		const originalTime = time({ milliseconds: 10 });
		const newTime = originalTime.add(ONE_OF_EACH);

		expect(newTime).not.toBe(originalTime);
		expect(newTime.toMilliseconds()).toBe(ONE_OF_EACH_SUM + 10);
		expect(originalTime.toMilliseconds()).toBe(10);
		expect(originalTime.add(originalTime).toMilliseconds()).toBe(20);
	});

	test('.subtract()', () => {
		const originalTime = time({ milliseconds: 10 });
		const newTime = originalTime.subtract(ONE_OF_EACH);

		expect(newTime).not.toBe(originalTime);
		expect(newTime.toMilliseconds()).toBe(10 - ONE_OF_EACH_SUM);
		expect(originalTime.toMilliseconds()).toBe(10);
	});

	test('becomes the number of milliseconds when stringified via `JSON.stringify()`', () => {
		expect(JSON.stringify(
			time({ milliseconds: 1 })),
		).toBe(
			'{"days":0,"hours":0,"minutes":0,"seconds":0,"milliseconds":1}',
		);
		expect(
			JSON.stringify(time({ days: 2.5, seconds: 1 })),
		).toBe(
			'{"days":2,"hours":12,"minutes":0,"seconds":1,"milliseconds":0}',
		);
	});
});
