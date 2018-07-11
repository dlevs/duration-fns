'use strict';
// TODO: prepack
// TODO: codeconfig file for tabs

const MILLISECONDS_IN_A_SECOND = 1000;
const MILLISECONDS_IN_A_MINUTE = 60 * MILLISECONDS_IN_A_SECOND;
const MILLISECONDS_IN_AN_HOUR = 60 * MILLISECONDS_IN_A_MINUTE;
const MILLISECONDS_IN_A_DAY = 24 * MILLISECONDS_IN_AN_HOUR;

type Time = {
	days: number;
	hours: number;
	minutes: number;
	seconds: number
	milliseconds: number
};
type TimePartial = Partial<Time>;

const convertToMilliseconds = ({
	days = 0,
	hours = 0,
	minutes = 0,
	seconds = 0,
	milliseconds = 0,
}: TimePartial): number => (
	days * MILLISECONDS_IN_A_DAY +
	hours * MILLISECONDS_IN_AN_HOUR +
	minutes * MILLISECONDS_IN_A_MINUTE +
	seconds * MILLISECONDS_IN_A_SECOND +
	milliseconds
);

export default class TimeMachine {
	private _milliseconds: number;
	private _options: object;

	constructor(time: TimePartial = {}, options = {}) {
		this._milliseconds = convertToMilliseconds(time);
		this._options = {
			precision: 2,
			...options,
		};
	}

	add(time: TimePartial):TimeMachine {
		return new TimeMachine({ milliseconds: this.milliseconds + convertToMilliseconds(time) });
	}

	subtract(time: TimePartial):TimeMachine {
		return new TimeMachine({ milliseconds: this.milliseconds - convertToMilliseconds(time) });
	}

	multiply(factor: number):TimeMachine {
		return new TimeMachine({ milliseconds: this.milliseconds * factor });
	}

	// TODO: factor a good name?
	divide(factor: number):TimeMachine {
		return new TimeMachine({ milliseconds: this.milliseconds / factor });
	}

	get milliseconds():number {
		return this._milliseconds;
	}

	get seconds():number {
		return this._milliseconds / MILLISECONDS_IN_A_SECOND;
	}

	get minutes():number {
		return this._milliseconds / MILLISECONDS_IN_A_MINUTE;
	}

	get hours():number {
	  return this._milliseconds / MILLISECONDS_IN_AN_HOUR;
	}

	get days():number {
		return this._milliseconds / MILLISECONDS_IN_A_DAY;
	}

	get components(): Time {
		const days = Math.floor(this.days);
		let tally = this.subtract({ days });

		const hours = Math.floor(tally.hours);
		tally = tally.subtract({ hours });

		const minutes = Math.floor(tally.minutes);
		tally = tally.subtract({ minutes });

		const seconds = Math.floor(tally.seconds);
		tally = tally.subtract({ seconds });

		const milliseconds = Math.floor(tally.milliseconds);

		return { days, hours, minutes, seconds, milliseconds };
	}

	get ago(): Date {
		const date = new Date();
		const { days, hours, minutes, seconds, milliseconds } = this.components;

		// Things done this way instead of only using milliseconds in order to account for leap years.
		// TODO: Test the above claim
		date.setDate(date.getDate() - days);
		date.setHours(date.getHours() - hours);
		date.setMinutes(date.getMinutes() - minutes);
		date.setSeconds(date.getSeconds() - seconds);
		date.setMilliseconds(date.getMilliseconds() - milliseconds);

		return date;
	}

	toJSON():number {
		return this._milliseconds;
	}
}
