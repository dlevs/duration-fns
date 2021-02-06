# duration-fns

A collection of JavaScript functions for working with durations.

## Installation

`npm install duration-fns`

## Overview

```javascript
import * as duration from 'duration-fns'


// Parsing / stringifying
// ---------------------------------------------
duration.parse('PT1M30S')
// { minutes: 1, seconds: 30 }

duration.toString({ years: 1, hours: 6 })
// 'P1YT6H'


// Conversion
// ---------------------------------------------
duration.toUnit({ minutes: 2 }, 'seconds') // 120
duration.toMilliseconds({ seconds: 2 }) // 2000
duration.toSeconds({ milliseconds: 2000 }) // 2
duration.toMinutes({ hours: 1, seconds: 60 }) // 61
duration.toHours({ minutes: 60 }) // 1
duration.toDays({ weeks: 1, hours: 24 }) // 8
duration.toWeeks({ days: 14 }) // 2
duration.toMonths({ years: 2, months: 1 }) // 25
duration.toYears({ months: 12 }) // 1


// Normalizing
// ---------------------------------------------
duration.normalize({ days: 28, hours: 24 })
// { days: 29 }

duration.normalize({ days: 28, hours: 24 }, '2018-02-01')
// { months: 1, days: 1 }

duration.normalize({ days: 28, hours: 24 }, '2016-02-01')
// { months: 1, days: 0 } (leap year)


// Transformations
// ---------------------------------------------
duration.abs({ days: -1, seconds: 1 })
// { days: 1, seconds: -1 }

duration.negate({ days: -1, hours 2 })
// { days: 1, hours: -2 }


// Inspection
// ---------------------------------------------
duration.isNegative({ days: 1, hours: -25 })
// true

duration.isZero({ days: 1, hours: -24 })
// true


// Combining
// ---------------------------------------------
duration.subtract({ days: 2 }, { days: 1, hours: 12 })
// { days: 1, hours: -12 }

duration.sum({ days: 1 }, { days: 2, hours: 12 })
// { days: 3, hours: 12 }


// Date operations
// ---------------------------------------------
duration.apply('2020-01-01T00:00:00.000Z', { years: 2 }).toISOString()
// '2022-01-01T00:00:00.000Z'

duration.between('2022-01-01', '2020-01-01')
// { years: -2 }


// Meta
// ---------------------------------------------
duration.UNITS
// A complete list of duration units, ordered from large to small:
// ['years', 'months', 'weeks', 'days', ...]
```

## Conventions

### Function arguments

All functions that accept a duration object also accept numbers and strings:

```javascript
duration.toSeconds({ minutes: 1 }); // 60
duration.toSeconds(60000); // 60
duration.toSeconds('PT1M'); // 60

duration.sum({ seconds: 1 }, 'P1D', 200);
// { days: 1, seconds: 1, milliseconds: 200 }
```

### Normalization

Functions that transform or combine duration objects will not usually convert values between units:

```javascript
duration.sum({ seconds: 1 }, { milliseconds: 1000 });
// { seconds: 1, milliseconds 1000 }
```

Pass the return values through `normalize` for that functionality:

```javascript
duration.normalize({ seconds: 1, milliseconds 1000 });
// { seconds: 2 }
```

Some units cannot be normalized to others. For example, months can be normalized to years, but days cannot be normalized to months without a reference date:

```javascript
duration.normalize({ days: 31 });
// { days: 31 }

duration.normalize({ days: 31 }, '2020-02-01');
// { months: 1, days: 2 }

duration.normalize({ days: 31 }, '2020-12-01');
// { months: 1, days: 0 }
```

## Misc

[Test coverage report.](https://duration-fns-coverage.netlify.com/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/1c8db14f-4d92-41b0-a9da-32f7bcc5c17a/deploy-status)](https://app.netlify.com/sites/duration-fns-coverage/deploys)
