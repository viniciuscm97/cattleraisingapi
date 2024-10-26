import FarmServive from "../../../application/services/farm.service.js";

export default class GetFarmsController {
    constructor() {
        this.farmService = new FarmServive();
    }

    async handle(req, res) {

        const farms = await this.farmService.getFarms();

        return res.status(200).send({
            farms,
        })
    }   
}