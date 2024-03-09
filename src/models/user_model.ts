import mongoose from "mongoose";

export interface UserData {
    _id?: string;
    email: string;
    password?: string;
    refreshTokens?: string[];
}

const userSchema = new mongoose.Schema<UserData>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    refreshTokens: {
        type: [String],
        required: false,
    },
});

export default mongoose.model<UserData>("User", userSchema);
