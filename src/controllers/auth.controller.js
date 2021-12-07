const User = require("../models/user.model");

const jwt = require("jsonwebtoken");

require("dotenv").config()

const newToken = (user) => {
    return token = jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
}
const register = async (req, res) => {
    try {
         let user = await User.findOne({email: req.body.email}).lean().exec();

         if(user) {
             return res.status(400).json({status:"Failed",message:"Please provide different email address"})
         }

         user=await User.create(req.body);

         const token = newToken(user);

        res.status(201).json({user, token})
    } catch (err) {
        res.status(500).json({message: err.message,status: "Failed"});
    }
}


const login = async (req, res) => {
    try {
        let user =await User.findOne({email:req.body.email})

        if(!user) {
            return res.status(400).json({status:"Failed",message:"password or email is invalid"});
        }

        const match= await user.checkPassword(req.body.password)

        if(!match) {
            return res.status(400).json({status:"Failed",message:"password or email is invalid"});
        }

        const token = newToken(user);

        res.status(201).json({user, token})
    }  catch (err) {
        res.status(500).json({message: err.message,status: "Failed"});
    }

    
}


module.exports ={ register, login ,newToken };