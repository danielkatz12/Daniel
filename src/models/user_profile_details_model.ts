import mongoose, {Schema, Types} from "mongoose";
import {UserData} from "./user_model";


export interface UserProfileDetailsData {
    name: String;
    profileImage?: String;
    contactEmail?: String;
    contactPhoneNumber?: number;
    age?: number;
    user:  UserData
}

const userProfileDetailsSchema = new mongoose.Schema<UserProfileDetailsData>({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: Types.ObjectId,
        ref: 'User'
        //בגלל שאנו דרסנו את הid של מונגו (ע"י כתיבה id_) אז מספיק לציין את סוג הID ןאין צורך לציין דרישות.
    },
    profileImage: {
        type: String,
        required: false
    },
    contactEmail: {
        type: String,
        required: false
    },
    contactPhoneNumber: {
        type: Number,
        required: false
    },
    age: {
        type: Number,
        required: false
    }
});


export default mongoose.model<UserProfileDetailsData>("UserProfileDetails", userProfileDetailsSchema);
