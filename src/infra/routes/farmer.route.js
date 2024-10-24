import { Router } from "express";
import CreateFarmerController from "../controllers/farmer/createFarmer.controller.js";

const createFarmerController = new CreateFarmerController();

const farmerRouter = Router();

farmerRouter.post('/', createFarmerController.handle.bind(createFarmerController));

export { farmerRouter };

