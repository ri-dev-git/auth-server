const express= require('express')
const app=express();
const mongoose=require('mongoose')
const { MongoClient } = require('mongodb');
const bodyParser=require('body-parser')
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send('hi')
})

//routes
const getRoute=require('./users.js')
app.use('/v1/',getRoute);



//Mongodb
//Z8JdPBhY6xYOVrY9
const connect_db='mongodb+srv://rishi:zjzC6cMiid6mFlHl@cluster0.nvf4z.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(connect_db,{
    useNewUrlParser:true,
})

app.listen(process.env.PORT||3001);


