import calculateMilkPrice from "../../domain/calc/calculateMilkPrice.js";
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

    async getFarmProductionMonthAverage({farmId, month, year}) {
        const farm = await this.farmRepository.getFarmById(farmId);

        if (!farm) {
            throw new BadRequestError(
                'Farm does not exist',
                'getFarmProductionMonthlyAverage',
                `FarmId: ${farmId}`,
            );
        }

        const farmProductions =  await this.farmProductionRepository.getByFarmAndMonth(farmId, month, year);
        const monthAverage = this.getMonthAverage(farmProductions);
        const dailyVolume = this.getDailyVolume(farmProductions);

        return ({
            monthAverage,
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

    getMilkTotalVolume(farmProductions) {
        if (!farmProductions?.length) {
            return 0;
        }

        return farmProductions.reduce((acc, p) => acc + (p.milkVolume || 0), 0);
    }

    getMonthAverage(farmProductions) {
        if (!farmProductions?.length) {
            return 0;
        }

        const totalVolume = this.getMilkTotalVolume(farmProductions);
        const monthlyAverage = totalVolume / farmProductions.length;

        return monthlyAverage;
    }


    async getMilkPriceByMonth({ farmId, month, year }) {
        const farm = await this.farmRepository.getFarmById(farmId);

        if (!farm) {
            throw new BadRequestError(
                'Farm does not exist',
                'getMilkPriceByMonth',
                `FarmId: ${farmId}`,
            );
        }

        const farmProductions = await this.farmProductionRepository.getByFarmAndMonth(farmId, month, year);
        
        if (!farmProductions?.length) {
            return 0;
        }
        
        const totalMilkVolume = this.getMilkTotalVolume(farmProductions);

        const milkPrice = calculateMilkPrice(totalMilkVolume, farm.distance, month)
        
        return milkPrice || 0;
    }

    async getMilkPriceByYear({ farmId, year }) {
        const farm = await this.farmRepository.getFarmById(farmId);

        if (!farm) {
            throw new BadRequestError(
                'Farm does not exist',
                'getMilkPriceByYear',
                `FarmId: ${farmId}`,
            );
        }

        const prices = [];

        for (let month = 1; month <= 12; month++) {
            const farmProductions = await this.farmProductionRepository.getByFarmAndMonth(farmId, month, year);
            if (!farmProductions?.length) {
                continue;
            }
            const totalMilkVolume = this.getMilkTotalVolume(farmProductions);
            const milkPrice = calculateMilkPrice(totalMilkVolume, farm.distance, month)
            prices.push({
                month,
                price: milkPrice,
                totalMilkVolume,
            });
        }

        return prices;
    }
}