import FarmModel from "../../domain/models/farm.model.js";

const farmModel = new FarmModel();

// const farmCollection = farmModel.execute();
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
}