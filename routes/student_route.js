const express = require("express");
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

const Student = require("../controllers/student_controller");

router.get("/", Student.getAllStudents);
router.get("/:id", Student.getStudentById);
router.post("/", Student.postStudent);
router.put("/:id", Student.putStudentById);
router.delete("/:id", Student.deleteStudentById);


module.exports = router;
