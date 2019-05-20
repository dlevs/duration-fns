# duration-fns

A collection of JavaScript functions for converting between time units.

**Project status:** In progress

Anything below here in the README may be out of date or subject to change. I would not recommend using this library in production.

[Test coverage report.](https://duration-fns-coverage.netlify.com/) [![Netlify Status](https://api.netlify.com/api/v1/badges/1c8db14f-4d92-41b0-a9da-32f7bcc5c17a/deploy-status)](https://app.netlify.com/sites/duration-fns-coverage/deploys)

## TODO: API implementation:

```javascript
import * as duration from 'duration-fns'

// TODO: For each:
// I - implement
// T - test
// E - Export
// J - JSDoc
// D - document

ITE     duration.parse('PT1M30S')
ITE     duration.normalize('PT1M30S', '2018-10-01')
ITE     duration.toString({ ... })
ITE     duration.toMilliseconds('PT1M30S', '2018-10-01')

ITE     duration.sum('PT1M30S', 'PT1M30S')
ITE     duration.subtract('PT1M30S', 'PT1M30S')

ITE     duration.negate('PT1M30S') // Object for PT-1M-30S
ITE     duration.between('2018-10-19', '2018-10-20')
ITE     duration.abs({ seconds: -10 }) // 10S

        duration.apply('2018-10-19', { seconds: 10 }) // Date

// TODO:
// - UNITS_MAP.months.addToDate() has issues. `years` unit probably does too. Look at what date-fns do.
```

## Installation

`npm install duration-fns`

## Overview

### Converting between units

```javascript
import { toSeconds } from 'duration-fns';

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
import { add, subtract } from 'duration-fns';

add({ seconds: 1 }, { seconds: 2, milliseconds: 500 });
// { seconds: 3, milliseconds: 500 }

subtract({ seconds: 1 }, { milliseconds: 500 });
// { seconds: 1, milliseconds: -500 }
```

The above functions accept any combination of time objects, ISO duration strings, or millisecond numbers:

```javascript
add({ seconds: 1 }, 'PT2S', 200);
// { seconds: 3, milliseconds 200 }
```

The calculations will not convert values between units. Pass the return values through `normalize` for that functionality:

```javascript
import { normalize } from 'duration-fns';

normalize({ minutes: 5, seconds: 62 });
// {  minutes: 6, seconds: 2 }
```

### parse

```javascript
import { parse } from 'duration-fns';

parse('PTM5S62');
// { minutes: 5, seconds: 62 }
```

Values are passed verbatim to the output object. For example, there was no attempt to normalize the output above to `{ minutes: 6, seconds: 2 }`. For that, use `normalize`.
