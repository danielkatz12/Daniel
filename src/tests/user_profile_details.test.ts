// import request from "supertest";
// import initApp from "../app";
// import mongoose from "mongoose";
// import UserProfileDetailsModel, {UserProfileDetailsData} from "../models/user_profile_details_model";
// import {Express} from "express";
// import User from "../models/user_model";
//
// let app: Express;
// let accessToken: string;
// const user = {
//     email: "testStudent@test.com",
//     password: "1234567890",
// }
// beforeAll(async () => {
//     app = await initApp();
//     console.log("before all");
//     await UserProfileDetailsModel.deleteMany();
//     console.log("after delete many");
//
//     User.deleteMany({ 'email': user.email });
//     await request(app).post("/auth/register").send(user);
//     const response = await request(app).post("/auth/login").send(user);
//     accessToken = response.body.accessToken;
// });
//
// afterAll(async () => {
//     await mongoose.connection.close();//סוגרת את החיבור מול הDB
// });// אופציה ראשונה להשתמש בASYNC & AWAIT
//
// // afterAll((done) => {
// //   const promise = mongoose.connection.close();
// //   promise.then(() => {
// //       done();
// //   });
// // });// אופציה שנייה להשתמש ב PROMISE
//
// const student1: UserProfileDetailsData = {
//     name: "Daniel",
//     _id: "1717",
// };
//
// describe("Student tests", () => {
//     test("Test Get All Student without student from DB", async () => {
//         const response = await request(app).get("/student").set("Authorization", "JWT " + accessToken);
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toStrictEqual([]);
//     });
//
//     test("Test Post/Save Student", async () => {
//         const response = await request(app).post("/student")
//             .set("Authorization", "JWT " + accessToken)
//             .send(student1);
//         expect(response.statusCode).toBe(201);
//         // expect(response.body.message).toBe("succeeded to save student in post request");
//
//     });
//
//     test("Test All Students with one student in DB", async () => {
//         const response = await request(app).get("/student") .set("Authorization", "JWT " + accessToken);
//         expect(response.statusCode).toBe(200);
//         expect(response.body.length).toBe(1);
//         const student = response.body[0];
//         expect(student.name).toBe(student1.name);
//         expect(student._id).toBe(student1._id);
//     });
//
//     test("Test Post/Save The Same Student -> ERROR ", async () => {
//         const response = await request(app).post("/student")
//             .set("Authorization", "JWT " + accessToken)
//             .send({name: student1.name, _id: student1._id});
//         expect(response.statusCode).toBe(409);
//
//     });
//
//     test("Test PUT /student/:id", async () => {
//         const updatedStudent = {...student1, name: "Daniel Katz"};
//         const response = await request(app).put(`/student/${updatedStudent._id}`)
//             .set("Authorization", "JWT " + accessToken)
//             .send(updatedStudent);
//         expect(response.statusCode).toBe(200);
//         expect(response.body.message).toBe("update successfully the student: ");
//         expect(response.body.student.name).toBe(updatedStudent.name);
//         student1.name = updatedStudent.name;
//     });
//
//     test("Test DELETE /student/:id}", async () => {
//        const response = await request(app).delete(`/student/${student1._id}`).set("Authorization", "JWT " + accessToken);
//        expect(response.statusCode).toBe(200);
//        expect(response.body.message).toBe("Student with ID: " + student1._id + " has been deleted successfully");
//        expect(response.body.student._id).toBe(student1._id);
//     });
// });
