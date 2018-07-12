'use strict';

import * as deepFreeze from 'deep-freeze';
import TimeMachine from './TimeMachine';

const ONE_OF_EACH = deepFreeze({
	days: 1,
	hours: 1,
	minutes: 1,
	seconds: 1,
	milliseconds: 1,
});
const ONE_OF_EACH_SUM = 90061001;

describe('TimeMachine', () => {
	test('is a function', () => {
		expect(typeof TimeMachine).toBe('function');
	});
	test('basic functionality', () => {
		expect(new TimeMachine({ days: 1 }).asHours()).toBe(24);
		expect(new TimeMachine({ days: 2.5 }).asHours()).toBe(60);
		expect(new TimeMachine({ hours: 60 }).asDays()).toBe(2.5);
		expect(new TimeMachine({ seconds: 60 }).asMilliseconds()).toBe(60000);
		expect(new TimeMachine({ seconds: 1, milliseconds: 2000 }).asSeconds()).toBe(3);
		expect(new TimeMachine({ milliseconds: 1234567 }).asMilliseconds()).toBe(1234567);

		// All params
		// TODO: Separate into separate test. Do we want this to round?
		expect(new TimeMachine(ONE_OF_EACH).asMilliseconds()).toBe(90061001);
		expect(new TimeMachine(ONE_OF_EACH).asSeconds()).toBe(90061.001);
		expect(new TimeMachine(ONE_OF_EACH).asMinutes()).toBe(1501.0166833333333);
		expect(new TimeMachine(ONE_OF_EACH).asHours()).toBe(25.016944722222224);
		expect(new TimeMachine(ONE_OF_EACH).asDays()).toBe(1.0423726967592593);

		// No param
		expect(new TimeMachine({}).asMilliseconds()).toBe(0);
		expect(new TimeMachine().asMilliseconds()).toBe(0);
	});

	test('.getComponents()', () => {
		expect(new TimeMachine(ONE_OF_EACH).getComponents()).not.toBe(ONE_OF_EACH);
		expect(new TimeMachine(ONE_OF_EACH).getComponents()).toMatchObject(ONE_OF_EACH);
		expect(new TimeMachine({ seconds: 1 }).getComponents()).toMatchObject({
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 1,
			milliseconds: 0,
		});
		expect(new TimeMachine({
			days: 5,
			hours: 4,
			minutes: 3,
			seconds: 2,
			milliseconds: 1,
		 }).getComponents()).toMatchObject({
			days: 5,
			hours: 4,
			minutes: 3,
			seconds: 2,
			milliseconds: 1,
		});
		expect(new TimeMachine({ days: 1.5, hours: 2 }).getComponents()).toMatchObject({
			days: 1,
			hours: 14,
			minutes: 0,
			seconds: 0,
			milliseconds: 0,
		});
	});

	test('.multiply()', () => {
		const originalTime = new TimeMachine({ hours: 10 });
		const newTime = originalTime.multiply(3);

		expect(newTime).not.toBe(originalTime);
		expect(newTime.asHours()).toBe(30);
		expect(originalTime.asHours()).toBe(10);
	});

	test('.divide()', () => {
		const originalTime = new TimeMachine({ hours: 30 });
		const newTime = originalTime.divide(3);

		expect(newTime).not.toBe(originalTime);
		expect(newTime.asHours()).toBe(10);
		expect(originalTime.asHours()).toBe(30);
	});

	test('.add()', () => {
		const originalTime = new TimeMachine({ milliseconds: 10 });
		const newTime = originalTime.add(ONE_OF_EACH);

		expect(newTime).not.toBe(originalTime);
		expect(newTime.asMilliseconds()).toBe(10 + ONE_OF_EACH_SUM);
		expect(originalTime.asMilliseconds()).toBe(10);
	});

	test('.subtract()', () => {
		const originalTime = new TimeMachine({ milliseconds: 10 });
		const newTime = originalTime.subtract(ONE_OF_EACH);

		expect(newTime).not.toBe(originalTime);
		expect(newTime.asMilliseconds()).toBe(10 - ONE_OF_EACH_SUM);
		expect(originalTime.asMilliseconds()).toBe(10);
	});

	test('becomes the number of milliseconds when stringified via `JSON.stringify()`', () => {
		expect(JSON.stringify(
			new TimeMachine({ milliseconds: 1 })),
		).toBe(
			'{"days":0,"hours":0,"minutes":0,"seconds":0,"milliseconds":1}',
		);
		expect(
			JSON.stringify(new TimeMachine({ days: 2.5, seconds: 1 })),
		).toBe(
			'{"days":2,"hours":12,"minutes":0,"seconds":1,"milliseconds":0}',
		);
	});
});
