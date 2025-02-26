const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
dotenv.config();
const jwtsecret = process.env.SECRET_KEY;
mongoose.connect(process.env.MONGO_URL)
const app = express();

app.use(json)

app.post("/register",async (req,res)=>{
    const {username,password} = req.body;
    var user;
    try{
    user = await User.create({username,password});
    }
    catch(e){
        res.status(401).json('unique error');
    }
    jwt.sign({userId:user._id},jwtsecret,(err,token)=>{
        if(err) throw err;
        res.cookie('token',token).status(201).json('ok');
    });
});

app.listen(process.env.PORT,()=>{
    console.log("listening")
});