import express from "express";

const router = express.Router();// כל ראוטר אנחנו יכולים להגדיר בקובץ בנפרד ולחבר אותו לאפליקציה. שלבים=> מייצרים קובץ ראוט עבור אותו שירות אותו אני רוצה לספק => מקבלת מהexpress את הראוטר => עבור הראוטר הזה אני מגדירה את של השירותים אותם אני מספקת עבור אובייקט אחד (הראוטר) => בסוף הקובץ עושה export לrouter שלי => לבסוף אני מייבאת את הראוטר הזה בקובץ הראשי (בapp.js במקרה שלנו) ועל מנת להשתמשש בו אני עושה app.use

/**
 router.get("/", function (req, res){
 res.send("get Student");
 });//עבור הראוטר הזה אני מגדירה את של השירותים אותם אני מספקת עבור אובייקט אחד (הראוטר)

 router.post("/", (req, res) => {
 res.send("post Student");
 });//עבור הראוטר הזה אני מגדירה את של השירותים אותם אני מספקת עבור אובייקט אחד (הראוטר)

 module.exports = router;//עושה export לrouter שלי

 */

// import Student from "../controllers/student_controller";
// import userProfileDetailsController from "../controllers/user_profile_details_controller";
import authMiddleware from "../common/auth_middleware";
import userProfileDetailsController from "../controllers/user_profile_details_controller"

// /**
//  * @swagger
//  * tags:
//  *   name: UserProfileDetails
//  *   description: Operations related to user profile details
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
 *     UserProfileDetails:
 *       type: object
 *       required:
 *         - name
 *         - user
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user profile
 *         profileImage:
 *           type: string
 *           description: URL of the user's profile image
 *         contactEmail:
 *           type: string
 *           description: Contact email of the user
 *         contactPhoneNumber:
 *           type: number
 *           description: Contact phone number of the user
 *         age:
 *           type: number
 *           description: Age of the user
 *         user:
 *           type: string
 *           description: ID of the associated user
 *       example:
 *         name: John Doe
 *         profileImage: https://example.com/profile.jpg
 *         contactEmail: john.doe@example.com
 *         contactPhoneNumber: 1234567890
 *         age: 30
 *         user: 6123456789abcdef12345678
 */

/**
 * @swagger
 * /user-profile-details:
 *   get:
 *     summary: Get all user profile details
 *     tags: [UserProfileDetails]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of user profile details
 */
router.get("/", authMiddleware, userProfileDetailsController.get.bind(userProfileDetailsController));

/**
 * @swagger
 * /user-profile-details/{id}:
 *   get:
 *     summary: Get user profile details by ID
 *     tags: [UserProfileDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user profile details to retrieve
 *         schema:
 *            $ref: '#/components/schemas/UserProfileDetails'
 *     responses:
 *       '200':
 *         description: User profile details found
 *       '404':
 *         description: User profile details not found
 */
router.get("/:id", authMiddleware, userProfileDetailsController.getById.bind(userProfileDetailsController));

/**
 * @swagger
 * /user-profile-details/user/{id}:
 *   get:
 *     summary: Get user profile details by user ID
 *     tags: [UserProfileDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve profile details
 *         schema:
 *           $ref: '#/components/schemas/UserProfileDetails'
 *     responses:
 *       '200':
 *         description: User profile details found
 *       '404':
 *         description: User profile details not found
 */
router.get("/user/:id", authMiddleware, userProfileDetailsController.getByUserId.bind(userProfileDetailsController));

/**
 * @swagger
 * /user-profile-details:
 *   post:
 *     summary: Create a new user profile details
 *     tags: [UserProfileDetails]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfileDetails'
 *     responses:
 *       '200':
 *         description: User profile details created successfully
 */
router.post("/", authMiddleware, userProfileDetailsController.insert.bind(userProfileDetailsController));

/**
 * @swagger
 * /user-profile-details/{id}:
 *   put:
 *     summary: Update user profile details by ID
 *     tags: [UserProfileDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user profile details to update
 *         schema:
 *           $ref: '#/components/schemas/UserProfileDetails'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfileDetails'
 *     responses:
 *       '200':
 *         description: User profile details updated successfully
 *       '404':
 *         description: User profile details not found
 */
router.put("/:id", authMiddleware, userProfileDetailsController.putById.bind(userProfileDetailsController));

/**
 * @swagger
 * /user-profile-details/user/{id}:
 *   put:
 *     summary: Update user profile details by user ID
 *     tags: [UserProfileDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update profile details
 *         schema:
 *           $ref: '#/components/schemas/UserProfileDetails'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfileDetails'
 *     responses:
 *       '200':
 *         description: User profile details updated successfully
 *       '404':
 *         description: User profile details not found
 */
router.put("/user/:id", authMiddleware, userProfileDetailsController.updateByUserId.bind(userProfileDetailsController));

/**
 * @swagger
 * /user-profile-details/{id}:
 *   delete:
 *     summary: Delete user profile details by ID
 *     tags: [UserProfileDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user profile details to delete
 *         schema:
 *           $ref: '#/components/schemas/UserProfileDetails'
 *     responses:
 *       '200':
 *         description: User profile details deleted successfully
 *       '404':
 *         description: User profile details not found
 */
router.delete("/:id", authMiddleware, userProfileDetailsController.deleteById.bind(userProfileDetailsController));


// router.get("/", Student.getAllStudents);
// router.get("/:id", Student.getStudentById);
// router.post("/", Student.postStudent);
// router.put("/:id", Student.putStudentById);
// router.delete("/:id", Student.deleteStudentById);


export default router;
