import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import UserProfileDetailsModel, {UserProfileDetailsData} from "../models/user_profile_details_model";
import {Express} from "express";
import User, {UserData} from "../models/user_model";

let app: Express;
let accessToken: string;
const user = {
    email: "testStudent@test.com",
    password: "1234567890",
}
const nameUserProfile = "user name for test";
let userDetailsProfileForTest: UserProfileDetailsData;

beforeAll(async () => {
    app = await initApp();
    console.log("before all");
    // await UserProfileDetailsModel.deleteMany();//i dont delete all UserProfileDetails because it is the production db...
    await UserProfileDetailsModel.deleteMany({name: nameUserProfile});
    console.log("after delete many");

    User.deleteMany({'email': user.email});
    await request(app).post("/auth/register").send(user);
    const response = await request(app).post("/auth/login").send(user);
    accessToken = response.body.accessToken;
});

afterAll(async () => {
    await mongoose.connection.close();//סוגרת את החיבור מול הDB
});// אופציה ראשונה להשתמש בASYNC & AWAIT

// afterAll((done) => {
//   const promise = mongoose.connection.close();
//   promise.then(() => {
//       done();
//   });
// });// אופציה שנייה להשתמש ב PROMISE


const userProfileDetails1 = {
    name: nameUserProfile,
};

describe("User-Profile-Details tests", () => {
    test("Test Get All User-Profile-Details without user-profile-details from DB", async () => {
        const response = await request(app).get("/user-profile-details").set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
        //expect(response.body).toStrictEqual([]);
    });

    test("Test Post/Save User-Profile-Details", async () => {
        const response = await request(app).post("/user-profile-details")
            .set("Authorization", "JWT " + accessToken)
            .send(userProfileDetails1);
        userDetailsProfileForTest = response.body;
        expect(response.statusCode).toBe(201);
        // expect(response.body.message).toBe("succeeded to save student in post request");

    });

    test("Test Get All User-Profile-Details tests with one user-profile-details in DB", async () => {
        const response = await request(app).get("/user-profile-details").set("Authorization", "JWT " + accessToken)
            .query({name: userProfileDetails1.name});
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        const userProfilesDetailsData = response.body[0];
        // expect(response.body.length).toBeGreaterThanOrEqual(1);
        //const userProfilesDetailsData: UserProfileDetailsData[] = response.body;
        //const student = userProfilesDetailsData.find((value: UserProfileDetailsData) => value._id == userDetailsProfileForTest._id);
        expect(userProfilesDetailsData.name).toBe(userDetailsProfileForTest.name);
        expect(userProfilesDetailsData._id).toBe(userDetailsProfileForTest._id);
    });

    test("Test GetById User-Profile-Details tests", async () => {
        const response = await request(app).get(`/user-profile-details/${userDetailsProfileForTest._id}`).set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        const userProfilesDetailsData = response.body[0];
        expect(userProfilesDetailsData.name).toBe(userDetailsProfileForTest.name);
        expect(userProfilesDetailsData._id).toBe(userDetailsProfileForTest._id);
    });

    test("Test Post/Save The Same User-Profile-Details -> ERROR ", async () => {
        const response = await request(app).post("/user-profile-details")
            .set("Authorization", "JWT " + accessToken)
            .send({name: userDetailsProfileForTest.name, _id: userDetailsProfileForTest._id});
        expect(response.statusCode).toBe(409);

    });

    test("Test PUT /user-profile-details/:id", async () => {
        const updatedStudent = {...userDetailsProfileForTest, name: "Daniel Katz"};
        const response = await request(app).put(`/user-profile-details/${userDetailsProfileForTest._id}`)
            .set("Authorization", "JWT " + accessToken)
            .send(updatedStudent);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("update successfully the object: ");
        expect(response.body.student.name).toBe(updatedStudent.name);
        userDetailsProfileForTest.name = updatedStudent.name;
    });

    test("Test DELETE /user-profile-details/:id}", async () => {
        const response = await request(app).delete(`/user-profile-details/${userDetailsProfileForTest._id}`).set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Object with ID: " + userDetailsProfileForTest._id + " has been deleted successfully");
        expect(response.body.student._id).toBe(userDetailsProfileForTest._id);
    });

    test("Test Get All User-Profile-Details tests with one user-profile-details-> ERROR", async () => {
        await mongoose.connection.close();//סוגרת את החיבור מול הDB
        const response = await request(app).get("/user-profile-details")
            .set("Authorization", "JWT " + accessToken)
            .query({name: userProfileDetails1});
        expect(response.statusCode).toBe(500);
    });
    test("Test GetById User-Profile-Details tests -> ERROR", async () => {
        const response = await request(app).get(`/user-profile-details/${userDetailsProfileForTest._id}`).set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(500);
    });
    test("Test PUT /user-profile-details/:id  ->ERROR", async () => {
        const updatedStudent = {...userDetailsProfileForTest, name: "Daniel Katz"};
        const response = await request(app).put(`/user-profile-details/${userDetailsProfileForTest._id}`)
            .set("Authorization", "JWT " + accessToken)
            .send(updatedStudent);
        expect(response.statusCode).toBe(500);
    });

    test("Test DELETE /user-profile-details/:id  ->ERROR", async () => {
        const response = await request(app).delete(`/user-profile-details/${userDetailsProfileForTest._id}`).set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(500);
    });
});
