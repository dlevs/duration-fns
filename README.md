# time-fns

time-fns is a collection of JavaScript functions for converting between time units.

## Installation

`npm install time-fns`

## Overview

```javascript
import { toSeconds } from 'time-fns';

// Pass a time object
toSeconds({ minutes: 1, seconds: 30 }); // 90

// Or an ISO 8601 duration string
toSeconds('PT1M30S'); // 90

// Or the number of milliseconds
toSeconds(90000); // 90
```

## Non-goals

Time can be ambiguous:

- The length of "a year" varies due to [leap years](https://en.wikipedia.org/wiki/Leap_year).
- The length of "a month" varies between 28 and 31 days.
- The length of "a day" varies due to [daylight savings time](https://en.wikipedia.org/wiki/Daylight_saving_time).
- The length of "a minute" may change due to [leap seconds](https://en.wikipedia.org/wiki/Leap_second).

This project sets sane values for fairly constant units of time (for example, a day is always `24` hours) and moves on. If you need to calculate exact durations in relation to a specific date, don't use this library; it is intended for non time-critical situations, like when expressing "clear this cache every 20 minutes".

## Documentation

View the [API documentation](https://dlevs.github.io/time-fns) for more details and example usage.
