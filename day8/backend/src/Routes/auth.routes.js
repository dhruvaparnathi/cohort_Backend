const express = require("express");
const userModel = require('../models/user.model');
const authRoutes = express.Router();
const jwt = require('jsonwebtoken');

authRoutes.post("/register",async (req,res)=>{
    const { email, name, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({ email });
    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"User Already Registered..."
        })
    }

    const user = await userModel.create({
        email, name, password
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

module.exports = authRoutes;