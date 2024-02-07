import mongoose, {Schema, Types} from "mongoose";

export interface IUser extends Document {
    _id?: string;
    email: string;
    password?: string;
    refreshTokens?: string[];
}

const userSchema = new mongoose.Schema<IUser>({
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

export default mongoose.model<IUser>("User", userSchema);
