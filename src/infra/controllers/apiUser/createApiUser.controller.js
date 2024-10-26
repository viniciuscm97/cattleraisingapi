import ApiUserService from "../../../application/services/apiUser.service.js";
import { BadRequestError } from "../../../domain/errors/bad-request.error.js";
import { CreateApiUserBodySchema } from "../../../domain/schemas/controllers/apiUser.schema.js";

export default class CreateApiUserController {
    constructor() {
        this.apiUserService = new ApiUserService();
    }

    async handle(req, res) {
        const validatedBody = CreateApiUserBodySchema.safeParse(req.body);

        if (!validatedBody.success) {
            throw new BadRequestError(
                'Invalid body',
                'createApiUserController',
                validatedBody.error.errors,
            )
        }

        const { name, email, password } = validatedBody.data

        const createdApiUser = await this.apiUserService.createApiUser({
            name,
            email,
            password,
        });

        return res.status(201).send({
            message: 'ApiUser created successfully',
            apiUserId: createdApiUser.insertedId,
        })
    }
}