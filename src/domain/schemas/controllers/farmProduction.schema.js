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

const GetMonthlyAverageByFarmIdQuerySchema = z.object({
    month: z.string()
        .refine((value) => {
            const numberValue = Number(value);
            return numberValue >= 1 && numberValue <= 12;
        })
        .transform((value) => {
            return Number(value);
        }),
    year: z.string()
        .refine((value) => {
            const numberValue = Number(value);
            return numberValue > 0;
        })
        .transform((value) => {
            return Number(value);
        }),
});

const GetMonthlyAverageByFarmIdParamsSchema = z.object({
    farmId: z.string()
        .refine((value) => ObjectId.isValid(value), {
            message: 'farmId must be a valid ObjectId',
        })
        .transform((value) => {
            return new ObjectId(value);
        }),
});

export { CreateFarmProductionBodySchema, GetMonthlyAverageByFarmIdParamsSchema, GetMonthlyAverageByFarmIdQuerySchema };

