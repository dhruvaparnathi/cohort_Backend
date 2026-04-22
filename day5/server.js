require("dotenv").config()
const app = require('./src/app');

const mongoose = require('mongoose');

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to Database!");
    })
}
connectToDB()

app.get('/',(req,res)=>{
    res.send("Hello There!")
})

app.listen(3000,()=>{
    console.log("Server is active!");
})