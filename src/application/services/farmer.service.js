import { BadRequestError } from "../../domain/errors/bad-request.error.js";
import FarmRepository from "../../infra/repositories/farm.repository.js";
import FarmerRepository from "../../infra/repositories/farmer.repository.js";

export default class FarmerService {
    constructor() {
        this.farmerRepository = new FarmerRepository();
        this.farmRepository = new FarmRepository();
    }

    async createFarmer({
        name,
        email,
        farmId,
    }) {
        const farmExists = await this.farmRepository.getFarmById(farmId);

        if (!farmExists) {
            throw new BadRequestError(
                'Farm does not exist',
                'createFarmerService',
                `FarmId: ${farmId}`,
            );
        }
        
        return this.farmerRepository.createFarmer({
            name,
            email,
            farmId,
        });
    }

    async getFarmerById(farmerId) {
        return this.farmerRepository.getFarmerById(farmerId);
    }
}