import { BadRequestError } from "../../errors/bad-request.error";
import FarmerRepository from "../../infra/repositories/farmer.repository";

export default class FarmerServive {
    constructor() {
        this.farmerRepository = new FarmerRepository();
        this.farmRepository = farmRepository;
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