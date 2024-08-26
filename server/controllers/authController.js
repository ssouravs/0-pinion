const generateToken = require("../config/generateToken")
const User = require("../models/userSchema")
const bcrypt=require('bcrypt')

const createUser=async (req,res)=>{
    const {name, email, password,profilePic}=req.body
    if(!name || !email || !password){
        return res.status(400).json({message:'All the input fields are required'})
    }
    try{
        const emailExist=await User.findOne({email:email})
        if(emailExist){
            res.status(400).json({message:'User already exist'})
        }
        const newUser=new User({name,email,password,profilePic})
        await newUser.save()

        res.status(201).json({
        message: `User created successfully`,
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            followers:[],
            following:[],
    }
});


    }catch(err){
        res.status(501).json({message:`Error creating the user due to ${err}`})
    }
}


const loginUser= async (req,res)=>{
    const {email,password}=req.body

    if(!email || !password){
        res.status(400).json({message:`All the field is required`})
    }

    try{
        const user=await User.findOne({email:email})
        if(!user){
            return res.status(400).json({message:`User doesnot exist`})
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful!', 
            user:{
                _id:user._id,
                email:user.email,
                name:user.name,
                token:generateToken(user._id)

            }
         });

    }catch(err){
        if (!res.headersSent) {
            res.status(500).json({ message: `Error: ${err.message}` });
  }
    }
}



module.exports={createUser,loginUser}