import { Router } from "express";
import CreateFarmController from "../controllers/farm/createFarm.controller.js";

const createFarmController = new CreateFarmController();

const farmRouter = Router();

farmRouter.post('/', createFarmController.handle.bind(createFarmController));

export { farmRouter };

