import moment from "moment";

export const BR_DATE_MASK = "DD/MM/YYYY";

export const ISO_DATETIME_MASK = "YYYY-MM-DDTHH:mm:ss";

export const ISO_DATETIME_MASK_BEGIN = "YYYY-MM-DDT00:00:00";

export const ISO_DATETIME_MASK_end = "YYYY-MM-DDT23:59:59";

export const today = () => moment();

export const isoDateTime = (mask: string = ISO_DATETIME_MASK) => today().format(mask);
export const isoBeginDateTime = (mask: string = ISO_DATETIME_MASK) => today().format(mask);
