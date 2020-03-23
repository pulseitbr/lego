export const pipe = (...fns: Function[]) => fns.reduce((f, g) => (...args: any) => g(f(...args)));

type Async = Function | Promise<Function>;

export const asyncPipe = (...fns: Async[]) => (arg: any) => fns.reduce((p, f) => p.then(f as any), Promise.resolve(arg));
