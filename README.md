# time-fns

A collection of JavaScript functions for converting between time units.

## Installation

`npm install time-fns`

## Overview

### Converting between units

```javascript
import { toSeconds } from 'time-fns';

// Pass a time object
toSeconds({ minutes: 1, seconds: 30 }); // 90

// Or an ISO 8601 duration string
toSeconds('PT1M30S'); // 90

// Or the number of milliseconds
toSeconds(90000); // 90
```

There are equivalent functions for other time units:

- `toMilliseconds`
- `toSeconds`
- `toMinutes`
- `toHours`
- `toDays`
- `toWeeks`
- `toMonths`
- `toYears`

### Calculations

```javascript
import { addTime, subtractTime, multiplyTime, divideTime } from 'time-fns';

addTime({ seconds: 1 }, { seconds: 2, milliseconds: 500 });
// { seconds: 3, milliseconds: 500 }

subtractTime({ seconds: 1 }, { milliseconds: 500 });
// { seconds: 1, milliseconds: -500 }

multiplyTime({ seconds: 2 }, 2);
// { seconds: 4 }

divideTime({ seconds: 2 }, 2);
// { seconds: 1 }
```

The above functions accept any combination of time objects, ISO duration strings, or millisecond numbers:

```javascript
addTime({ seconds: 1 }, 'PT2S', 200);
// { seconds: 3, milliseconds 200 }
```

The calculations will not convert values between units. Pass the return values through `normalizeTimeUnits` for that functionality:

```javascript
import { normalizeTimeUnits } from 'time-fns';

normalizeTimeUnits({ minutes: 5, seconds: 62 });
// {  minutes: 6, seconds: 2 }
```

### toTimeObject

```javascript
import { toTimeObject } from 'time-fns';

toTimeObject('PTM5S62');
// { minutes: 5, seconds: 62 }
```

Values are passed verbatim to the output object. For example, there was no attempt to normalize the output above to `{ minutes: 6, seconds: 2 }`. For that, use `normalizeTimeUnits`.

## Non-goals

Time can be ambiguous:

- The length of "a year" varies due to [leap years](https://en.wikipedia.org/wiki/Leap_year).
- The length of "a month" varies between 28 and 31 days.
- The length of "a day" varies due to [daylight savings time](https://en.wikipedia.org/wiki/Daylight_saving_time).
- The length of "a minute" may change due to [leap seconds](https://en.wikipedia.org/wiki/Leap_second).

This project avoids converting between these units until 100% necessary.

When conversion is necessary, sane approximations are used to convert between units of time - a day is always `24` hours, a year is always `365` days, and so on. If you need to calculate exact durations in relation to a specific date, don't use this library; it is intended for non time-critical situations.

## TODO: New API:

```javascript
import * as duration from 'duration-fns'

duration.parse('PT1M30S')
duration.normalize('PT1M30S', '2018-10-01')
duration.toString({ ... })
duration.toMilliseconds('PT1M30S', '2018-10-01')

duration.sum('PT1M30S', 'PT1M30S')
duration.subtract('PT1M30S', 'PT1M30S')
duration.multiply('PT1M30S', 2)
duration.divide('PT1M30S', 10)

duration.negate('PT1M30S') // Object for PT-1M-30S
duration.between('2018-10-19', '2018-10-20')
duration.abs({ seconds: -10 }) // 10S

duration.apply('2018-10-19', { seconds: 10 }) // Date

// TODO: When stringifying, ignore weeks. Comma is preferred decimal delimiter
// TODO: Parse other formats:
// PYYYYMMDDThhmmss
// P[YYYY]-[MM]-[DD]T[hh]:[mm]:[ss]


```
