import mongoose from "mongoose";

export interface IStudent{
    name: String;
    _id: String;
}

const studentSchema = new mongoose.Schema<IStudent>({
    name: {
        type: String,
        require: true,
    },
    _id: {
        type: String
        //בגלל שאנו דרסנו את הid של מונגו (ע"י כתיבה id_) אז מספיק לציין את סוג הID ןאין צורך לציין דרישות.
    }
});


export default mongoose.model<IStudent>("Students", studentSchema);