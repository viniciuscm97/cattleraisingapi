import { ObjectId } from "mongodb";
import { z } from "zod";

const CreateFarmProductionBodySchema = z.object({
    farmId: z.string()
        .refine((value) => ObjectId.isValid(value), {
            message: 'farmId must be a valid ObjectId',
        })
        .transform((value) => {
            return new ObjectId(value);
        }),
    registerDate: z.string().optional().transform((value) => value || new Date().toISOString()),
    milkVolume: z.number().positive(), 
});

export { CreateFarmProductionBodySchema };

