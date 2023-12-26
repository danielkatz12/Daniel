import initApp from "./app";
const port = process.env.PORT; //  PROCESS: THE MAIN CONTEXT of the aplication, we can call Process from each file in the project.

initApp().then((app) => {
    console.log("inn server.js");

    app.listen(port, () => {//כאן אנו מריצים את האפליקציה
        console.log(`App is now listening on port: ${port}!`)
    }); // מכניס את האפליקציה שלי למצב של האזנה בלופ כך כשאשר היא מקבלת פניות, אז היא מטפלת בהם
});

