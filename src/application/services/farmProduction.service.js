import { BadRequestError } from "../../domain/errors/bad-request.error.js";
import FarmRepository from "../../infra/repositories/farm.repository.js";
import FarmProductionRepository from "../../infra/repositories/farmProduction.repository.js";

export default class FarmProductionService {
    constructor() {
        this.farmRepository = new FarmRepository();
        this.farmProductionRepository = new FarmProductionRepository()
    }

    async createFarmProduction({
        registerDate,
        milkVolume,
        farmId,
    }) {
        const farmExists = await this.farmRepository.getFarmById(farmId);

        if (!farmExists) {
            throw new BadRequestError(
                'Farm does not exist',
                'createFarmProductionService',
                `FarmId: ${farmId}`,
            );
        }
        
        return this.farmProductionRepository.createFarmProduction({
            registerDate,
            milkVolume,
            farmId,
        });
    }

    async getFarmProductionById(farmerId) {
        return this.farmProductionRepository.getFarmProduction(farmerId);
    }
}