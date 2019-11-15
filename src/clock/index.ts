import moment from "moment";

export const BR_DATE_MASK = "DD/MM/YYYY";
export const ISO_DATE_MASK = "YYYY-MM-DD";
export const ISO_DATETIME_MASK = "YYYY-MM-DDTHH:mm:ss";
export const BR_DATETIME_MASK = "DD/MM/YYYY HH:mm";
export const BR_HOUR_MASK = "HH:mm";

export const today = moment();
export const isoTodayInit = moment().format(`${ISO_DATE_MASK}T00:00:00`);
export const isoTodayEnd = moment().format(`${ISO_DATE_MASK}T23:59:59`);

export const toDate = (date?: string, format = "ZZ", targetMask = BR_DATE_MASK) => {
	if (date) {
		return moment(date, format).format(targetMask);
	}
	return moment().format(targetMask);
};

export const dateHour = (date?: string, targetMask = "ZZ") => {
	if (date) {
		return moment(date, targetMask).format(BR_DATETIME_MASK);
	}
	return moment().format(BR_DATETIME_MASK);
};

export const toHour = (date: string, format = "ZZ") => {
	if (date) {
		return moment(date, format).format(BR_HOUR_MASK);
	}
	return moment().format(BR_HOUR_MASK);
};
