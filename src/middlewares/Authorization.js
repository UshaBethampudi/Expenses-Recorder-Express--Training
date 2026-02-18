const jwt =require('jsonwebtoken');
const Authorization=(req,res,next)=>{
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token){
        return res.status(401).send({message: 'Authorization token required'})
    }
    try{
        const decode=jwt.verify(token,'usha@123');
        req.user=decode;
        next();
    }catch(e){
    res.status(401).send(e);
    }
};
module.exports=Authorization