export const PORT: string | undefined = process.env.PORT;
export const SALT: string | undefined = process.env.SALT;
export const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY;
export const MONGO_URI: string | undefined = process.env.MONGO_URI;
export const TZ: string = process.env.TZ || 'Europe/London';