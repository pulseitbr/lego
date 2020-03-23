export const IPv4_REGEX = /^(((1\\d|[1-9]?)\\d|2([0-4]\\d|5[0-5]))\\.){3}((1\\d|[1-9]?)\\d|2([0-4]\\d|5[0-5]))$/;
export const IsIPv4 = (ip: string) => IPv4_REGEX.test(ip);
