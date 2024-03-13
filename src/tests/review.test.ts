import {Express, response} from "express";
import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import Post, { PostData } from "../models/post_model";
import User, { UserData } from "../models/user_model";
import Review, {ReviewData} from "../models/review-model";

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

let reviewForTest: ReviewData = {
    user: user,
    post: postForTest,
    comment: "test comment"
}

let accessToken = "";

beforeAll(async () => {
    app = await initApp();
    console.log("beforeAll");

    await Post.deleteMany({imageUrl: "/ppp"});
    await User.deleteMany({ 'email': user.email });
    const response = await request(app).post("/auth/register").send(user);
    user._id = response.body._id;
    reviewForTest.user = response.body._id;
    accessToken = response.body.accessToken;
    const response2 = await request(app)
        .post("/post")
        .set("Authorization", "JWT " + accessToken)
        .send(postForTest);
    postForTest = {...postForTest, _id: response2.body._id, user: response2.body.user}
    reviewForTest.post = response2.body._id;


});

afterAll(async () => {
    await Review.deleteMany({user: reviewForTest.user})
    await mongoose.connection.close();
});

describe("Review tests", () => {

    test("Test Get All Reviews", async () => {
        const response = await request(app).get("/review")
            .set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
    });

    test("Test Add new Review", async () => {
        const response = await request(app).post("/review")
            .set("Authorization", "JWT " + accessToken)
            .send(reviewForTest);
        expect(response.statusCode).toBe(201);
        reviewForTest._id = response.body._id;
    });

    test("Test Get All Reviews By postId", async () => {
        const response = await request(app).post("/review/get-post-reviews")
            .send({postId: reviewForTest.post});
        expect(response.statusCode).toBe(200);
    });

    test("Test Get Review by reviewId", async () => {
        const response = await request(app).get(`/review/${reviewForTest._id}`)
            .set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
        expect(response.body.user).toBe(reviewForTest.user);
        expect(response.body.post).toBe(reviewForTest.post);
        expect(response.body.comment).toBe(reviewForTest.comment);
    });

    test("Test Get All Reviews By postId ->NOT CONNECTED ERROR", async () => {
        await mongoose.connection.close();
        const response = await request(app).post("/review/get-post-reviews")
            .send({postId: reviewForTest.post});
        expect(response.statusCode).toBe(500);
    });



    // test("Test Delete Post By Id", async () => {
    //     const response = await request(app)
    //         .delete(`/post/${postForTest._id}`)
    //         .set("Authorization", "JWT " + accessToken)
    //     expect(response.statusCode).toBe(200);
    // });


    // test("Test Get All Reviews By postId -> ERROR DB CONNECTION", async () => {
    //     await mongoose.connection.close();
    //     const response = await request(app).post("/review/get-post-reviews")
    //         .send({postId: reviewForTest.post});
    //     expect(response.statusCode).toBe(500);
    // });
});
