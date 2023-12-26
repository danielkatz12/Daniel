import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    _id: {
        type: String
        //בגלל שאנו דרסנו את הid של מונגו (ע"י כתיבה id_) אז מספיק לציין את סוג הID ןאין צורך לציין דרישות.
    }
});


export default mongoose.model("Students", studentSchema);