import subtractTime from './subtractTime';
import toMilliseconds from './toMilliseconds';

const time = { milliseconds: 10 };

test('subtractTime', () => {
	expect(toMilliseconds(subtractTime(time, time))).toMatchObject(0);
	expect(toMilliseconds(subtractTime(time, time, time))).toMatchObject(-10);
	expect(toMilliseconds(subtractTime(time, { seconds: 1 }))).toMatchObject(-999);
	expect(toMilliseconds(time)).toMatchObject(10);
});
