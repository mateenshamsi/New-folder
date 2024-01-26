if(process.env.NODE_ENV!=='production')
{ 
    require('dotenv').config()
}
const express = require('express')
const app = express()
const {notes}=  require('./seeds')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const auth = require('./utils/auth.js')
dotenv.config()
app.use(express.json())
app.use(cookieParser())
const Note = require('../backend/models/NoteModels')
const User = require('../backend/models/UserModel')
const mongoose = require('mongoose');
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const MongoStore = require('connect-mongo')
const MONGO_URL = process.env.MONGO_URL
const store = MongoStore.create({
    mongoUrl : MONGO_URL , 
    touchAfter:24*60*60 , 
    crypto:{
        'secret':'thisisasecret'
     }
})
const secret = process.env.SECRET||'thisisasecret'

main().catch(err => console.log(err));
const catchAsync = require('./utils/catchAsync')

async function main() {
  await mongoose.connect(MONGO_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const requireAuth = async(req,res,next)=>{ 
    const token = res.cookies 
    console.log(token)
    if(token)
    { 
    try{
    
        const decoded = jwt.verify(token,secret)
        req.user =await User.findById(decoded.userId)
        if (!req.user) {
            return res.status(400).json({ message: "User not found" });
        }
        next()
    }
    catch(e)
    {
        res.status(400).json({message:"There is some problem"})
    }       
    }
    else{ 
        res.status(400).json({message:"User does not exist"})

    }
    
}
app.get('/',(req,res)=>{

})
app.get('/api/notes',async(req,res)=>{ 
    const notes = await Note.find({})
    res.json(notes)
})
app.post('/api/notes',catchAsync(async(req,res)=>{ 
    

      // Create a new instance of the Note model with the provided data
    const {token} = req.cookies 
    jwt.verify(token,secret,{},async(err,info)=>{  
    const { title, content, category } = req.body;
 
    if (!title || !content || !category) {
      res.status(400);
      throw new Error("Please Fill all the feilds");
      return;
    } else {
      const note = new Note({  title, content, category })
      

      const createdNote = await note.save();
      res.status(201).json(createdNote);      
    }
})

}))
app.get('/api/notes/:id',requireAuth,catchAsync(async(req,res)=>{ 
    const {id} = req.params 
    const note = await Note.findById(id)
   
        res.json(note)
   
}))

app.put('/api/notes/:id',requireAuth,catchAsync(async(req,res)=>{ 
    const {id} = req.params 
    const note = await Note.findByIdAndUpdate(id,req.body)
    res.status(200).json(note)

})) 
app.delete('/api/notes/:id',requireAuth,catchAsync(async(req,res)=>{
    const {id} = req.params 
    await Note.findByIdAndDelete(id)
    res.json("Deleted")
}))
 

app.post('/api/user/register',catchAsync(async(req,res)=>{
    const { username, email, password } = req.body;
    console.log(email)
    try{
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(500).json({message:"User already exist"})
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: hashedPassword });
        const registeredUser = await user.save();
    
        // Create a JWT token
       
    
     
        res.status(201).json({ user: registeredUser});
     }
     catch(e)
     { 
        res.status(500).json({message:"Somethign went wrong"})
     }
    // Hash the password
}))
app.post('/api/user/login',catchAsync(async(req,res)=>{
    const {email,password} = req.body 

    try{
    
    const existingUser = await User.findOne({email})
    console.log(existingUser)
    if(!existingUser) return res.status(404).json({message:"User ndoes not exist"})
    console.log(existingUser.password)
    const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)
    if(isPasswordCorrect)
    {

        const token = jwt.sign({email:existingUser.email,id:existingUser._id},secret)
        res.status(200).json({result:existingUser,token})
    }
    else
    {
        return res.status(400).json("Incorrect Info")
    }
        
} 
catch(e)
{ 
    res.status(500).json({message:"Something went wrong"})
}
}))
app.post('/api/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.json('Successfully logged out');
});

app.use((error,req,res,next)=>{ 
    if(!error.message) error.message="OH NO!!!"

res.status(400).json(error)
})
app.listen(3000,()=>{
    console.log("Listening on port 3000")
})