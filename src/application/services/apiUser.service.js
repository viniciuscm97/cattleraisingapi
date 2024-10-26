import { BadRequestError } from "../../domain/errors/bad-request.error.js";
import { UnauthorizedError } from "../../domain/errors/unauthorized.error.js";
import { comparePassword } from "../../infra/auth/userPassword.js";
import ApiUserRepository from "../../infra/repositories/apiUser.repository.js";
import TokenService from "./token.service.js";

export default class ApiUserService {
    constructor() {
        this.apiUserRepository = new ApiUserRepository();
        this.tokenService = new TokenService();
    }

    async createApiUser({
        name,
        email,
        password,
    }) {
        const apiUserExists = await this.apiUserRepository.getApiUserByEmail(email);

        if (apiUserExists) {
            throw new BadRequestError(
                'ApiUser already exists',
                'createApiUserService',
                `Email: ${email}`,
            );
        }

        return this.apiUserRepository.createApiUser({
            name,
            email,
            password,
        });
    }

    async loginUser({
        email,
        password,
    }) {
        const apiUser = await this.apiUserRepository.getApiUserByEmail(email);

        if (!apiUser) {
            throw new BadRequestError(
                'ApiUser not found',
                'loginApiUserService',
                `Email: ${email}`,
            );
        }

        await this.validatePassword(password, apiUser.password);

        const jwtToken = await this.tokenService.createJwtToken(apiUser._id.toString());

        return {
            token: jwtToken,
        };
    }

    async validatePassword(providedPassword, userPassword) {
        const passwordValidation = comparePassword(providedPassword, userPassword);

        if (!passwordValidation) {
            throw new UnauthorizedError(
                'Invalid password',
                'validatePassword',
            );
        }
    }
}