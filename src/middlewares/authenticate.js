const jwt= require('jsonwebtoken');

require("dotenv").config();

const verifyToken= (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_ACCESS_KEY, function(err,token) {
            if(err) return reject(err);
            return resolve(token);
        })
    })
   
}

module.exports = async (req, res, next) => {
    const bearerToken = req?.headers?.authorization

    if(!bearerToken || !bearerToken.startsWith('Bearer ')) return res.status(400).json({status:"failed",message:"Invalid bearer token"});

    const token =bearerToken.split(' ')[1];

    let user;
    try {
        user =await verifyToken(token);
    } catch (err) {
        return res.status(400).json({
            status: "failed",
            message: "Invalid bearer token",
        });
    }

    

    if(!user) return res.status(400).json({status:"failed",message:"Invalid bearer token"});

    req.user= user;

    return next();
}