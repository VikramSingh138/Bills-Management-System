import {Bill} from "../models/Bill.js";

async function uploadBill(req, res) {
    try{
        const userId = req.user.id;
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const Billdoc = new Bill({
            user : userId,
            filePath : req.file.path,
            originalName: req.file.originalname
        })

        const savedBill = await Billdoc.save();

        res.status(201).json({
            message: "Bill uploaded successfully",
            bill: {
                id: savedBill._id,
                originalName: savedBill.originalName,
                filePath: savedBill.filePath,
                uploadedAt: savedBill.createdAt
            }   
        })
    }
    catch(error){
        console.error("Error uploading bill:", error);
        res.status(500).json({
        message: "Server error while uploading bill",
        error: error.message // (optional, for debugging)   
        })
    }
}

export {uploadBill}