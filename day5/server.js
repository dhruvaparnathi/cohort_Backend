const app = require('./src/app');

const mongoose = require('mongoose');

function connectToDB(){
    mongoose.connect("mongodb+srv://dhruv:ELvLJbtLX0Umq1CG@cluster0.gxozlux.mongodb.net/day5")
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