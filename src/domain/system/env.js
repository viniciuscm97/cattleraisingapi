export const ENV = {
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET || '',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '',
}