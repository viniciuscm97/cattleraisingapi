import { connectDataBase } from "../../config/database.js";

export default class FarmProductionModel {
    async execute() {
        const db = await connectDataBase();
        return db.collection('farmProduction');
    }
}