import { Router } from "express";
import CreateFarmerController from "../controllers/farmer/createFarmer.controller.js";

const createFarmerController = new CreateFarmerController();

const farmerRouter = Router();

/**
 * @swagger
 * /farmer:
 *   post:
 *     summary: Create a new farmer
 *     tags: [Farmer]
 *     description: Create a new farmer with name, email, and associated farm ID
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
 *               farmId:
 *                 type: string
 *     required:
 *       - name
 *       - email
 *       - farmId
 *     responses:
 *       201:
 *         description: Farmer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Farmer created successfully"
 *       400:
 *         description: Bad request
 */
farmerRouter.post('/', createFarmerController.handle.bind(createFarmerController));

export { farmerRouter };

