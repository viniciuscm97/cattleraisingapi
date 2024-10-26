import { connectDataBase } from "../../config/database.js";

export default class FarmModel {
    async execute() {
        const db = await connectDataBase();
        return db.collection('farm');
    }
}