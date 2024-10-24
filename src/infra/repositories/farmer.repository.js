export default class FarmerRepository {
    constructor() {
        this.farmerModel = new FarmerModel().execute();
    }
    
    async createFarmer({
        name,
        email,
        farmId,
    }) {
        return this.farmerModel.create({
            name,
            email,
            farmId
        });
    }
    
    async getFarmerById(farmerId) {
        return this.farmerModel.findById(farmerId);
    }
}