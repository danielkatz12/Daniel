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

router.get("/", authMiddleware, userProfileDetailsController.get.bind(userProfileDetailsController));
router.get("/:id", authMiddleware, userProfileDetailsController.getById.bind(userProfileDetailsController));
router.post("/", authMiddleware, userProfileDetailsController.post.bind(userProfileDetailsController));
router.put("/:id", authMiddleware, userProfileDetailsController.putById.bind(userProfileDetailsController));
router.delete("/:id", authMiddleware, userProfileDetailsController.deleteById.bind(userProfileDetailsController));


// router.get("/", Student.getAllStudents);
// router.get("/:id", Student.getStudentById);
// router.post("/", Student.postStudent);
// router.put("/:id", Student.putStudentById);
// router.delete("/:id", Student.deleteStudentById);


export default router;
