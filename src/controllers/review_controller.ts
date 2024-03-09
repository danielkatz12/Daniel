import Review, {ReviewData} from "../models/review-model";
import Post from "../models/post_model";

import {Response} from "express";
import {AuthRequest} from "../common/auth_middleware";
import {AuthBaseController} from "./auth-base-controller";
import mongoose, { Types } from "mongoose";

class ReviewController extends AuthBaseController<ReviewData> {
    constructor() {
        super(Review);
    }

    async getReviewsByPostId(req: AuthRequest, res: Response): Promise<any> {
        try {
            const reviews = await Review.aggregate([
                { $match: { post: new Types.ObjectId(req.body.postId) } }, // Match reviews for specific post
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user'
                },
                {
                    $lookup: {
                        from: 'userprofiledetails',
                        localField: 'user._id',
                        foreignField: 'user',
                        as: 'userProfileDetails'
                    }
                },
                {
                    $unwind: '$userProfileDetails'
                },
                {
                    $project: {
                        comment: 1,
                        post: 1,
                        userProfileDetails: 1,
                    }
                }
            ]);

            res.status(200).send(reviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            res.status(500).send(`Error fetching reviews : ${error}`);
        }
    }

    // async insert(req: AuthRequest, res: Response) {
    //     console.log("add review:" + req.body);
    //     super.insert(req, res);
    // }
}

export default new ReviewController();
