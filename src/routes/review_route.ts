import express from "express";
import reviewController from "../controllers/review_controller";
import authMiddleware from "../common/auth_middleware";

const router = express.Router();
router.post("/get-post-reviews", reviewController.getReviewsByPostId.bind(reviewController));
router.get("/", authMiddleware, reviewController.get.bind(reviewController));
router.get("/:id", authMiddleware, reviewController.getById.bind(reviewController));
router.post("/", authMiddleware, reviewController.insert.bind(reviewController));
router.put("/:id", authMiddleware, reviewController.putById.bind(reviewController));
router.delete("/:id", authMiddleware, reviewController.deleteById.bind(reviewController));

export default router;
