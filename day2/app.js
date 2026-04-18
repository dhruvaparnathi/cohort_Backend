const express = require("express");

const app = express();

app.get("/",(req,res)=>{
    res.send("Backend is working at port:3000");
})
app.get("/about",(req,res)=>{
    res.send("This is About Page");
})
app.get("/home",(req,res)=>{
    res.send("This is Home Page");
})


app.listen(3000);