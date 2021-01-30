export const getDaysInMonth = (date: Date): number => {
	const monthIndex = date.getMonth();
	const lastDayOfMonth = new Date(0);
	lastDayOfMonth.setFullYear(date.getFullYear(), monthIndex + 1, 0);
	lastDayOfMonth.setHours(0, 0, 0, 0);
	return lastDayOfMonth.getDate();
};

export const addMonths = (date: Date, value: number): void => {
	const desiredMonth = date.getMonth() + value;
	const dateWithDesiredMonth = new Date(0);
	dateWithDesiredMonth.setFullYear(date.getFullYear(), desiredMonth, 1);
	dateWithDesiredMonth.setHours(0, 0, 0, 0);
	const daysInMonth = getDaysInMonth(dateWithDesiredMonth);
	// Set the last day of the new month
	// if the original date was the last day of the longer month
	date.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()));
};
