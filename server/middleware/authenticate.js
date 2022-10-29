const jwt = require('jsonwebtoken');
const User = require('../models/Userschema');


const Authenticate = async (req,res,next) => {
    
    try{
        
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({_id:verifyToken._id, "token.token":token});

        if(!rootUser){
            throw new Error('User not found');
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();


    }
    catch(err){

        res.status(401).send("Unauthorized: No token provided");
        //console.log(err);
    }
}

module.exports = Authenticate;