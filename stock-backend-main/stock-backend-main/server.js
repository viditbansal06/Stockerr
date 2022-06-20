const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const users = require('./models/Users');
const Users = require("./api/routes/Users"); 
const app = express();
app.use(cors());
app.get('/',(req,res)=>{
    res.status(200).json("working")
})
app.use(
    bodyParser.urlencoded({
        extended:false    
}))
app.use(bodyParser.json()); 
const db = require('./config/keys').mongoURL;
mongoose.connect(
    db,
    {useNewUrlParser:true, useUnifiedTopology: true }
).then(()=>console.log("Successfully connected to database!"))
.catch(er => console.log(er));

app.use("/api/users",Users);

const port = process.env.PORT || 5001 ;
app.listen(5001, () => console.log('Listening on Port',port));