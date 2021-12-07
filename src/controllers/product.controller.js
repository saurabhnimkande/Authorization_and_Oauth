const express = require('express');

const router= express.Router();

const authenticate= require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");
const Product= require('../models/product.model');

router.get("", authenticate,async (req, res) => {
    try {
        const products = await Post.find().populate("user").lean().exec();
        res.status(200).send(products);
    } catch (err) {
        res.status(500).json({message: err.message,status: "Failed"});
    }
})

router.post("", authenticate,authorise(["admin","seller"]),async (req, res) => {
    try {
        const user= req.user;
        const product = await Product.create({
            name:req.body.name,
            price:req.body.price,
            user:user.user._id
        });
        res.status(201).send(product);
    } catch (err) {
        res.status(500).json({message: err.message,status: "Failed"});
    }
});


module.exports = router;