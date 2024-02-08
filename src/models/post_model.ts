import mongoose, {Types} from "mongoose";
import {UserData} from "./user_model";

export interface PostData {
    city: string;
    street: string;
    streetNumber: number;
    description: string;
    imageUrl: string;
    pricePerDay: number;
    user: UserData
}

const postSchema = new mongoose.Schema<PostData>({
    city: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    streetNumber: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    pricePerDay: {
        type: Number,
        required: true,
    },
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
});

export default mongoose.model<PostData>("Post", postSchema);
