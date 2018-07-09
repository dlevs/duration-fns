'use strict';
// TODO: prepack

const MILLISECONDS_IN_A_SECOND = 1000;
const MILLISECONDS_IN_A_MINUTE = 60 * MILLISECONDS_IN_A_SECOND;
const MILLISECONDS_IN_AN_HOUR = 60 * MILLISECONDS_IN_A_MINUTE;
const MILLISECONDS_IN_A_DAY = 24 * MILLISECONDS_IN_AN_HOUR;

// TODO: Can default params be in the type?
// TODO: make it immutable

type Time = {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number
    milliseconds?: number
}

const convertToMilliseconds = ({
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
}: Time): number => (
    days * MILLISECONDS_IN_A_DAY +
    hours * MILLISECONDS_IN_AN_HOUR +
    minutes * MILLISECONDS_IN_A_MINUTE +
    seconds * MILLISECONDS_IN_A_SECOND +
    milliseconds
);

export default class TimeMachine {
    private _milliseconds: number;
    private _options: object;

    constructor(time: Time = {}, options = {}) {
        this._milliseconds = convertToMilliseconds(time);
        this._options = {
            precision: 2,
            ...options,
        };
    }

    add(time: Time):TimeMachine {
        return this.spawn((value: number) => value + convertToMilliseconds(time));
    }

    subtract(time: Time):TimeMachine {
        return this.spawn((value: number) => value - convertToMilliseconds(time));
    }

    multiply(factor: number):TimeMachine {
        return this.spawn((value: number) => value * factor);
    }

    // TODO: factor a good name?
    divide(factor: number):TimeMachine {
        return this.spawn((value: number) => value / factor);
    }

    spawn(transform) {
        return new TimeMachine({ milliseconds: transform(this._milliseconds) }, this._options)
    }

    round(value: number) {
        // TODO: Use "factor" for consistency?
        // TODO: This class does too much
        const multiplier = (10 ** this._options.precision) / 10;
        return Math.round(value * multiplier) / multiplier
    }

    get milliseconds():number {
        return this.round(this._milliseconds);
    }

    get seconds():number {
        return this.round(this._milliseconds / MILLISECONDS_IN_A_SECOND);
    }

    get minutes():number {
        return this.round(this._milliseconds / MILLISECONDS_IN_A_MINUTE);
    }

    get hours():number {
        return this.round(this._milliseconds / MILLISECONDS_IN_AN_HOUR);
    }

    get days():number {
        return this.round(this._milliseconds / MILLISECONDS_IN_A_DAY);
    }

    toJSON():number {
        return this.round(this._milliseconds);
    }
};
