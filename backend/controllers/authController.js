import {User} from "../models/Users.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const saltRounds = 10;

async function signupUser(req, res){
try{
console.log("Request body:", req.body);
    const {name , email , password } = req.body;
    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(409).json({ message: "User already exists" })
    }

    const hashedpass = await bcrypt.hash(password , saltRounds);

    const newUser = new User({
        name,
        email,
        password : hashedpass
    });

    await newUser.save();

    const token = jwt.sign(
        { id: newUser._id },                 // payload
        process.env.JWT_SECRET,             // secret key from .env
        { expiresIn: "1d" }                 // token expiry
    );

    res.status(201).json({
        message: "User registered successfully",
        token,
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        }
    });
}
    catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({ message: "Server error", error });
    }
}

async function loginUser(req, res){
    const {email , password } = req.body;
    try{
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({ message: "User not found" })
        }

        const isValid = await bcrypt.compare(password, existingUser.password);

        if(!isValid){
           return res.status(401).json({ message: "Invalid credentials" }); 
        }

        const token = jwt.sign(
            {id  :existingUser._id},
            process.env.JWT_SECRET,
            {expiresIn : "1d"}
        );

         res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email
            }
        });
    }    
    catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
}

export { signupUser, loginUser };
