export const username = /^[a-z][a-z0-9_-]{3,32}$/;

export const IsUnixUsername = (nick: string) => username.test(nick);
