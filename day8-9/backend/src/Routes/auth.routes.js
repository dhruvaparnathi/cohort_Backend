const express = require("express");
const userModel = require('../models/user.model');
const authRoutes = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

authRoutes.post("/register",async (req,res)=>{
    const { email, name, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({ email });
    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"User Already Registered..."
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex");

    const user = await userModel.create({
        email, password: hash, name
    })

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"user Registered",
        user,
        token
    })
})

authRoutes.get("get-me",async (req,res)=>{
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    res.json({
        name:user.name,
        email:user.email,
    })
})

authRoutes.post("/login",async (req,res)=>{
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if(!user){
        return res.status(404).json({
            message:"User not found..."
        })
    }

    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex");

    if(!isPasswordMatched){
        return res.status(401).json({
            message:"Invalid Password..."
        })
    }

    const token = jwt.sign(
        {
            id:user._id
        },process.env.JWT_SECRET
    )
    
    res.cookie("jwt_token",token)

    res.status(200).json({
        message:"User Logged In...",
        user
    })
})

module.exports = authRoutes;