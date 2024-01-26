const {v4:uuidv4}=require('uuid')
const User = require('../models/UserModel')
const {} = require('../service/auth')
async function handleUserSignup(){
    const {name,email,passowrd} =req.body 
    const user = await User.create({
        name,email,password
    })
    res.status(200).json(user)
}
async function handleUserLogin(){
    const {email,password} =req.body 
    const user = await User.findOne({
        email,password
    })
    if(!user) return 
    const sessionId = uuidv4()
    res.status(200).json(user)
}
module.exports=  {handleUserSignup,handleUserLogin} 