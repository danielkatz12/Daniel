import express from "express";

const router = express.Router();
import studentPostController from "../controllers/student_post_controller";
import authMiddleware from "../common/auth_middleware";


// /**
//  * @swagger
//  * tags:
//  * name: Student Posts
//  * description: API for managing student posts
//  */   //TODO:TO FIND OUT WHY IS IT NOT WORKING IF I HAVE MORE THAN ONE LIKE THIS??


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     StudentPost:
 *       type: object
 *       required:
 *         - title
 *         - message
 *         - owner
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the student post
 *         message:
 *           type: string
 *           description: The content of the student post
 *         owner:
 *           type: string
 *           description: The ID of the user who created the post
 *       example:
 *         title: 'Sample Post'
 *         message: 'This is a sample post.'
 *         owner: 'user123'
 */

/**
 * @swagger
 * /studentpost:
 *   get:
 *     summary: Get all student posts
 *     tags: [Student Posts]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentPost'
 */
router.get("/", studentPostController.get.bind(studentPostController));

/**
 * @swagger
 * /studentpost/{id}:
 *   post:
 *     summary: Create a new student post
 *     tags: [Student Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Student post data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentPost'
 *     responses:
 *       '201':
 *         description: Student post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentPost'
 */
router.get("/:id", studentPostController.getById.bind(studentPostController));
router.post("/", authMiddleware, studentPostController.post.bind(studentPostController));
router.put("/:id", authMiddleware, studentPostController.putById.bind(studentPostController));
router.delete("/:id", authMiddleware, studentPostController.deleteById.bind(studentPostController));

export default router;