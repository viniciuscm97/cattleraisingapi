import FarmProductionService from "../../../application/services/farmProduction.service.js";
import { BadRequestError } from "../../../domain/errors/bad-request.error.js";
import { GetMilkPriceByMonthParamsSchema, GetMilkPriceByMonthQuerySchema } from "../../../domain/schemas/controllers/farmProduction.schema.js";

export default class GetMilkPriceByMonthController {
    constructor() {
        this.farmProductionService = new FarmProductionService();
    }

    async handle(req, res) {
        const validatedQuery = GetMilkPriceByMonthQuerySchema.safeParse(req.query);

        if (!validatedQuery.success) {
            throw new BadRequestError(
                'Invalid Query Params',
                'GetMilkPriceByMonthQuerySchema',
                validatedQuery.error.errors,
            )
        }

        const validetedParams = GetMilkPriceByMonthParamsSchema.safeParse(req.params);

        if (!validetedParams.success) {
            throw new BadRequestError(
                'Invalid Params',
                'GetMilkPriceByMonthParamsSchema',
                validetedParams.error.errors,
            )
        }

        const { farmId } = validetedParams.data;

        const { month, year } = validatedQuery.data;

        const milkPrice = await this.farmProductionService.getMilkPriceByMonth({
            farmId,
            month,
            year,
        });

        return res.status(200).send({
            priceInBRL: milkPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            priceInUSD: milkPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
        })
    }   
}