import mongoose from "mongoose";

const BillSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User
        ref: "User",
        required: true
    },
    filePath: {
        type: String, // Local path where the file is stored
        required: true
    },
    originalName: {
        type: String, // Original name of the uploaded file
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
});

export const Bill = mongoose.model("Bill", BillSchema);
