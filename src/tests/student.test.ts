import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import Student from "../models/student_model";
import {Express} from "express";

let app: Express;
beforeAll(async () => {
    app = await initApp();
    console.log("before all");
    console.log(await Student.deleteMany());
    console.log("after delete many");
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

describe("Student tests", () => {
    let student1 = {
        name: "Daniel",
        _id: "1717"
    };
    test("Test Get All Student without student from DB", async () => {
        const response = await request(app).get("/student");
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual([]);
    });

    test("Test Post/Save Student", async () => {
        const response = await request(app).post("/student").send({name: "Daniel", _id: "1717"});
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("succeeded to save student in post request");

    });

    test("Test All Students with one student in DB", async () => {
        const response = await request(app).get("/student");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        const student = response.body[0];
        expect(student.name).toBe(student1.name);
        expect(student._id).toBe(student1._id);
    });

    test("Test Post/Save The Same Student -> ERROR ", async () => {
        const response = await request(app).post("/student").send({name: student1.name, _id: student1._id});
        expect(response.statusCode).toBe(409);

    });

    test("Test PUT /student/:id", async () => {
        const updatedStudent = {...student1, name: "Daniel Katz"};
        const response = await request(app).put(`/student/${updatedStudent._id}`).send(updatedStudent);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("update successfully the student: ");
        expect(response.body.student.name).toBe(updatedStudent.name);
        student1.name = updatedStudent.name;
    });

    test("Test DELETE /student/:id}", async () => {
       const response = await request(app).delete(`/student/${student1._id}`);
       expect(response.statusCode).toBe(200);
       expect(response.body.message).toBe("Student with ID: " + student1._id + " has been deleted successfully");
       expect(response.body.student._id).toBe(student1._id);
    });
});