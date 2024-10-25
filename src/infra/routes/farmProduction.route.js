import { Router } from "express";
import CreateFarmProductionController from "../controllers/farmProduction/createFarmProduction.controller.js";
import GetDailyProductionByMonthController from "../controllers/farmProduction/getDailyProductionByMonth.controller.js";
import GetMilkPriceByMonthController from "../controllers/farmProduction/getMilkPriceByMonth.controller.js";
import GetMonthlyMilkPriceByYearController from "../controllers/farmProduction/getMonthlyMilkPriceByYear.controller.js";

const createFarmProductionController = new CreateFarmProductionController();
const getMonthlyAverageByFarmIdController = new GetDailyProductionByMonthController();
const getMilkPriceByMonthController = new GetMilkPriceByMonthController();
const getMonthlyMilkPriceByYearController = new GetMonthlyMilkPriceByYearController();

const farmProductionRouter = Router();

farmProductionRouter.post('/', createFarmProductionController.handle.bind(createFarmProductionController));
farmProductionRouter.get('/farm/:farmId/month-production', getMonthlyAverageByFarmIdController.handle.bind(getMonthlyAverageByFarmIdController));
farmProductionRouter.get('/farm/:farmId/month-price', getMilkPriceByMonthController.handle.bind(getMonthlyAverageByFarmIdController));
farmProductionRouter.get('/farm/:farmId/year-price', getMonthlyMilkPriceByYearController.handle.bind(getMonthlyMilkPriceByYearController));

export { farmProductionRouter };

