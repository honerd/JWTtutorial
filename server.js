require('dotenv').config()
const express = require("express")
const jwt= require('jsonwebtoken')

const app=express()

app.use(express.json())

const posts=[
    {
        username : 'kyle',
        title : "post 1"
    },
    {
        username : 'Jim',
        title : 'post 2'
    }
]

app.get('/posts', authenticate, (req,res)=>{
    res.json(posts.filter(post=> post.username === req.user.name))
})

function authenticate(req, res, next)
{

    const authHeader= req.headers['authorization']
    console.log(authHeader)
    const token= authHeader && authHeader.split(' ')[1]
    if(token == null)
    {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.JWT_SIGN_SECRET, (err,user)=>{
        if(err)
        {
            return res.sendStatus(403);
        }
        else{
            console.log(user)
            req.user=user
            next()
        }
    })
}

app.listen('1337')