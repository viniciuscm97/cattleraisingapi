import FarmerService from "../../../application/services/farmer.service.js";
import { BadRequestError } from "../../../domain/errors/bad-request.error.js";
import { CreateFarmerBodySchema } from "../../../domain/schemas/controllers/farmer.schema.js";

export default class CreateFarmerController {
    constructor() {
        this.farmerService = new FarmerService();
    }

    async handle(req, res) {
        const validatedBody = CreateFarmerBodySchema.safeParse(req.body);

        if (!validatedBody.success) {
            throw new BadRequestError(
                'Invalid body',
                'createFarmerController',
                validatedBody.error.errors,
            )
        }

        await this.farmerService.createFarmer({...validatedBody.data});

        return res.status(201).send({
            message: 'Farmer created successfully',
        })
    }   
}