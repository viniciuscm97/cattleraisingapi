import FarmServive from "../../../application/services/farm.service.js";
import { BadRequestError } from "../../../domain/errors/bad-request.error.js";
import { CreateFarmBodySchema } from "../../../domain/schemas/controllers/farm.schema.js";

export default class CreateFarmController {
    constructor() {
        this.farmService = new FarmServive();
    }

    async handle(req, res) {
        const validatedBody = CreateFarmBodySchema.safeParse(req.body);

        if (!validatedBody.success) {
            throw new BadRequestError(
                'Invalid body',
                'createFarmController',
                validatedBody.error.errors,
            )
        }

        await this.farmService.createFarm({...validatedBody.data});

        return res.status(201).send({
            message: 'Farmer created successfully',
        })
    }   
}