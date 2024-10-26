import { connectDataBase } from "../../config/database.js";

export default class ApiUserModel {
    async execute() {
        const db = await connectDataBase();
        return db.collection('apiUser');
    }
}