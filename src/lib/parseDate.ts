export const parseDate = (date: string | number | Date) => {
	if (date instanceof Date) {
		return new Date(date.getTime());
	}

	return new Date(date);
};
