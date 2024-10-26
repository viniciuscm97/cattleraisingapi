import { z } from 'zod';

const CreateApiUserBodySchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255)
});

const LoginApiUserBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(255)
});

export { CreateApiUserBodySchema, LoginApiUserBodySchema };

