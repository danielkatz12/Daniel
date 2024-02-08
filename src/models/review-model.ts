import mongoose, {Types} from "mongoose";
import {UserData} from "./user_model";
import {PostData} from "./post_model"

export interface ReviewData {
    comment: string;
    post: PostData;
    user: UserData;
}

const reviewSchema = new mongoose.Schema<ReviewData>({
    comment: {
        type: String,
        required: true,
    },
    post: {
        type: Types.ObjectId,
        ref: 'Post'
    },
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
});

export default mongoose.model<ReviewData>("Review", reviewSchema);
