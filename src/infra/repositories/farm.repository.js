import FarmModel from "../../domain/models/farm.model.js";

const farmModel = new FarmModel();

export default class FarmRepository {
    farmModel = farmModel.execute();

    async createFarm({
        name,
        distance
    }) {
        return (await this.farmModel).insertOne({
            name,
            distance,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    
    async getFarmName(name) {
        return (await this.farmModel).findOne({ name });
    }

    async getFarmById(farmId) {
        return (await this.farmModel).
            findOne({ _id: farmId });
    }

    async getFarms() {
        return (await this.farmModel).find().sort({
            createdAt: -1,
        }).toArray();
    }
}