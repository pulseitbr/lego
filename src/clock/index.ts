import moment from "moment";

export const BR_DATE_MASK = "DD/MM/YYYY";
export const ISO_DATE_MASK = "YYYY-MM-DD";
export const ISO_DATETIME_MASK = "YYYY-MM-DDTHH:mm:ss";
export const BR_DATETIME_MASK = "DD/MM/YYYY HH:mm";
export const BR_HOUR_MASK = "HH:mm";
export const ISO_DATETIME_MASK_BEGIN = "YYYY-MM-DDT00:00:00";
export const ISO_DATETIME_MASK_end = "YYYY-MM-DDT23:59:59";

export const today = () => moment();
export const isoTodayInit = () => today().format(`${ISO_DATE_MASK}T00:00:00`);
export const isoTodayEnd = () => today().format(`${ISO_DATE_MASK}T23:59:59`);

type TypeToDate = { showTodayAsDefault?: boolean; format?: string; targetMask?: string };

export const isoDateTime = (mask: string = ISO_DATETIME_MASK) => today().format(mask);

export const isoBeginDateTime = (mask: string = ISO_DATETIME_MASK) => today().format(mask);

export const toDate = (date?: string, { showTodayAsDefault = false, format = "ZZ", targetMask = BR_DATE_MASK }: TypeToDate = {}) => {
	if (!!date) {
		return moment(date, format).format(targetMask);
	}
	return showTodayAsDefault ? today().format(targetMask) : "";
};

export const dateHour = (date?: string, { showTodayAsDefault = false, format = "ZZ", targetMask = BR_DATE_MASK }: TypeToDate = {}) => {
	if (!!date) {
		return moment(date, targetMask).format(BR_DATETIME_MASK);
	}
	return showTodayAsDefault ? today().format(BR_DATETIME_MASK) : "";
};

export const toHour = (date: string, { showTodayAsDefault = false, format = "ZZ", targetMask = BR_HOUR_MASK }: TypeToDate = {}) => {
	if (!!date) {
		return moment(date, format).format(targetMask);
	}
	return showTodayAsDefault ? today().format(targetMask) : "";
};
