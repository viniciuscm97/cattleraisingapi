import { Router } from "express";
import { farmRouter } from "./farm.route.js";
import { farmerRouter } from "./farmer.route.js";
import { farmProductionRouter } from "./farmProduction.route.js";

const indexRouter = Router();

indexRouter.use('/farm', farmRouter);
indexRouter.use('/farmer', farmerRouter);
indexRouter.use('/farm-production', farmProductionRouter);

export { indexRouter };

