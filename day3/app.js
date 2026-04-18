const express = require("express");

const app = express();
app.use(express.json());

let notes = [];

app.post("/notes",(req,res)=>{
    const data = req.body;
    notes.push(data);
    console.log(notes);
    res.send("Data Sent");
})

app.get("/",(req,res)=>{
    res.send("Backend is working");
})
app.get("/notes",(req,res)=>{
    res.send(notes);
})


app.listen(3000,()=>{console.log("Server is running at port:3000")});