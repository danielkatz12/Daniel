const express = require('express') //מוציא מתוך המודיול של express את מה שמוגדר כ-EXPORT ושם במשתנה שיצרתי כאן
const app = express();// למעשה הexspress היא פונקצייה שאנחנו עכשיו קוראים לה
//const router = express.Router(); // כל ראוטר אנחנו יכולים להגדיר בקובץ בנפרד ולחבר אותו לאפליקציה. שלבים=> מייצרים קובץ ראוט עבור אותו שירות אותו אני רוצה לספק => מקבלת מהexpress את הראוטר => עבור הראוטר הזה אני מגדירה את של השירותים אותם אני מספקת עבור אובייקט אחד => בסוף הקובץ עושה export לrouter שלי => לבסוף אני מייבאת את הראוטר הזה בקובץ הראשי (בapp.js במקרה שלנו) ועל מנת להשתמשש בו אני עושה app.use

const dotenv = require("dotenv").config();// כאן אנו טוענים את מה שבקובץ ה- env. למה שנקרא process  (שהוא למעשה הcontext של האפליקצייה- האובייקט הראשי שמריץ את האפליקצייה, ובגלל שהוא הראשי, אז הוא נגיש לכל המודולים באפליקצייה. )
const port = process.env.PORT; //  PROCESS: THE MAIN CONTEXT of the aplication, we can call Process from each file in the project.


const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;//
db.on('error', (error) =>console.log(error)); //יש 2 סוגי בעיות: בעיות בהתחברות הראשונית למשל עקב פורט או כתובת לא נכןנה או שמאיזשהי סיבה אחרת לא הצלחנו להתחבר.כאן המונגוס לא ינסה להתחבר שוב!!! , => סיבה שנייה זה לאחר שכן אנחנו מחוברים לDB פתאום החיבור מפסיק עקב בעיה. כאן המונגוס ינסה להתחבר מחדש!!
db.once('open', () => console.log("Connected to Database"));


// app.get('/', (req, res) => {
//    res.send('Hello World :))') // this is the CALLBACK => what will happend after i will receive the url request
// }); // יכולנו במקום ה get לעשות put delete post בהתאם לבקשה שנרצה לטפל. בנוסף נגדיר את נתיב הURL שנרצה לטפל בבקשה (החל מהדומיין: /)

const  bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));//הוספנו כאן Midellware ראשון אשר תפקידו הוא לחלץ את הפרמטרים אשר מגיעים בURL
app.use(bodyParser.json());//הוספנו כאן Midellware שני אשר תפקידו הוא לחלץ את הפרמטרים בפורמט JSON אשר מגיעים בBody של הבקשה
// שימי לב שחשוב שה- BodyParser יהיה כתוב לפני הROUTING כדי שנחלץ את המידע בפורמט שנרצה לפני שנתחיל להשתמש במידע בפונקציות
// כל המידע שאנחנו מחלצים כאן, יתקבל כפרמטר req בפונקציות הrouting שלנו

const studentRouter = require("./routes/student_route");
app.use('/student', studentRouter);//לבסוף אני מייבאת את הראוטר הזה בקובץ הראשי (בapp.js במקרה שלנו) ועל מנת להשתמשש בו אני עושה app.use

app.listen(port, () => {
   console.log(`App is now listening on port: ${port}!`)
}); // מכניס את האפליקציה שלי למצב של האזנה בלופ כך כשאשר היא מקבלת פניות, אז היא מטפלת בהם

























// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
//
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
//
// var app = express();
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.se
// t('view engine', 'pug');
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;
