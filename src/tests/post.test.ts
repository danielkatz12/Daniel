import {Express, response} from "express";
import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import Post, { PostData } from "../models/post_model";
import User, { UserData } from "../models/user_model";

let app: Express;
const user: UserData = {
    email: "test@user.post.test",
    password: "1234567890",
}

let postForTest: PostData = {
    user: user,
    street: "street1",
    city: "haifa1",
    imageUrl: "/ppp",
    pricePerDay:70,
    streetNumber:12,
    description:"magnificent"
}
let accessToken = "";

beforeAll(async () => {
    app = await initApp();
    console.log("beforeAll");

    await Post.deleteMany({imageUrl: "/ppp"});
    await User.deleteMany({ 'email': user.email });
    const response = await request(app).post("/auth/register").send(user);
    user._id = response.body._id;
    accessToken = response.body.accessToken;


});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Post tests", () => {
    const addPost = async (post: PostData) => {
        const response = await request(app)
            .post("/post")
            .set("Authorization", "JWT " + accessToken)
            .send(post);
        postForTest = {...postForTest, _id: response.body._id, user: response.body.user}
        expect(response.statusCode).toBe(201);
        expect(response.body.user).toBe(user._id);
        expect(response.body.city).toBe(post.city);
        expect(response.body.street).toBe(post.street);
        expect(response.body.streetNumber).toBe(post.streetNumber);
        expect(response.body.pricePerDay).toBe(post.pricePerDay);
        expect(response.body.imageUrl).toBe(post.imageUrl);
        expect(response.body.description).toBe(post.description);
    };

    test("Test Get All Posts", async () => {
        const response = await request(app).get("/post");
        expect(response.statusCode).toBe(200);
        //expect(response.body).toStrictEqual([]);
    });

    test("Test Get All Posts with additional Information", async () => {
        const response = await request(app).get("/post/get-all");
        expect(response.statusCode).toBe(200);
    });

    test("Test Add Post", async () => {
      await addPost(postForTest);
    });

    test("Test Get All Posts with one post in DB", async () => {
        const response = await request(app).get(`/post/${postForTest._id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.user).toBe(postForTest.user);
        expect(response.body.city).toBe(postForTest.city);
        expect(response.body.street).toBe(postForTest.street);
        expect(response.body.streetNumber).toBe(postForTest.streetNumber);
        expect(response.body.pricePerDay).toBe(postForTest.pricePerDay);
        expect(response.body.imageUrl).toBe(postForTest.imageUrl);
        expect(response.body.description).toBe(postForTest.description);
    });

    test("Test Delete Post By Id", async () => {
        const response = await request(app)
            .delete(`/post/${postForTest._id}`)
            .set("Authorization", "JWT " + accessToken)
        expect(response.statusCode).toBe(200);
    });

    test("Test Delete Post By Id -> ERROR DB CONNECTION", async () => {
        await mongoose.connection.close();
        const response = await request(app)
            .delete(`/post/${postForTest._id}`)
            .set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(500);
    });

});


// import { Express } from "express";
// import request from "supertest";
// import initApp from "../app";
// import mongoose from "mongoose";
// import StudentPost, { IStudentPost } from "../models/student_post_model";
// import User, { IUser } from "../models/user_model";
//
// let app: Express;
// const user: IUser = {
//     email: "test@student.post.test",
//     password: "1234567890",
// }
// let accessToken = "";
//
// beforeAll(async () => {
//     app = await initApp();
//     console.log("beforeAll");
//     await StudentPost.deleteMany();
//
//     await User.deleteMany({ 'email': user.email });
//     const response = await request(app).post("/auth/register").send(user);
//     user._id = response.body._id;
//     const response2 = await request(app).post("/auth/login").send(user);
//     accessToken = response2.body.accessToken;
// });
//
// afterAll(async () => {
//     await mongoose.connection.close();
// });
//
// const post1: IStudentPost = {
//     title: "title1",
//     message: "message1",
//     owner: "1234567890",
// };
//
// describe("Student post tests", () => {
//     const addStudentPost = async (post: IStudentPost) => {
//         const response = await request(app)
//             .post("/studentpost")
//             .set("Authorization", "JWT " + accessToken)
//             .send(post);
//         expect(response.statusCode).toBe(201);
//         expect(response.body.owner).toBe(user._id);
//         expect(response.body.title).toBe(post.title);
//         expect(response.body.message).toBe(post.message);
//     };
//
//     test("Test Get All Student posts - empty response", async () => {
//         const response = await request(app).get("/studentpost");
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toStrictEqual([]);
//     });
//
//     test("Test Post Student post", async () => {
//         addStudentPost(post1);
//     });
//
//     test("Test Get All Students posts with one post in DB", async () => {
//         const response = await request(app).get("/studentpost");
//         expect(response.statusCode).toBe(200);
//         const rc = response.body[0];
//         expect(rc.title).toBe(post1.title);
//         expect(rc.message).toBe(post1.message);
//         expect(rc.owner).toBe(user._id);
//     });
//
// });
