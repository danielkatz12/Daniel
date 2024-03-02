import express from "express";

const router = express.Router()

import authMiddleware from "../common/auth_middleware";
import govController from "../controllers/gov-controller";


// /**
//  * swagger
//  * tags:
//  *   name: Government
//  *   description: Endpoints for government-related operations
//  *///TODO: WHY IS IT NOT WORKING???

/**
 * @swagger
 * /gov/getAllCities:
 *   post:
 *     summary: Get all cities in Israel
 *     tags: [Government]
 *     description: Retrieve a list of all cities in Israel.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of cities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.post("/getAllCities", authMiddleware, govController.getAllCities.bind(govController));

/**
 * @swagger
 * /gov/getStreetsByCityName:
 *   post:
 *     summary: Get streets by city name
 *     tags: [Government]
 *     description: Retrieve a list of streets in a city by providing its name.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cityName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: A list of streets in the specified city
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.post("/getStreetsByCityName", authMiddleware, govController.getStreetsByCityName.bind(govController));

export default router
