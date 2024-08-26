const express=require('express')
const { createPost, updatePost, deletePost, readAllPosts } = require('../controllers/postController');
const  authenticateUser  = require('../middlewares/authenticateUser');
const router=express.Router()

//router.get('/')
//router.get('/:id')
router.post('/post',authenticateUser,createPost)
router.get('/post',authenticateUser,readAllPosts)
router.put('/post/:id',authenticateUser,updatePost)
router.delete('/post/:id',authenticateUser,deletePost)

module.exports=router;