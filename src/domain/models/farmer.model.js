import { connectDataBase } from "../../config/database";

export default class FarmerModel {
    async execute() {
        return connectDataBase().then((db) => db.collection('farmer'));
    }
}