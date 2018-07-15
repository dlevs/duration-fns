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
	readonly milliseconds: number;

	public constructor(time: Partial<TimeObject> = {}) {
		this.milliseconds = convertToMilliseconds(time);
	}

	/**
	 * Add values to the current time.
	 *
	 * Returns a new instance of `Time` instead of mutating the current instance.
	 */
	public add(time: Partial<TimeObject>): Time {
		return new Time({ milliseconds: this.milliseconds + convertToMilliseconds(time) });
	}

	/**
	 * Subtract values to the current time.
	 *
	 * Returns a new instance of `Time` instead of mutating the current instance.
	 */
	public subtract(time: Partial<TimeObject>): Time {
		return new Time({ milliseconds: this.milliseconds - convertToMilliseconds(time) });
	}

	/**
	 * Multiply the value of the current time.
	 * Does not mutate the current `Time` instance.
	 *
	 * @returns a new instance of `Time`
	 */
	public multiply(multiplier: number): Time {
		return new Time({ milliseconds: this.milliseconds * multiplier });
	}

	public divide(divisor: number): Time {
		return new Time({ milliseconds: this.milliseconds / divisor });
	}

	public toMilliseconds(): number {
		return this.milliseconds;
	}

	public toSeconds(): number {
		return this.milliseconds / MILLISECONDS_IN_A_SECOND;
	}

	public toMinutes(): number {
		return this.milliseconds / MILLISECONDS_IN_A_MINUTE;
	}

	public toHours(): number {
		return this.milliseconds / MILLISECONDS_IN_AN_HOUR;
	}

	public toDays(): number {
		return this.milliseconds / MILLISECONDS_IN_A_DAY;
	}

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

	public toJSON(): TimeObject {
		return this.toComponents();
	}
}

export default Time;
