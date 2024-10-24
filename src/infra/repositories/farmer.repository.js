import FarmerModel from "../../domain/models/farmer.model.js";

export default class FarmerRepository {
    farmerModel = new FarmerModel().execute();

    async createFarmer({
        name,
        email,
        farmId,
    }) {
        return (await this.farmerModel).insertOne({
            name,
            email,
            farmId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    
    async getFarmerById(farmerId) {
        return (await this.farmerModel).findOne({ _id: farmerId });
    }
}