import { Router } from "express";
import CreateFarmProductionController from "../controllers/farmProduction/createFarmProduction.controller.js";

const createFarmProductionController = new CreateFarmProductionController();

const farmProductionRouter = Router();

farmProductionRouter.post('/', createFarmProductionController.handle.bind(createFarmProductionController));

export { farmProductionRouter };

