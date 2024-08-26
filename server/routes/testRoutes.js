const express=require('express')
const router=express.Router()

router.get('/test',(req,res)=>{
    res.status(401).json({message:'Test is Successful, Server is working okkay'})
})

module.exports=router