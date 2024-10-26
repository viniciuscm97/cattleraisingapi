import ApiUserModel from "../../domain/models/apiUser.model.js";
import { hashPassword } from "../auth/userPassword.js";

const apiUserModel = new ApiUserModel();

export default class ApiUserRepository {
    apiUserModel = apiUserModel.execute();

    async createApiUser({
        name,
        email,
        password,
    }) {
        return (await this.apiUserModel).insertOne({
            name,
            email,
            password: await hashPassword(password),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async getApiUserByEmail(email) {
        return (await this.apiUserModel).findOne({ email });
    }
}