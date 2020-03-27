import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const FormatYearMonthDay = (date = "", mask: string = "Z") => dayjs(date, mask).format("YYYY-MM-DD");

export const FormatDayMonthYear = (date = "", mask: string = "Z") => dayjs(date, mask).format("DD/MM/YYYY");

export const Today = () => dayjs();

export const FormatDayMonthYearHourMinute = (date = "") => dayjs(date, "YYYY-MM-DD HH:mmZ").format("DD/MM/YYYY HH:mm");

type DateInRangeProps = {
	initialDate: string;
	finalDate: string;
	compareDate: string;
};
export const DateInRange = (dates: DateInRangeProps, mask = "Z") => {
	const initialDate = dayjs(dates.initialDate, mask);
	const finalDate = dayjs(dates.finalDate, mask);
	const compareDate = dayjs(dates.compareDate, mask);
	return compareDate.isSameOrAfter(initialDate) && compareDate.isSameOrBefore(finalDate);
};
