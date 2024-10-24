import FarmModel from "../../domain/models/farm.model";

const farmModel = new FarmModel();
export default class FarmRepository {
    constructor() {
        this.farmModel = farmModel.execute();
    }
    
    async createFarm({
        name,
    }) {
        return this.farmModel.create({
            name,
        });
    }
    
    async getFarmName(name) {
        return (await this.farmModel).findOne({ name });
    }
}