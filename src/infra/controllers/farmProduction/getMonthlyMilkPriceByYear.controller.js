import FarmProductionService from "../../../application/services/farmProduction.service.js";
import { BadRequestError } from "../../../domain/errors/bad-request.error.js";
import { GetMonthlyMilkPriceByYearParamsSchema, GetMonthlyMilkPriceByYearQuerySchema } from "../../../domain/schemas/controllers/farmProduction.schema.js";

export default class GetMonthlyMilkPriceByYearController {
    constructor() {
        this.farmProductionService = new FarmProductionService();
    }

    async handle(req, res) {
        const validatedQuery = GetMonthlyMilkPriceByYearQuerySchema.safeParse(req.query);

        if (!validatedQuery.success) {
            throw new BadRequestError(
                'Invalid Query Params',
                'GetMilkPriceByMonthQuerySchema',
                validatedQuery.error.errors,
            )
        }

        const validetedParams = GetMonthlyMilkPriceByYearParamsSchema.safeParse(req.params);

        if (!validetedParams.success) {
            throw new BadRequestError(
                'Invalid Params',
                'GetMilkPriceByMonthParamsSchema',
                validetedParams.error.errors,
            )
        }

        const { farmId } = validetedParams.data;

        const { year } = validatedQuery.data;

        const monthlyPrices = await this.farmProductionService.getMilkPriceByYear({
            farmId,
            year,
        });

        const monthlyPricesFormatted = monthlyPrices?.length > 0 ? monthlyPrices.map((mp) => {
            return {
                month: mp.month,
                totalMilkVolume: mp.totalMilkVolume,
                priceInBRL: mp.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                priceInUSD: mp.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            }
        }) : [];

        return res.status(200).send({
            monthlyPrices: monthlyPricesFormatted,
        })
    }   
}