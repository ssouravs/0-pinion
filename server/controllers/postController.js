const Post = require("../models/postSchema")
const { findByIdAndDelete } = require("../models/userSchema")
const colr=require('colors')

const createPost=async (req,res)=>{
    const {title,content,media}=req.body
    if(!content){
        return res.status(400).json({message:`Content is mandatory`})
    }
    try{
        //console.log(req)
        const newPost=new Post({title,content,media,createdBy:req.user})
        await newPost.save()
        res.status(200).json({
            message:`new post crreated successfully`,
            post:newPost
        },
                
        )
    }catch(err){
        res.status(500).json({ message: `Error creating the post: ${err.message}` });
    }

}

const readAllPosts=async (req,res)=>{
    console.log(req.user)
    const userId=req.user
    try{
        if(!userId){
            return res.status(400).json({message:'Error finding the user'})
        }
        const userPosts=await Post.find({createdBy:userId})
        if(!userPosts.length){
            return res.status(404).json({message:'No posts found for this user'})
        }
        res.status(200).json({message:'Fetching all the post of this user successfully: ',posts:userPosts})
    }catch(err){
        res.status(500).json({message:`Reading post operation terminated due to the error :  ${err}`})
    }
}


const updatePost=async (req,res)=>{
    const {title,content,media}=req.body
    if(!title && !content && !media){
        return res.status(400).json({message:'Nothing to update'}) 
    }
    try{
        const id=req.params.id;
        const post=await Post.findByIdAndUpdate(id,{
            title,content,media
        },
        {
            new:true,
            runValidators:true,
        },
    );
        if(!post){
            return res.status(400).json({message:'No such post found'})
        }

        return res.status(200).json({message:"Post updated successfully", post})
    }catch(err){
        res.status(401).json({message:`Post updating terrminated due to ${err}`})
    }
}

const deletePost= async (req,res)=>{
    const id=req.params.id
    try{
        const post=await Post.findByIdAndDelete(id)
        if(!post){
            return res.status(401).json({message:'No such post found to be deleted'})
        }
        res.status(200).json({message:'Post successfully deleted',post})

    }catch(err){
        res.status(500).json({message:`Post deletion operation terminated due to ${err}`})
    }
}


module.exports={createPost,readAllPosts,updatePost,deletePost}