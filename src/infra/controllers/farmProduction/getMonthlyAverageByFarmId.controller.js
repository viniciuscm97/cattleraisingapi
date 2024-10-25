import FarmProductionService from "../../../application/services/farmProduction.service.js";
import { BadRequestError } from "../../../domain/errors/bad-request.error.js";
import { GetMonthlyAverageByFarmIdParamsSchema, GetMonthlyAverageByFarmIdQuerySchema } from "../../../domain/schemas/controllers/farmProduction.schema.js";
export default class GetMonthlyAverageByFarmIdController {
    constructor() {
        this.farmProductionService = new FarmProductionService();
    }

    async handle(req, res) {
        const validatedQuery = GetMonthlyAverageByFarmIdQuerySchema.safeParse(req.query);

        if (!validatedQuery.success) {
            throw new BadRequestError(
                'Invalid Query Params',
                'getMonthlyAverageByFarmId',
                validatedQuery.error.errors,
            )
        }

        const validetedParams = GetMonthlyAverageByFarmIdParamsSchema.safeParse(req.params);

        if (!validetedParams.success) {
            throw new BadRequestError(
                'Invalid Params',
                'getMonthlyAverageByFarmId',
                validetedParams.error.errors,
            )
        }

        const { farmId } = validetedParams.data;

        const { month, year } = validatedQuery.data;

        const { dailyVolume, monthlyAverage } = await this.farmProductionService.getFarmProductionMonthlyAverage({
            farmId,
            month,
            year,
        });

        return res.status(200).send({
            dailyVolume,
            monthlyAverage,
        })
    }   
}