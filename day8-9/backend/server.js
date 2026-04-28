const app = require('./src/app');

require('dotenv').config();
const connectToDB = require('./src/Config/database');

connectToDB();

app.listen(3000,()=>{
    console.log("Server is live...");
})