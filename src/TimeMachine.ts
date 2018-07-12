'use strict';
// TODO: prepack
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

// TODO: test setting private millisecond property should fail

export default class TimeMachine {
	private milliseconds: number;

	constructor(time: TimePartial = {}) {
		this.milliseconds = convertToMilliseconds(time);
	}

	// TODO: test passing TimeMachine as param
	add(time: TimePartial | TimeMachine): TimeMachine {
		return new TimeMachine({ milliseconds: this.milliseconds + convertToMilliseconds(time) });
	}

	// TODO: test passing TimeMachine as param
	subtract(time: TimePartial | TimeMachine): TimeMachine {
		return new TimeMachine({ milliseconds: this.milliseconds - convertToMilliseconds(time) });
	}

	multiply(multiplier: number): TimeMachine {
		return new TimeMachine({ milliseconds: this.milliseconds * multiplier });
	}

	divide(divisor: number): TimeMachine {
		return new TimeMachine({ milliseconds: this.milliseconds / divisor });
	}

	asMilliseconds(): number {
		return this.milliseconds;
	}

	asSeconds(): number {
		return this.milliseconds / MILLISECONDS_IN_A_SECOND;
	}

	asMinutes(): number {
		return this.milliseconds / MILLISECONDS_IN_A_MINUTE;
	}

	asHours(): number {
	  return this.milliseconds / MILLISECONDS_IN_AN_HOUR;
	}

	asDays(): number {
		return this.milliseconds / MILLISECONDS_IN_A_DAY;
	}

	getComponents(): Time {
		const days = Math.floor(this.asDays());
		let tally = this.subtract({ days });

		const hours = Math.floor(tally.asHours());
		tally = tally.subtract({ hours });

		const minutes = Math.floor(tally.asMinutes());
		tally = tally.subtract({ minutes });

		const seconds = Math.floor(tally.asSeconds());
		tally = tally.subtract({ seconds });

		const milliseconds = tally.milliseconds;

		return { days, hours, minutes, seconds, milliseconds };
	}

	toJSON(): Time {
		return this.getComponents();
	}
}
