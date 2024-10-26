import FarmRepository from "../../infra/repositories/farm.repository.js";

export default class FarmServive {
    constructor() {
        this.farmRepository = new FarmRepository();
    }

    async createFarm({
        name,
        distance,
    }) {
        const farmExists = await this.farmRepository.getFarmName(name);

        if (farmExists) {
            throw new BadRequestError(
                'Farm already exists',
                'createFarmService',
                `Name: ${name}`,
            );
        }

        return this.farmRepository.createFarm({
            name,
            distance,
        });
    }

    async getFarms() {
        return this.farmRepository.getFarms();
    }
}