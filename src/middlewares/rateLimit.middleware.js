import { rateLimit } from 'express-rate-limit';

export const rateLimiter = rateLimit({
    windowMs: 1000,
    max: 5,
    message: 'Too many requests, please try again later.',
});