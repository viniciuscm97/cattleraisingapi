import { connectDataBase } from "../../config/database";

export default class FarmModel {
    async execute() {
        return connectDataBase().then((db) => db.collection('farm'));
    }
}