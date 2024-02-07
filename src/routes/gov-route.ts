import express from "express";

const router = express.Router()

import authMiddleware from "../common/auth_middleware";
import govController from "../controllers/gov-controller";

router.get("/getAllCities", authMiddleware, govController.getAllCities.bind(govController));
router.post("/getStreetsByCityName", authMiddleware, govController.getStreetsByCityName.bind(govController));

export default router
