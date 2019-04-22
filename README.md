# Time

Time is a JavaScript class for converting time between units. All operations return new `Time` instances instead of mutating the current instance.

## Installation

`npm install @dlevs/time`

## Ambiguous time
| Unit        | Is unabmbiguous? |
| :--         | :--              |
| millisecond | ✅ `1 millisecond` is the smallest unit of time in JavaScript.|
| second      | ✅ `1 second` is `1000 milliseconds` |
| minute      | ✅ `1 minute` is `60 seconds`<br><br>JavaScript has no concept of leap seconds, so there's no need to worry about minutes with 61 seconds. |
| hour        | ✅ `1 hour` is `60 minutes`        |
| day         | ❌ `1 day` can be between `23 - 25 hours`<br><br>The length of a day changes due to [daylight savings time](https://en.wikipedia.org/wiki/Daylight_saving_time). |
| week        | ❌ `1 week` is `7 days`<br><br>However, since the length of a day is ambiguous, so too is the length of `7 days`. |
| month       | ❌ `1 month` is between `28 - 31 days` |
| year        | ❌ `1 year` is between `365 - 366 days`<br><br>The number of days in a year differs due to leap years.<br>Years can be converted to and from months only if the number of months is divisible by

// TODO: Nanoseconds with process.hrtime
| Unit        | Round             | Average           |
| :--         | :--               | :--               |
| millisecond | n/a               | n/a               |
| second      | 1000 milliseconds | 1000 milliseconds |
| minute      | 60 seconds        | 60 seconds        |
| hour        | 60 minutes        | 60 minutes        |
| day         | 24 hours          | 24 hours          |
| week        | 7 days            | 7 days            |
| month       | 30 days           | 30.436875 days    |
| year        | 365 days          | 365.2425 days     |

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
