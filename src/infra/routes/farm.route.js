import { Router } from "express";
import CreateFarmController from "../controllers/farm/createFarm.controller.js";
import GetFarmsController from "../controllers/farm/getFarms.controller.js";

const createFarmController = new CreateFarmController();
const getFarmsController = new GetFarmsController();

const farmRouter = Router();

farmRouter.post('/', createFarmController.handle.bind(createFarmController));
farmRouter.get('/', getFarmsController.handle.bind(getFarmsController));

export { farmRouter };

