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

// All calculations return the result in milliseconds
addTime({ seconds: 1 }, { milliseconds: 500 }); // 1500
subtractTime({ seconds: 1 }, { milliseconds: 500 }); // 500
multiplyTime({ seconds: 1 }, 2); // 2000
divideTime({ seconds: 1 }, 2); // 500

// ISO duration strings, number of milliseconds and objects are valid arguments
// to all calculation functions.
addTime({ seconds: 1 }, 'PT2S', 200); // 3200
```

### Convert between formats

#### parseISODuration

```javascript
import { parseISODuration } from 'time-fns';

parseISODuration('PTM5S62');

/* returns {
 *   years: 0, months: 0, ...,
 *   minutes: 5,
 *   seconds: 62
 * }
 */
```

Values are passed verbatim to the output object. For example, there was no attempt to normalize the output above to `{ minutes: 6, seconds: 2 }`. For that, use `normalizeTime`.

#### normalizeTime

```javascript
import { normalizeTime } from 'time-fns';

normalizeTime({ minutes: 5, seconds: 62 });

/* returns {
 *   years: 0, months: 0, ...,
 *   minutes: 6,
 *   seconds: 2
 * }
 */
```

## Non-goals

Time can be ambiguous:

- The length of "a year" varies due to [leap years](https://en.wikipedia.org/wiki/Leap_year).
- The length of "a month" varies between 28 and 31 days.
- The length of "a day" varies due to [daylight savings time](https://en.wikipedia.org/wiki/Daylight_saving_time).
- The length of "a minute" may change due to [leap seconds](https://en.wikipedia.org/wiki/Leap_second).

This project avoids converting between these units 100% necessary.

When conversion is necessary, sane constants are used to convert between units of time (for example, a day is always `24` hours) and moves on. If you need to calculate exact durations in relation to a specific date, don't use this library; it is intended for non time-critical situations, like when expressing "clear this cache every 20 minutes".
