import FarmProductionService from "../../../application/services/farmProduction.service.js";
import { BadRequestError } from "../../../domain/errors/bad-request.error.js";
import { CreateFarmProductionBodySchema } from "../../../domain/schemas/controllers/farmProduction.schema.js";
export default class CreateFarmProductionController {
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
        const { farmId, registerDate, milkVolume } = validatedBody.data;
        await this.farmProductionService.createFarmProduction({
            farmId,
            registerDate,
            milkVolume,
        });

        return res.status(201).send({
            message: 'Farm production created successfully',
        })
    }   
}