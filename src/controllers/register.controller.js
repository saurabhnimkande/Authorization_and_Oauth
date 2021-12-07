const express = require('express');

const router = express.Router();

const { body, validationResult } = require('express-validator');


const { register, login }= require('./auth.controller');


router.use("",body("email").isEmail().withMessage("invalid email address"),body("name").isLength({min:1,max:20}).withMessage("Please enter valid name"),async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let newErrors = errors.array().map(({ msg, param, location }) => {
            return {
              [param]: msg,
            };
          });
          return res.status(400).json({ errors: newErrors });
    }

    register(req,res);

})

module.exports= router;