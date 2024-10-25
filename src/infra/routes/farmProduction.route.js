import { Router } from "express";
import CreateFarmProductionController from "../controllers/farmProduction/createFarmProduction.controller.js";
import GetMonthlyAverageByFarmIdController from "../controllers/farmProduction/getMonthlyAverageByFarmId.controller.js";

const createFarmProductionController = new CreateFarmProductionController();
const getMonthlyAverageByFarmIdController = new GetMonthlyAverageByFarmIdController();

const farmProductionRouter = Router();

farmProductionRouter.post('/', createFarmProductionController.handle.bind(createFarmProductionController));
farmProductionRouter.get('/:farmId/monthly-average', getMonthlyAverageByFarmIdController.handle.bind(getMonthlyAverageByFarmIdController));
export { farmProductionRouter };

