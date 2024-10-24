import FarmProductionService from "../../../application/services/farmProduction.service";
import { BadRequestError } from "../../../domain/errors/bad-request.error";
import { CreateFarmProductionBodySchema } from "../../../domain/schemas/controllers/farmProduction.schema";
export default class GetMonthlyAverageByFarmId {
    constructor() {
        this.farmProductionService = new FarmProductionService();
    }

    async handle(req, res) {
        const validatedBody = CreateFarmProductionBodySchema.safeParse(req.body);

        if (!validatedBody.success) {
            throw new BadRequestError(
                'Invalid body',
                'createFarmProductionController',
                validatedBody.error.errors,
            )
        }

        await this.farmProductionService.createFarmProduction({...validatedBody.data});

        return res.status(201).send({
            message: 'Farm production created successfully',
        })
    }   
}