import FarmServive from "../../../application/services/farm.service";
import { CreateFarmBodySchema } from "../../../domain/schemas/controllers/farm.schema";
import { BadRequestError } from "../../../errors/bad-request.error";

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

        await this.farmService.create({...validatedBody.data});

        return res.status(201).send({
            message: 'Farmer created successfully',
        })
    }   
}