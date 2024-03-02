import express from "express";
import reviewController from "../controllers/review_controller";
import authMiddleware from "../common/auth_middleware";

const router = express.Router();

// /**
//  * @swagger
//  * tags:
//  *   name: Reviews
//  *   description: Endpoints for managing reviews
//  *///TODO: WHY IS IT NOT WORKING???


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - comment
 *         - post
 *         - user
 *       properties:
 *         comment:
 *           type: string
 *           description: The comment provided by the user for the post
 *         post:
 *           type: string
 *           description: The ID of the post associated with the review
 *         user:
 *           type: string
 *           description: The ID of the user who created the review
 *       example:
 *         comment: "Great post!"
 *         post: "6123456789abcdef12345678"
 *         user: "6123456789abcdef12345679"
 */

/**
 * @swagger
 * /review/get-post-reviews:
 *   post:
 *     summary: Get reviews by post ID
 *     tags: [Reviews]
 *     requestBody:
 *       description: ID of the post to retrieve reviews for
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       '200':
 *         description: Successfully retrieved reviews
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Review'
 */
router.post("/get-post-reviews", reviewController.getReviewsByPostId.bind(reviewController));

/**
 * @swagger
 * /review:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved all reviews
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Review'
 */
router.get("/", authMiddleware, reviewController.get.bind(reviewController));

/**
 * @swagger
 * /review/{id}:
 *   get:
 *     summary: Get review by ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            $ref: '#/components/schemas/Review'
 *     responses:
 *       '200':
 *         description: Successfully retrieved the review
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Review'
 */
router.get("/:id", authMiddleware, reviewController.getById.bind(reviewController));

/**
 * @swagger
 * /review:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Review data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       '201':
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
router.post("/", authMiddleware, reviewController.insert.bind(reviewController));

/**
 * @swagger
 * /review/{id}:
 *   put:
 *     summary: Update a review by ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            $ref: '#/components/schemas/Review'
 *     requestBody:
 *       description: Updated review data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Review'
 *     responses:
 *       '200':
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
router.put("/:id", authMiddleware, reviewController.putById.bind(reviewController));

/**
 * @swagger
 * /review/{id}:
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            $ref: '#/components/schemas/Review'
 *     responses:
 *       '200':
 *         description: Review deleted successfully
 */
router.delete("/:id", authMiddleware, reviewController.deleteById.bind(reviewController));

export default router;
