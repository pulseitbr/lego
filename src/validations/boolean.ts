export const True = (...args: boolean[]) => [...args].every(Boolean);
export const False = (...args: boolean[]) => !True(...args)
