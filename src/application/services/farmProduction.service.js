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

    async getFarmProductionMonthlyAverage({farmId, month, year}) {
        const farm = await this.farmRepository.getFarmById(farmId);

        if (!farm) {
            throw new BadRequestError(
                'Farm does not exist',
                'getFarmProductionMonthlyAverage',
                `FarmId: ${farmId}`,
            );
        }

        const farmProductions =  await this.farmProductionRepository.getByFarmAndMonth(farmId, month, year);
        const monthlyAverage = this.getMonthlyAverage(farmProductions);
        const dailyVolume = this.getDailyVolume(farmProductions);

        return ({
            monthlyAverage,
            dailyVolume,
        })
    }

    getDailyVolume(farmProductions) {
        if (!farmProductions?.length) {
            return {};
        }

        return farmProductions.reduce((acc, p) => {
            acc[p.registerDate.getDate()] = p.milkVolume || 0;
            return acc;
        }, {});
    }

    getMonthlyAverage(farmProductions) {
        if (!farmProductions?.length) {
            return 0;
        }

        const totalVolume = farmProductions.reduce((acc, p) => acc + (p.milkVolume || 0), 0);
        const monthlyAverage = totalVolume / farmProductions.length;

        return monthlyAverage;
    }
}