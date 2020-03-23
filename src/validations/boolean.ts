export const True = (...args: boolean[]) => [...args].every(Boolean);
export const OrTrue = (...args: boolean[]) => [...args].some(Boolean);
export const False = (...args: boolean[]) => !True(...args)
export const OrFalse = (...args: boolean[]) => !OrTrue(...args)
