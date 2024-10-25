import { Router } from "express";
import CreateFarmProductionController from "../controllers/farmProduction/createFarmProduction.controller.js";
import GetMilkPriceByMonthController from "../controllers/farmProduction/getMilkPriceByMonth.controller.js";
import GetMonthlyAverageByFarmIdController from "../controllers/farmProduction/getMonthlyAverageByFarmId.controller.js";

const createFarmProductionController = new CreateFarmProductionController();
const getMonthlyAverageByFarmIdController = new GetMonthlyAverageByFarmIdController();
const getMilkPriceByMonthController = new GetMilkPriceByMonthController();

const farmProductionRouter = Router();

farmProductionRouter.post('/', createFarmProductionController.handle.bind(createFarmProductionController));
farmProductionRouter.get('/farm/:farmId/monthly-average', getMonthlyAverageByFarmIdController.handle.bind(getMonthlyAverageByFarmIdController));
farmProductionRouter.get('/farm/:farmId/month-price', getMilkPriceByMonthController.handle.bind(getMonthlyAverageByFarmIdController));

export { farmProductionRouter };

