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
            registerDate: new Date(registerDate),
            milkVolume,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    
    async getByFarmAndMonth(farmId, month, year) {
        const gteDate = new Date(year, month - 1, 1)
        const ltDate = new Date(year, month, 1)

        return (await this.farmProductionModel).
            find({
                farmId,
                registerDate: {
                    $gte: gteDate,
                    $lt: ltDate
                },
            }).toArray();
    }
}