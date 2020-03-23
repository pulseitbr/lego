import dayjs from "dayjs";

export const BR_DATE_MASK = "DD/MM/YYYY";
export const ISO_DATE_MASK = "YYYY-MM-DD";
export const ISO_DATETIME_MASK = "YYYY-MM-DDTHH:mm:ss";
export const BR_DATETIME_MASK = "DD/MM/YYYY HH:mm";
export const BR_HOUR_MASK = "HH:mm";
export const ISO_DATETIME_MASK_BEGIN = "YYYY-MM-DDT00:00:00";
export const ISO_DATETIME_MASK_end = "YYYY-MM-DDT23:59:59";

export const Today = () => dayjs(new Date());
export const IsoTodayInit = () => Today().format(`${ISO_DATE_MASK}T00:00:00`);
export const IsoTodayEnd = () => Today().format(`${ISO_DATE_MASK}T23:59:59`);

type TypeToDate = { showTodayAsDefault?: boolean; format?: string; targetMask?: string };

export const IsoDateTime = (mask: string = ISO_DATETIME_MASK) => Today().format(mask);

export const IsoBeginDateTime = (mask: string = ISO_DATETIME_MASK) => Today().format(mask);

export const ToDate = (date?: string, { showTodayAsDefault = false, format = "ZZ", targetMask = BR_DATE_MASK }: TypeToDate = {}) => {
	if (!!date) {
		return dayjs(date, format).format(targetMask);
	}
	return showTodayAsDefault ? Today().format(targetMask) : "";
};

export const DateHour = (date?: string, { showTodayAsDefault = false, format = "ZZ", targetMask = BR_DATE_MASK }: TypeToDate = {}) => {
	if (!!date) {
		return dayjs(date, format).format(targetMask);
	}
	return showTodayAsDefault ? Today().format(targetMask) : "";
};

export const ToHour = (date: string, { showTodayAsDefault = false, format = "ZZ", targetMask = BR_HOUR_MASK }: TypeToDate = {}) => {
	if (!!date) {
		return dayjs(date, format).format(targetMask);
	}
	return showTodayAsDefault ? Today().format(targetMask) : "";
};
