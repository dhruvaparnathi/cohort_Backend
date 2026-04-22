require("dotenv").config();
const noteModel = require('./src/models/notes.model')
const app = require('./src/app');
const connectToDB = require("./src/config/database");

connectToDB();

app.post("/notes", async (req,res)=>{
    const { title , description } = req.body;

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message:"Note Created...",
        note
    })
})

app.get("/",(req,res)=>{
    res.send("Hello World...");
})

app.listen(3000,()=>{
    console.log("Server is live..");
})