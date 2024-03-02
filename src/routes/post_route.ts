import express from "express";

const router = express.Router();
import PostController from "../controllers/post_controller";
import authMiddleware from "../common/auth_middleware";


// /**
//  * @swagger
//  * tags:
//  * name: Posts
//  * description: API for managing posts
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
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - city
 *         - street
 *         - streetNumber
 *         - description
 *         - imageUrl
 *         - pricePerDay
 *         - user
 *       properties:
 *         city:
 *           type: string
 *           description: The city where the post is located
 *         street:
 *           type: string
 *           description: The street where the post is located
 *         streetNumber:
 *           type: number
 *           description: The street number where the post is located
 *         description:
 *           type: string
 *           description: The description of the post
 *         imageUrl:
 *           type: string
 *           description: The URL of the image associated with the post
 *         pricePerDay:
 *           type: number
 *           description: The price per day for the post
 *         user:
 *           type: string
 *           description: The ID of the user who created the post
 *       example:
 *         city: "New York"
 *         street: "Broadway"
 *         streetNumber: 123
 *         description: "Luxury apartment in downtown"
 *         imageUrl: "https://example.com/image.jpg"
 *         pricePerDay: 100
 *         user: "user123"
 */

/**
 * @swagger
 * /post:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get("/", PostController.get.bind(PostController));

/**
 * @swagger
 * /post/get-all:
 *   get:
 *     summary: Get all posts with user details and review counts
 *     tags: [Posts]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   city:
 *                     type: string
 *                   street:
 *                     type: string
 *                   streetNumber:
 *                     type: integer
 *                   description:
 *                     type: string
 *                   imageUrl:
 *                     type: string
 *                   pricePerDay:
 *                     type: number
 *                   user:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       email:
 *                         type: string
 *                       userProfileDetails:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           profileImage:
 *                             type: string
 *                           contactEmail:
 *                             type: string
 *                           contactPhoneNumber:
 *                             type: string
 *                           age:
 *                             type: integer
 *                   reviewCounts:
 *                     type: integer
 *               example:
 *                 - _id: "65c596d4a3f039bf0ad4825b"
 *                   city: "New York"
 *                   street: "Broadway"
 *                   streetNumber: 123
 *                   description: "Spacious apartment with a stunning view"
 *                   imageUrl: "http://example.com/image.jpg"
 *                   pricePerDay: 150
 *                   user:
 *                     _id: "65c5949da3f039bf0ad48250"
 *                     email: "john.doe@example.com"
 *                     userProfileDetails:
 *                       name: "John Doe"
 *                       profileImage: "http://example.com/profile.jpg"
 *                       contactEmail: "john.doe@example.com"
 *                       contactPhoneNumber: "1234567890"
 *                       age: 30
 *                   reviewCounts: 5
 */
router.get("/get-all", PostController.getAllPosts.bind(PostController));

/**
 * @swagger
 * /post:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Post data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       '201':
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.post("/", authMiddleware, PostController.insert.bind(PostController));

/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to get
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.get("/:id", PostController.getById.bind(PostController));

/**
 * @swagger
 * /post/{id}:
 *   put:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to update
 *     requestBody:
 *       description: Post data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       '200':
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.put("/:id", authMiddleware, PostController.putById.bind(PostController));

/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to delete
 *     responses:
 *       '200':
 *         description: Post deleted successfully
 *       '404':
 *         description: Post not found
 */
router.delete("/:id", authMiddleware, PostController.deleteById.bind(PostController));




export default router;
