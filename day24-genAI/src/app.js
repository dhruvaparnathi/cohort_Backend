import express from "express";
import dotenv from "dotenv";
import { sendEmail } from "./email.service.js";
import {run} from "./ai.service.js";

dotenv.config();

const app = express();

app.use(express.json());

run();

app.post("/send-email", async (req, res) => {
    try{
        const {to,subject,text,html} = req.body;
        if(!to || !subject){
            return res.status(400).json({message:"Missing email or subject"});
        }
        await sendEmail(to,subject,text,html);
        res.status(200).json({message:"Email sent successfully"});
    }catch(error){
        console.error("Error sending email:",error);
        res.status(500).json({message:"Internal server error"});
    }
});

export default app;