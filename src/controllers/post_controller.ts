import Post, {PostData} from "../models/post_model";
import {Response} from "express";
import {AuthRequest} from "../common/auth_middleware";
import {AuthBaseController} from "./auth-base-controller";
import {startSession, Types} from "mongoose";
import Review from "../models/review-model";

class PostController extends AuthBaseController<PostData> {
    constructor() {
        super(Post);
    }

    // async insert(req: AuthRequest, res: Response) {
    //     console.log("post:" + req.body);
    //     super.insert(req, res);
    // }

    async deleteById(req: AuthRequest, res: Response) {
        const postId = req.params.id;
        try {
            // Find all Review instances referencing the specified Post
            const reviewsReferencingPost = await Review.find({post: postId});

            // Use a flag to keep track of whether all deletions were successful
            let allReviewsDeleted = true;


            // Delete all associated Review instances
            await Promise.all(reviewsReferencingPost.map(async (review) => {
                try {
                    await review.deleteOne();// Remove each associated Review instance
                } catch (error) {
                    console.error('Error deleting review:', error);
                    allReviewsDeleted = false;
                }
            }));

            if(allReviewsDeleted){
                // Delete the specified Post instance
                const deletedPost = await Post.deleteOne({_id: postId});
                res.status(200).json({message: "Post with ID: " + postId + " has been deleted successfully", post: deletedPost})
                console.log(`Post with ID ${postId} and associated Reviews have been deleted.`);
            } else {
                // If not all reviews were deleted successfully, send an error response
                res.status(500).json({ message: "Error deleting some reviews associated with the post" });
            }
        } catch (error) {
            console.error('Error In deleting Post and associated Reviews:', error);
            res.status(500).json({message: error.message});
        }
    }

    async getAllPosts(req: Request, res: Response): Promise<void> {
        const array = await Post.aggregate([
            {
                $lookup: {
                    from: "reviews", // Assuming your Review model is named "Review"
                    localField: "_id",
                    foreignField: "post",
                    as: "reviews"
                }
            },
            {
                $addFields: {
                    reviewCounts: {$size: "$reviews"}
                }
            },
            {
                $lookup: {
                    from: "users", // Assuming your User model is named "User"
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $lookup: {
                    from: "userprofiledetails", // Assuming your UserProfileDetails model is named "UserProfileDetails"
                    localField: "user._id",
                    foreignField: "user",
                    as: "userProfileDetails"
                }
            },
            {
                $unwind: {
                    path: "$userProfileDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    city: 1,
                    street: 1,
                    streetNumber: 1,
                    description: 1,
                    imageUrl: 1,
                    pricePerDay: 1,
                    user: {
                        _id: "$user._id",
                        email: "$user.email",
                        userProfileDetails: {
                            name: "$userProfileDetails.name",
                            profileImage: "$userProfileDetails.profileImage",
                            contactEmail: "$userProfileDetails.contactEmail",
                            contactPhoneNumber: "$userProfileDetails.contactPhoneNumber",
                            age: "$userProfileDetails.age"
                        }
                    },
                    reviewCounts: 1
                }
            }
        ]).exec();
        res.status(200).send(array);
    }
}

export default new PostController();


// async deleteById(req: AuthRequest, res: Response) {
//     const postId = req.params.id;
//     const session = await startSession();
//     session.startTransaction();
//     try {
//         // Find all Review instances referencing the specified Post
//         const reviewsReferencingPost = await Review.find({post: postId}).session(session);
//
//         // Delete all associated Review instances
//         await Promise.all(reviewsReferencingPost.map(async (review) => {
//             await review.deleteOne().session(session); // Remove each associated Review instance
//         }));
//
//         // Delete the specified Post instance
//         const deletedPost = await Post.deleteOne({_id: postId}).session(session);
//
//         await session.commitTransaction();
//         res.status(200).json({message: "Post with ID: " + postId + " has been deleted successfully", post: deletedPost})
//
//         console.log(`Post with ID ${postId} and associated Reviews have been deleted.`);
//     } catch (error) {
//         console.error('Error deleting Post and associated Reviews:', error);
//         await session.abortTransaction();
//         res.status(500).json({message: error.message});
//     } finally {
//         session.endSession();
//     }
// }
