import { CreateFarmerBodySchema } from "../../../domain/schemas/controllers/farmer.schema";
import { BadRequestError } from "../../../errors/bad-request.error";

export default class CreateFarmerController {
    constructor() {
        this.farmerService = new FarmerServive();
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