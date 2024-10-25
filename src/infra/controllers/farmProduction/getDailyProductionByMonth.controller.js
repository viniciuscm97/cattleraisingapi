import FarmProductionService from "../../../application/services/farmProduction.service.js";
import { BadRequestError } from "../../../domain/errors/bad-request.error.js";
import { GetDailyProductionByMonthParamsSchema, GetDailyProductionByMonthQuerySchema } from "../../../domain/schemas/controllers/farmProduction.schema.js";
export default class GetDailyProductionByMonthController {
    constructor() {
        this.farmProductionService = new FarmProductionService();
    }

    async handle(req, res) {
        const validatedQuery = GetDailyProductionByMonthQuerySchema.safeParse(req.query);

        if (!validatedQuery.success) {
            throw new BadRequestError(
                'Invalid Query Params',
                'getMonthlyAverageByFarmId',
                validatedQuery.error.errors,
            )
        }

        const validetedParams = GetDailyProductionByMonthParamsSchema.safeParse(req.params);

        if (!validetedParams.success) {
            throw new BadRequestError(
                'Invalid Params',
                'getMonthlyAverageByFarmId',
                validetedParams.error.errors,
            )
        }

        const { farmId } = validetedParams.data;

        const { month, year } = validatedQuery.data;

        const { dailyVolume, monthAverage } = await this.farmProductionService.getFarmProductionMonthAverage({
            farmId,
            month,
            year,
        });

        return res.status(200).send({
            dailyVolume,
            monthAverage,
        })
    }   
}