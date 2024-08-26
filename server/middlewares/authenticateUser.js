
const jwt=require('jsonwebtoken')
const JWT_SECRET_KEY="MY_SECET_KEY"
const authenticateUser=(req,res,next)=>{
    if(!req.header('Authorization')){
        return res.status(400).json({message:`No authorization token recieved`})
    }
    try{
        const token=req.header('Authorization').split(" ")[1];
        const decoded=jwt.verify(token,JWT_SECRET_KEY);
        //console.log(decoded)
        req.user=decoded.user || decoded.id;
        console.log(req.user)
        next();

    }catch(err){
        res.status(401).json({message:`Error: ${err}, No token recieved`})
    }
}

module.exports=authenticateUser