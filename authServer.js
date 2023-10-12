require('dotenv').config()
const express = require("express")
const jwt= require('jsonwebtoken')

const app=express()

app.use(express.json())


app.post('/login',(req,res)=>{
    //post authentication

    const user= req.body.username
    payload={
        name: user
    }

    const accessToken=jwt.sign(payload,process.env.JWT_SIGN_SECRET)
    res.send({accessToken: accessToken})
})


app.listen('1338')