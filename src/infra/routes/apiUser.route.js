import { Router } from "express";
import CreateApiUserController from "../controllers/apiUser/createApiUser.controller.js";
import LoginApiUserController from "../controllers/apiUser/loginApiUser.controller.js";

const createApiUserController = new CreateApiUserController();
const loginApiUserController = new LoginApiUserController();

const apiUserRouter = Router();

/**
 * @swagger
 * /apiUser:
 *   post:
 *     summary: Create a new user
 *     tags: [ApiUser]
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     required:
 *       - name
 *       - email
 *       - password
 *     responses:
 *       200:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ApiUser created successfully"
 *                 apiUserId:
 *                   type: string
 *                   example: "60d5f83b8e6f3c23d8b6eccc"
 *       400:
 *         description: Bad request
 */
apiUserRouter.post('/', createApiUserController.handle.bind(createApiUserController));

/**
 * @swagger
 * /apiUser/login:
 *   post:
 *     tags: [ApiUser]
 *     summary: Login
 *     description: Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     required:
 *       - email
 *       - password
 *     responses:
 *       200:
 *         description: User logged
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDVmODNiOGU2ZjNjMjNkOGI2ZWNjYyIsImlhdCI6MTYyNTY0NjI3MiwiZXhwIjoxNjI1NzMzMDcyfQ.9q1g0wv1xHd8iJH9JmzjY6q7L4J2JYn2KvY1Q7q8"
 *       400:
 *         description: Bad request
 */
apiUserRouter.post('/login', loginApiUserController.handle.bind(loginApiUserController));

export { apiUserRouter };

