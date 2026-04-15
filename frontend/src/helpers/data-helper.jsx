export const convertDateToUnixTimestamp = (date) => {
	return Math.floor(date.getTime() / 1000);
};

export const convertUnixTimestampToDate = (filter, unixTimestamp) => {
	const weekday = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const milliseconds = unixTimestamp * 1000;
	if (filter === "1D") {
		return new Date(milliseconds).toLocaleTimeString();
	} else if (filter === "1W") {
		return weekday[new Date(milliseconds).getDay()];
	} else if (filter === "1M") {
		return new Date(milliseconds).toLocaleDateString();
	} else
		return new Date(milliseconds).toLocaleDateString().slice(3);
};
export const createDate = (date, days, weeks, months, years) => {
	let newDate = new Date(date);
	newDate.setDate(newDate.getDate() + days + 7 * weeks);
	newDate.setMonth(newDate.getMonth() + months);
	newDate.setFullYear(newDate.getFullYear() + years);
	return newDate;
};

export const formateDate = (stamp) => {
	const date = new Date(stamp);
	let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
	let month = new Intl.DateTimeFormat("en", { month: "numeric" }).format(date);
	let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
	return `${year}-${month}-${day}`;
};
