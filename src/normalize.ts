import { UNITS_META_MAP_LITERAL, ZERO, UnitKey } from './lib/units';
import { Duration, DurationInput, DateInput } from './types';
import { between } from './between';
import { apply } from './apply';
import { toMilliseconds, toMonths } from './toUnit';
import { parse } from './parse';

const createUnitsNormalizer = <T extends UnitKey>(
	keys: T[],
	getDivisor: (unit: T) => number,
) => {
	return (
		duration: Readonly<Duration>,
		remaining: number,
	) => {
		const output = { ...duration };

		keys.forEach(unit => {
			const divisor = getDivisor(unit);
			output[unit] = ~~(remaining / divisor);
			remaining -= output[unit] * divisor;
		});

		return output;
	};
};

const yearMonthNormalizer = createUnitsNormalizer(
	['years', 'months'],
	unit => UNITS_META_MAP_LITERAL[unit].months,
);

const dayAndTimeNormalizer = createUnitsNormalizer(
	['days', 'hours', 'minutes', 'seconds', 'milliseconds'],
	unit => UNITS_META_MAP_LITERAL[unit].milliseconds,
);

const baseNormalizer = (duration: DurationInput): Duration => {
	const { years, months, weeks, days, ...rest } = parse(duration);
	let output = { ...ZERO };

	// Normalize years and months between themselves.
	// They cannot be normalized with other units due to their variable length.
	output = yearMonthNormalizer(
		output,
		toMonths({ years, months }),
	);

	// Normalize unambiguous units. It could be argued that `days` is ambiguous as
	// a day is not always 24 hours long, but the ISO 8601 spec says a day is 24 hours.
	// When not changing timezones, a day is consistently 24 hours, whereas months
	// and years are consistently irregular.
	output = dayAndTimeNormalizer(
		output,
		toMilliseconds({ ...rest, days: days + (weeks * 7) }),
	);

	return output;
};

/**
 * Convert a duration object or number of milliseconds into a complete
 * duration object that expresses the value in the most appropriate units.
 *
 * If a `referenceDate` argument is provided, the returned duration is normalized
 * relative to that date. This means each day, month and year has an unambiguous
 * duration, and the `normalize` function can safely convert between these units.
 *
 * @example
 * normalize({ milliseconds 4000 }) // { ..., seconds: 4, milliseconds: 0 }
 * normalize('P28DT24H') // { ..., days: 29 }
 * normalize('P28DT24H', '2018-02-01') // { ..., months: 1, days: 1 }
 * normalize('P28DT24H', '2016-02-01') // { ..., months: 1, days: 0 } (leap year)
 */
export const normalize = (
	duration: DurationInput,
	referenceDate?: DateInput,
): Duration => {
	const durationToNormalize = referenceDate != null
		// When using a reference date, `between` may give a result like this:
		// { years: 1, months: -11 }
		// Because of this, we pass that through `baseNormalizer` too.
		? between(referenceDate, apply(referenceDate, duration))
		: duration;

	return baseNormalizer(durationToNormalize);
};
