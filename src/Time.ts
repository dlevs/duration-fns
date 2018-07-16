'use strict';

const MILLISECONDS_IN_A_SECOND = 1000;
const MILLISECONDS_IN_A_MINUTE = MILLISECONDS_IN_A_SECOND * 60;
const MILLISECONDS_IN_AN_HOUR = MILLISECONDS_IN_A_MINUTE * 60;
const MILLISECONDS_IN_A_DAY = MILLISECONDS_IN_AN_HOUR * 24;

interface TimeObject {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
}

/**
 * Convert an object specifying time in different units into milliseconds.
 */
const convertToMilliseconds = ({
	days = 0,
	hours = 0,
	minutes = 0,
	seconds = 0,
	milliseconds = 0,
}: Partial<TimeObject>): number => (
	days * MILLISECONDS_IN_A_DAY +
	hours * MILLISECONDS_IN_AN_HOUR +
	minutes * MILLISECONDS_IN_A_MINUTE +
	seconds * MILLISECONDS_IN_A_SECOND +
	milliseconds
);

/**
 * A class for simple conversion between units of time.
 */
export class Time implements Partial<TimeObject> {
	/**
	 * The sole state of a `Time` instance.
	 *
	 * Arguments passed to the constructor are reduced to a millisecond
	 * representation for internal use, and for interoperability with any
	 * methods that accept `TimeObject` arguments.
	 *
	 * Prefer `.toMilliseconds()` over direct access of this property.
	 */
	readonly milliseconds: number;

	/**
	 * Create a new `Time` instance.
	 *
	 * ```javascript
	 * new Time({ days: 1, hours: 2 })
	 * ```
	 */
	public constructor(time: Partial<TimeObject> = {}) {
		this.milliseconds = convertToMilliseconds(time);
	}

	// 12 TODO: Fix this comment. Wrong fn
	/**
	 * Add values to the current time.
	 * Does not mutate the current `Time` instance.
	 *
	 * ```javascript
	 * new Time({ days: 1 }).add({ hours: 12 }).getDays() // 1.5
	 * ```
	 *
	 * @returns a new instance of `Time`
	 */
	public add(time: Partial<TimeObject>): Time {
		return new Time({ milliseconds: this.milliseconds + convertToMilliseconds(time) });
	}

	/**
	 * Subtract values from the current time.
	 * Does not mutate the current `Time` instance.
	 *
	 * ```javascript
	 * new Time({ days: 1 }).subtract({ hours: 12 }).getDays() // 0.5
	 * ```
	 *
	 * @returns a new instance of `Time`
	 */
	public subtract(time: Partial<TimeObject>): Time {
		return new Time({ milliseconds: this.milliseconds - convertToMilliseconds(time) });
	}

	/**
	 * Multiply the value of the current time.
	 * Does not mutate the current `Time` instance.
	 *
	 * ```javascript
	 * new Time({ days: 1 }).multiply(2).getDays() // 2
	 * ```
	 *
	 * @returns a new instance of `Time`
	 */
	public multiply(multiplier: number): Time {
		return new Time({ milliseconds: this.milliseconds * multiplier });
	}

	/**
	 * Divide the value of the current time.
	 * Does not mutate the current `Time` instance.
	 *
	 * ```javascript
	 * new Time({ hours: 1, minutes: 30 }).divide(2).getMinutes() // 45
	 * ```
	 *
	 * @returns a new instance of `Time`
	 */
	public divide(divisor: number): Time {
		return new Time({ milliseconds: this.milliseconds / divisor });
	}

	/**
	 * Return the time of the `Time` instance, represented in seconds.
	 *
	 * ```javascript
	 * new Time({ days: 1 }).toMilliseconds() // 86400000
	 * ```
	 */
	public toMilliseconds(): number {
		return this.milliseconds;
	}

	/**
	 * Return the time of the `Time` instance, represented in seconds.
	 *
	 * ```javascript
	 * new Time({ minutes: 2 }).toSeconds() // 120
	 * ```
	 */
	public toSeconds(): number {
		return this.milliseconds / MILLISECONDS_IN_A_SECOND;
	}

	/**
	 * Return the time of the `Time` instance, represented in minutes.
	 *
	 * ```javascript
	 * new Time({ hours: 1, minutes: 10 }).toMinutes() // 70
	 * ```
	 */
	public toMinutes(): number {
		return this.milliseconds / MILLISECONDS_IN_A_MINUTE;
	}

	/**
	 * Return the time of the `Time` instance, represented in hours.
	 *
	 * ```javascript
	 * new Time({ days: 1 }).toHours() // 24
	 * ```
	 */
	public toHours(): number {
		return this.milliseconds / MILLISECONDS_IN_AN_HOUR;
	}

	/**
	 * Return the time of the `Time` instance, represented in days.
	 *
	 * ```javascript
	 * new Time({ hours: 12 }).toDays() // 0.5
	 * ```
	 */
	public toDays(): number {
		return this.milliseconds / MILLISECONDS_IN_A_DAY;
	}

	/**
	 * Returns a plain object to represent the `Time` instance using the
	 * most appropriate units.
	 *
	 * ```javascript
	 * new Time({ milliseconds: 5010 }).toComponents()
	 * // { days: 0, hours: 0, minutes: 0, seconds: 5, milliseconds: 10 }
	 * ```
	 *
	 * ```javascript
	 * // TODO: double check this one
	 * new Time({ days: -1, milliseconds: 1 }).toComponents()
	 * // { days: 0, hours: -23, minutes: -59, seconds: -59, milliseconds: -999 }
	 * ```
	 */
	public toComponents(): TimeObject {
		const days = Math.floor(this.toDays());
		let tally = this.subtract({ days });

		const hours = Math.floor(tally.toHours());
		tally = tally.subtract({ hours });

		const minutes = Math.floor(tally.toMinutes());
		tally = tally.subtract({ minutes });

		const seconds = Math.floor(tally.toSeconds());
		tally = tally.subtract({ seconds });

		const milliseconds = tally.milliseconds;

		return { days, hours, minutes, seconds, milliseconds };
	}

	/**
	 * Returns a plain object to represent the `Time` instance using the
	 * most appropriate units.
	 *
	 * TODO: Check this is the way to reference a method:
	 * @see Time.toComponents
	 */
	public toJSON(): TimeObject {
		return this.toComponents();
	}
}

export default Time;
