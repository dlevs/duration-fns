'use strict';

const deepFreeze = require('deep-freeze');
const TimeMachine = require('./index.ts').default;

const ONE_OF_EACH = deepFreeze({
    days: 1,
    hours: 1,
    minutes: 1,
    seconds: 1,
    milliseconds: 1
});
const ONE_OF_EACH_SUM = 90061001;

describe('TimeMachine', () => {
    test('is a function', () => {
        expect(typeof TimeMachine).toBe('function');
    });
    test('basic functionality', () => {
        expect(new TimeMachine({ days: 1 }).hours).toBe(24);
        expect(new TimeMachine({ days: 2.5 }).hours).toBe(60);
        expect(new TimeMachine({ hours: 60 }).days).toBe(2.5);
        expect(new TimeMachine({ seconds: 60 }).milliseconds).toBe(60000);
        expect(new TimeMachine({ seconds: 1, milliseconds: 2000 }).seconds).toBe(3);
        expect(new TimeMachine({ milliseconds: 1234567 }).milliseconds).toBe(1234567);

        // All params
        // TODO: Separate into separate test. Do we want this to round?
        expect(new TimeMachine(ONE_OF_EACH).milliseconds).toBe(90061001);
        expect(new TimeMachine(ONE_OF_EACH).seconds).toBe(90061.001);
        expect(new TimeMachine(ONE_OF_EACH).minutes).toBe(1501.0166833333333);
        expect(new TimeMachine(ONE_OF_EACH).hours).toBe(25.016944722222224);
        expect(new TimeMachine(ONE_OF_EACH).days).toBe(1.0423726967592593);

        // No param
        expect(new TimeMachine({}).milliseconds).toBe(0);
        expect(new TimeMachine().milliseconds).toBe(0);
    });

    test('.components', () => {
        expect(new TimeMachine(ONE_OF_EACH).components).not.toBe(ONE_OF_EACH);
        expect(new TimeMachine(ONE_OF_EACH).components).toMatchObject(ONE_OF_EACH);
        expect(new TimeMachine({ seconds: 1 }).components).toMatchObject({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 1,
            milliseconds: 0
        });
        expect(new TimeMachine({
            days: 5,
            hours: 4,
            minutes: 3,
            seconds: 2,
            milliseconds: 1
         }).components).toMatchObject({
            days: 5,
            hours: 4,
            minutes: 3,
            seconds: 2,
            milliseconds: 1
        });
        expect(new TimeMachine({ days: 1.5, hours: 2 }).components).toMatchObject({
            days: 1,
            hours: 14,
            minutes: 0,
            seconds: 0,
            milliseconds: 0
        });
    });


    test('.multiply()', () => {
        const originalTime = new TimeMachine({ hours: 10 });
        const newTime = originalTime.multiply(3);

        expect(newTime).not.toBe(originalTime);
        expect(newTime.hours).toBe(30);
        expect(originalTime.hours).toBe(10);
    });

    test('.divide()', () => {
        const originalTime = new TimeMachine({ hours: 30 });
        const newTime = originalTime.divide(3);

        expect(newTime).not.toBe(originalTime);
        expect(newTime.hours).toBe(10);
        expect(originalTime.hours).toBe(30);
    });

    test('.add()', () => {
        const originalTime = new TimeMachine({ milliseconds: 10 });
        const newTime = originalTime.add(ONE_OF_EACH);

        expect(newTime).not.toBe(originalTime);
        expect(newTime.milliseconds).toBe(10 + ONE_OF_EACH_SUM);
        expect(originalTime.milliseconds).toBe(10);
    });

    test('.subtract()', () => {
        const originalTime = new TimeMachine({ milliseconds: 10 });
        const newTime = originalTime.subtract(ONE_OF_EACH);

        expect(newTime).not.toBe(originalTime);
        expect(newTime.milliseconds).toBe(10 - ONE_OF_EACH_SUM);
        expect(originalTime.milliseconds).toBe(10);
    });

    test('becomes the number of milliseconds when stringified via `JSON.stringify()`', () => {
        expect(JSON.stringify(new TimeMachine({ milliseconds: 1 }))).toBe('1');
        expect(JSON.stringify(new TimeMachine({ seconds: 1 }))).toBe('1000');
        expect(JSON.stringify({
            time: new TimeMachine({ seconds: 1 })
        })).toBe('{"time":1000}');
    });
});
