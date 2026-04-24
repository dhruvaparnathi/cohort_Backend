const app = require('./src/app');
require('dotenv').config();
const connectToDb = require('./src/config/database');
const noteModel = require('./src/models/note.model');

connectToDb();

app.get("/api/notes",async (req,res)=>{
    const note = await noteModel.find()

    res.status(200).json({
        message:"note fetched correctly...",
        note
    })
})

app.post("/api/notes",async (req,res)=>{
    const {title,description} = req.body

    const note = await noteModel.create({
        title,description
    })

    res.status(201).json({
        message:"note creation completed...",
        note
    })
})

app.delete("/api/notes/:id",async (req,res)=>{
    const id = req.params.id;

    const note = await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        message:"note deletion done...",
        note
    })
})

app.patch("/api/notes/:id",async (req,res)=>{
    const id = req.params.id;
    const {description} = req.body;

    const note = await noteModel.findByIdAndUpdate(id,{description});

    res.status(200).json({
        message:"note updation done...",
        note
    })
})



app.get("/",(req,res)=>{
    res.send("Server is Active...");
})

app.listen(3000,()=>{
    console.log("Server is Live!");
})