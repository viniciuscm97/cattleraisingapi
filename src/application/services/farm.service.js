import FarmRepository from "../../infra/repositories/farm.repository";

export default class FarmServive {
    constructor() {
        this.farmRepository = new FarmRepository();
    }

    async createFarm({
        name,
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
        });
    }
}