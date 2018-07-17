# Time

Time is a JavaScript class for converting time between units. All operations are immutable and return new `Time` instances instead of modifying the current instance.

## Installation

`npm install @dlevs/time`

## Overview

```javascript
import Time from '@dlevs/time';

const time = new Time({ days: 1 });

// Getters
time.toMilliseconds();  // 86400000
time.toSeconds();       // 86400
time.toMinutes();       // 1440
time.toHours();         // 24
time.toDays();          // 1
time.toComponents();    // { days: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }

// Operators
time.add({ hours: 12 }).toDays();     // 1.5
time.subtract({ days: 2 }).toDays();  // -1
time.multiply(2).toDays();            // 2
time.divide(2).toDays();              // 0.5
```

## Documentation

View the [API documentation](https://dlevs.github.io/time/classes/_time_.time.html) for more details and example usage.
