import initApp from "./app";
import http from "http";
import fs from "fs";
import https from "https";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const port = process.env.PORT; //  PROCESS: THE MAIN CONTEXT of the aplication, we can call Process from each file in the project.

initApp().then((app) => {
    console.log("in server.js");

    // if (process.env.NODE_ENV == "development") {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Web Advanced Application development 2024 REST API",
                version: "1.0.0",
                description: "REST server including authentication using JWT and refresh token",
            },
            servers: [{url: "http://localhost:3000",},],
        },
        apis: ["./src/routes/*.ts"],
    };
    const specs = swaggerJsDoc(options);
    console.log(specs);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
    // }


    http.createServer(app).listen(port, () => {//כאן אנו מריצים את האפליקציה
        console.log(`App is now listening on port: ${port}!`)
    }); // מכניס את האפליקציה שלי למצב של האזנה בלופ כך כשאשר היא מקבלת פניות, אז היא מטפלת בהם

    // const options = {
    //     key: fs.readFileSync('../client-key.pem'),
    //     cert: fs.readFileSync('../client-cert.pem')
    // };
    // https.createServer(options, app).listen(process.env.HTTPS_PORT);
});

