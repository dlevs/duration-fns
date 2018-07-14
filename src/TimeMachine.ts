'use strict';
// TODO: prepack
const MILLISECONDS_IN_A_SECOND = 1000;
const MILLISECONDS_IN_A_MINUTE = 60 * MILLISECONDS_IN_A_SECOND;
const MILLISECONDS_IN_AN_HOUR = 60 * MILLISECONDS_IN_A_MINUTE;
const MILLISECONDS_IN_A_DAY = 24 * MILLISECONDS_IN_AN_HOUR;

interface Time {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
}
type TimePartial = Partial<Time>;

const convertToMilliseconds = (time: TimePartial | TimeMachine): number => {
	if (time instanceof TimeMachine) {
		return time.asMilliseconds();
	}

	const {
		days = 0,
		hours = 0,
		minutes = 0,
		seconds = 0,
		milliseconds = 0,
	} = time;

	return (
		days * MILLISECONDS_IN_A_DAY +
		hours * MILLISECONDS_IN_AN_HOUR +
		minutes * MILLISECONDS_IN_A_MINUTE +
		seconds * MILLISECONDS_IN_A_SECOND +
		milliseconds
	);
};

export default class TimeMachine {
	private milliseconds: number;

	public constructor(time: TimePartial = {}) {
		this.milliseconds = convertToMilliseconds(time);
	}

	public add(time: TimePartial | TimeMachine): TimeMachine {
		return new TimeMachine({ milliseconds: this.milliseconds + convertToMilliseconds(time) });
	}

	// TODO: test passing TimeMachine as param
	public subtract(time: TimePartial | TimeMachine): TimeMachine {
		return new TimeMachine({ milliseconds: this.milliseconds - convertToMilliseconds(time) });
	}

	public multiply(multiplier: number): TimeMachine {
		return new TimeMachine({ milliseconds: this.milliseconds * multiplier });
	}

	public divide(divisor: number): TimeMachine {
		return new TimeMachine({ milliseconds: this.milliseconds / divisor });
	}

	public asMilliseconds(): number {
		return this.milliseconds;
	}

	public asSeconds(): number {
		return this.milliseconds / MILLISECONDS_IN_A_SECOND;
	}

	public asMinutes(): number {
		return this.milliseconds / MILLISECONDS_IN_A_MINUTE;
	}

	public asHours(): number {
		return this.milliseconds / MILLISECONDS_IN_AN_HOUR;
	}

	public asDays(): number {
		return this.milliseconds / MILLISECONDS_IN_A_DAY;
	}

	public getComponents(): Time {
		const days = Math.floor(this.asDays());
		let tally = this.subtract({ days });

		const hours = Math.floor(tally.asHours());
		tally = tally.subtract({ hours });

		const minutes = Math.floor(tally.asMinutes());
		tally = tally.subtract({ minutes });

		const seconds = Math.floor(tally.asSeconds());
		tally = tally.subtract({seconds });

		const milliseconds = tally.milliseconds;

		return { days, hours, minutes, seconds, milliseconds };
	}

	public toJSON(): Time {
		return this.getComponents();
	}
}
