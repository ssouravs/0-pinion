const { default: mongoose, Types } = require("mongoose");

const postSchema=new mongoose.Schema({
    title:{
        type: String,
        trim:true
    },
    content:{
        type: String,
        required:true,
        trim:true
    },
    media:{
        type: String,
        trim:true,
        default:""
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    likes: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    comments:[
        {
            user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
            comment:{type:String,required:true,trim:true},
            date:{type:Date,default:Date.now},
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    }
},{timestamps:true}
)

const Post=mongoose.model('Post',postSchema)
module.exports=Post