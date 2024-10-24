import { ObjectId } from "mongodb";
import { z } from "zod";

const CreateFarmerBodySchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    farmId: z.string()
        .refine((value) => ObjectId.isValid(value), {
            message: 'farmId must be a valid ObjectId',
        })
        .transform((value) => {
            return new ObjectId(value);
        })
});

const GetFarmerByIdQuerySchema = z.object({
    id: z.string()
        .refine((value) => ObjectId.isValid(value), {
            message: 'id must be a valid ObjectId',
        })
        .transform((value) => {
            return new ObjectId(value);
        })
});

export { CreateFarmerBodySchema, GetFarmerByIdQuerySchema };

