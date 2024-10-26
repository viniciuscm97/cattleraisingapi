import { Router } from "express";
import CreateFarmController from "../controllers/farm/createFarm.controller.js";
import GetFarmsController from "../controllers/farm/getFarms.controller.js";

const createFarmController = new CreateFarmController();
const getFarmsController = new GetFarmsController();

const farmRouter = Router();

/**
 * @swagger
 * /farm:
 *   post:
 *     summary: Create a new farm
 *     tags: [Farm]
 *     description: Create a new farm with name and distance
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               distance:
 *                 type: number
 *     required:
 *       - name
 *       - distance
 *     responses:
 *       201:
 *         description: Farm created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Farmer created successfully"
 *                 farmId:
 *                   type: string
 *                   example: "60d5f83b8e6f3c23d8b6eccc"
 *       400:
 *         description: Bad request
 */
farmRouter.post('/', createFarmController.handle.bind(createFarmController));

/**
 * @swagger
 * /farm:
 *   get:
 *     summary: Get all farms
 *     tags: [Farm]
 *     description: Retrieve a list of all farms
 *     responses:
 *       200:
 *         description: A list of farms
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 farms:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       distance:
 *                         type: number
 *       400:
 *         description: Bad request
 */
farmRouter.get('/', getFarmsController.handle.bind(getFarmsController));

export { farmRouter };

