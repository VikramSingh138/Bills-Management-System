import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/authMiddleware.js";
import { uploadBill } from "../controllers/billController.js";

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.post("/upload" , authMiddleware , upload.single("file") , uploadBill);
// Steps: 1) Verify JWT (authMiddleware), 
// 2) Upload single file (field name: 'file') using multer, 
// 3) Save bill info in DB (uploadBill)
export default router;