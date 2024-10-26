import ApiUserService from "../../../application/services/apiUser.service.js";
import { BadRequestError } from "../../../domain/errors/bad-request.error.js";
import { LoginApiUserBodySchema } from "../../../domain/schemas/controllers/apiUser.schema.js";

export default class LoginApiUserController {
    constructor() {
        this.apiUserService = new ApiUserService();
    }

    async handle(req, res) {
        const validatedBody = LoginApiUserBodySchema.safeParse(req.body);

        if (!validatedBody.success) {
            throw new BadRequestError(
                'Invalid body',
                'createApiUserController',
                validatedBody.error.errors,
            )
        }

        const { email, password } = validatedBody.data

        const { token } = await this.apiUserService.loginUser({
            email,
            password,
        });

        return res.status(200).send({
            token,
        })
    }
}