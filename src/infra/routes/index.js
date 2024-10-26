import { Router } from "express";
import { authJwtMiddleware } from "../../middlewares/authJwt.middleware.js";
import { apiUserRouter } from "./apiUser.route.js";
import { farmRouter } from "./farm.route.js";
import { farmerRouter } from "./farmer.route.js";
import { farmProductionRouter } from "./farmProduction.route.js";

const indexRouter = Router();

indexRouter.use('/farm', authJwtMiddleware, farmRouter);
indexRouter.use('/farmer', authJwtMiddleware, farmerRouter);
indexRouter.use('/farm-production', authJwtMiddleware, farmProductionRouter);
indexRouter.use('/api-user', apiUserRouter);
export { indexRouter };

