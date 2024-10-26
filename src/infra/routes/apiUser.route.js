import { Router } from "express";
import CreateApiUserController from "../controllers/apiUser/createApiUser.controller.js";
import LoginApiUserController from "../controllers/apiUser/loginApiUser.controller.js";

const createApiUserController = new CreateApiUserController();
const loginApiUserController = new LoginApiUserController();

const apiUserRouter = Router();

apiUserRouter.post('/', createApiUserController.handle.bind(createApiUserController));
apiUserRouter.post('/login', loginApiUserController.handle.bind(loginApiUserController));

export { apiUserRouter };

