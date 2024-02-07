import initApp from "../app";
import request from "supertest";
import mongoose from "mongoose";
import { Express } from "express";

let app: Express;
// from test1:  http://localhost:3000/public\1707253952043.webp
// /public\1707253952043.webp
let imgUrl = "";
beforeAll(async () => {
    app = await initApp();
    console.log("beforeAll");
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("File Tests", () => {
    test("upload file", async () => {
        const filePath = `${__dirname}/capten.webp`;
        console.log(filePath);

        try {
            const response = await request(app)
                .post("/file?file=123.webp").attach('file', filePath)
            expect(response.statusCode).toEqual(200);
            let url = response.body.url;
            console.log("from test1: ",url);
            url = url.replace(/^.*\/\/[^/]+/, '')
            imgUrl = url;
            console.log("from test2: ",url);
            const res = await request(app).get(url)
            expect(res.statusCode).toEqual(200);
        } catch (err) {
            console.log(err);
            expect(1).toEqual(2);
        }
    });

    test("delete file", async () => {
        const filePath = "/public\\1707255413644.webp";
        console.log(filePath);

        try {
            const response = await request(app)
                .delete("/file/delete-file").send({ fileUrl: filePath })
            expect(response.statusCode).toEqual(200);
        } catch (err) {
            console.log(err);
        }
    });

})
