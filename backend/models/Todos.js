import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: false,
    },  
    link: {
        type: String,
        required: false,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    timestamp: {
        type: String,
        default: Date.now(),
    },
});

export default mongoose.model("Todo", TodoSchema)