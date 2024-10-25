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

const GetDailyProductionByMonthQuerySchema = z.object({
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

const GetDailyProductionByMonthParamsSchema = z.object({
    farmId: z.string()
        .refine((value) => ObjectId.isValid(value), {
            message: 'farmId must be a valid ObjectId',
        })
        .transform((value) => {
            return new ObjectId(value);
        }),
});

const GetMilkPriceByMonthQuerySchema = z.object({
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

const GetMilkPriceByMonthParamsSchema = z.object({
    farmId: z.string()
        .refine((value) => ObjectId.isValid(value), {
            message: 'farmId must be a valid ObjectId',
        })
        .transform((value) => {
            return new ObjectId(value);
        }),
});

const GetMonthlyMilkPriceByYearQuerySchema = z.object({
    year: z.string()
        .refine((value) => {
            const numberValue = Number(value);
            return numberValue > 0;
        })
        .transform((value) => {
            return Number(value);
        }),
});

const GetMonthlyMilkPriceByYearParamsSchema = z.object({
    farmId: z.string()
        .refine((value) => ObjectId.isValid(value), {
            message: 'farmId must be a valid ObjectId',
        })
        .transform((value) => {
            return new ObjectId(value);
        }),
});

export {
    CreateFarmProductionBodySchema, GetDailyProductionByMonthParamsSchema,
    GetDailyProductionByMonthQuerySchema, GetMilkPriceByMonthParamsSchema,
    GetMilkPriceByMonthQuerySchema, GetMonthlyMilkPriceByYearParamsSchema, GetMonthlyMilkPriceByYearQuerySchema
};

