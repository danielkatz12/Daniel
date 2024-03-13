import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import UserProfileDetailsModel, {UserProfileDetailsData} from "../models/user_profile_details_model";
import {Express} from "express";
import User, {UserData} from "../models/user_model";

let app: Express;
let accessToken: string;
const user = {
    email: "testGov@test.com",
    password: "1234567890",
}
const nameUserProfile = "govUserNameForTest";
let userDetailsProfileForTest: UserProfileDetailsData;

beforeAll(async () => {
    app = await initApp();
    console.log("before all");

    await User.deleteMany({'email': user.email});
    console.log("after delete User with email: " + user.email);

    await request(app).post("/auth/register").send(user);
    const response = await request(app).post("/auth/login").send(user);
    accessToken = response.body.accessToken;
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Gov tests", () => {

    test("Test get all cities", async () => {
        const response = await request(app).post("/gov/getAllCities")
            .set("Authorization", "JWT " + accessToken)
        expect(response.statusCode).toBe(200);

    });

    test("Test get all streets by city name", async () => {
        const response = await request(app)
            .post("/gov/getStreetsByCityName")
            .set("Authorization", "JWT " + accessToken)
            .send({cityName: "חיפה "})
        expect(response.statusCode).toBe(200);

    });

    test("Test get all streets by city name which not exist -> ERROR", async () => {
        const response = await request(app).post("/gov/getStreetsByCityName")
            .set("Authorization", "JWT " + accessToken)
            .send({cityName: "AAA"})
        expect(response.statusCode).toBe(500);

    });

});
