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

/**
 * @swagger
 * /farmProduction:
 *   post:
 *     summary: Create a new farm production entry
 *     tags: [FarmProduction]
 *     description: Record daily milk production for a farm
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               farmId:
 *                 type: string
 *               registerDate:
 *                 type: string
 *                 format: date
 *               milkVolume:
 *                 type: number
 *     required:
 *       - farmId
 *       - registerDate
 *       - milkVolume
 *     responses:
 *       201:
 *         description: Farm production created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Farm production created successfully"
 *       400:
 *         description: Bad request
 */
farmProductionRouter.post('/', createFarmProductionController.handle.bind(createFarmProductionController));

/**
 * @swagger
 * /farmProduction/farm/{farmId}/month-production:
 *   get:
 *     summary: Get daily milk production by month
 *     tags: [FarmProduction]
 *     description: Retrieve daily milk volume and monthly average for a specific farm
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: farmId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: number
 *         description: Month in numeric format (1-12)
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Daily production and monthly average retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dailyVolume:
 *                   type: array
 *                   items:
 *                     type: number
 *                 monthAverage:
 *                   type: number
 *       400:
 *         description: Bad request
 */
farmProductionRouter.get('/farm/:farmId/month-production', getMonthlyAverageByFarmIdController.handle.bind(getMonthlyAverageByFarmIdController));

/**
 * @swagger
 * /farmProduction/farm/{farmId}/month-price:
 *   get:
 *     summary: Get milk price by month
 *     tags: [FarmProduction]
 *     description: Retrieve milk price in BRL and USD for a specific farm in a specific month
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: farmId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Milk price retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 priceInBRL:
 *                   type: string
 *                   example: "R$ 4,50"
 *                 priceInUSD:
 *                   type: string
 *                   example: "$1.00"
 *       400:
 *         description: Bad request
 */
farmProductionRouter.get('/farm/:farmId/month-price', getMilkPriceByMonthController.handle.bind(getMilkPriceByMonthController));

/**
 * @swagger
 * /farmProduction/farm/{farmId}/year-price:
 *   get:
 *     summary: Get monthly milk price by year
 *     tags: [FarmProduction]
 *     description: Retrieve milk prices by month for a specific farm in a specific year
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: farmId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Monthly milk prices retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 monthPrice:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                       totalMilkVolume:
 *                         type: number
 *                       priceInBRL:
 *                         type: string
 *                         example: "R$ 4,50"
 *                       priceInUSD:
 *                         type: string
 *                         example: "$1.00"
 *       400:
 *         description: Bad request
 */
farmProductionRouter.get('/farm/:farmId/year-price', getMonthlyMilkPriceByYearController.handle.bind(getMonthlyMilkPriceByYearController));

export { farmProductionRouter };

