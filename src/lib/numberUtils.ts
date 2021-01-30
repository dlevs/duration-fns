/**
 * Returns `true` if the passed value less than `0`, or equal to `-0`.
 */
export const isNegativelySigned = (n: number): boolean =>
	n < 0 || Object.is(n, -0);
