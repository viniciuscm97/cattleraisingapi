import { connectDataBase } from "../../config/database.js";

export default class FarmerModel {
    async execute() {
        return connectDataBase().then((db) => db.collection('farmer'));
    }
}