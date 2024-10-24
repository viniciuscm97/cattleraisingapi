import { ObjectId } from "mongodb";
import { z } from "zod";

const CreateFarmerBodySchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    farmId: z.custom(ObjectId)  
});

const GetFarmerByIdQuerySchema = z.object({
    id: z.string().refine((value) => ObjectId.isValid(value)),
});

export { CreateFarmerBodySchema, GetFarmerByIdQuerySchema };

