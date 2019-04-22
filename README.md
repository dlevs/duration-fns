# time-fns

time-fns is a collection of JavaScript functions for converting time between units.

## Installation

`npm install @dlevs/time`

## Non-goals

Time can be ambiguous:

- The length of "a year" varies due to [leap years](https://en.wikipedia.org/wiki/Leap_year).
- The length of "a month" varies between 28 and 31 days.
- The length of "a day" varies due to [daylight savings time](https://en.wikipedia.org/wiki/Daylight_saving_time).
- The length of "a minute" may change due to [leap seconds](https://en.wikipedia.org/wiki/Leap_second).

This project sets sane values for fairly constant units of time (for example, a day is always `24` hours) and moves on. If you need to calculate exact durations in relation to a specific date, don't use this library; it is intended for non time-critical situations, like when expressing "clear this cache every 20 minutes".

## Overview

```javascript
import toSeconds from 'duration/toSeconds';


toSeconds({ hours: 20, minutes: 6 });
toSeconds({ days: 4, hours: 20, minutes: 6 }, 'approx');
toSeconds({ days: 4, hours: 20, minutes: 6 }, new Date());
toSeconds('P4DT20H6M', new Date());









disambiguate({ years: 5, months: 40, seconds: 20 }, new Date());
disambiguate({ years: 5, months: 40, seconds: 20 }, 'round');
disambiguate({ years: 5, months: 40, seconds: 20 }, 'average');


toSeconds({ years: 5, months: 40, seconds: 20 }) // Throws error
toSeconds({ years: 5, months: 40, seconds: 20 }, 'round') // Works - wraps around disambiguate
toSeconds({ seconds: 20 }) // Works


const time = new Time({ days: 1 });

// Getters
time.toMilliseconds();  // 86400000
time.toSeconds();       // 86400
time.toMinutes();       // 1440
time.toHours();         // 24
time.toDays();          // 1
time.normalizeTime();    // { days: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }

// Operators
time.add({ hours: 12 }).toDays();     // 1.5
time.subtract({ days: 2 }).toDays();  // -1
time.multiply(2).toDays();            // 2
time.divide(2).toDays();              // 0.5
```

## Documentation

View the [API documentation](https://dlevs.github.io/time/classes/_time_.time.html) for more details and example usage.
