const { db } = require("../config/db-config");
const mongoose= require('mongoose')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        trim:true,
        default:"https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },
    followers:[{
        user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
        status:{type:String, enum: ['requested','following']},
    }],
    following:[{
        user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
        status:{type:String, enum: ['requested','following']},
    }],
},{timestamps:true})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(`Hashed password: ${this.password}`); // This logs the hashed password
  }
  next();
});




const User=mongoose.model('User',userSchema)
module.exports=User