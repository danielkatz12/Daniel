import initApp from "./app";
import http from "http";
import fs from "fs";
import https from "https";
const port = process.env.PORT; //  PROCESS: THE MAIN CONTEXT of the aplication, we can call Process from each file in the project.

initApp().then((app) => {
    console.log("in server.js");

    if (process.env.NODE_ENV !== 'production') {
        console.log('development');
        http.createServer(app).listen(port, () => {//כאן אנו מריצים את האפליקציה
            console.log(`App is now listening on port: ${port}!`)
        }); // מכניס את האפליקציה שלי למצב של האזנה בלופ כך כשאשר היא מקבלת פניות, אז היא מטפלת בהם
    }

    const options = {
        key: fs.readFileSync('../client-key.pem'),
        cert: fs.readFileSync('../client-cert.pem')
    };
    https.createServer(options, app).listen(process.env.HTTPS_PORT);
});

