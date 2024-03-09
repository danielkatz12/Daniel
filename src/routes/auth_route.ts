import express from "express";
const router = express.Router();
import authController from "../controllers/auth_controller";

/**
 * @swagger
 * tags:
 * name: Auth
 * description: The Authentication API
 */


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
 *     User:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *         refreshTokens:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of refresh tokens associated with the user
 *       example:
 *         email: 'bob@gmail.com'
 *         password: '123456'
 *         refreshTokens: ['134r2134cr1x3c']
 */


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: registers a new user by email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /auth/google:
 *   post:
 *     summary: Sign in with Google
 *     tags: [Auth]
 *     description: Sign in with Google account
 *     responses:
 *       '200':
 *         description: User signed in successfully. return the userId, email, access and refresh token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post("/google", authController.googleSignin);//TODO: add Swagger comments!!!


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: user sign by email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User signed in successfully. return the userId, email, access and refresh token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out
 *     tags: [Auth]
 *     description: Log out a user by providing the refresh token in the request body
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Logout completed successfully
 */
router.get("/logout", authController.logout);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     description: Endpoint to refresh the access token using a refresh token provided in the request body
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Access token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get("/refresh", authController.refresh);

export default router;
