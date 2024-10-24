import FarmProductionModel from "../../domain/models/farmProduction.model.js";

const farmProdutionModel = new FarmProductionModel();
export default class FarmProductionRepository {
    farmProductionModel = farmProdutionModel.execute();

    async createFarmProduction({
        farmId,
        registerDate,
        milkVolume,
    }) {
        return (await this.farmProductionModel).insertOne({
            farmId,
            registerDate,
            milkVolume,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    
    async getFarmProduction(name) {
        return (await this.farmProductionModel).findOne({ name });
    }
}