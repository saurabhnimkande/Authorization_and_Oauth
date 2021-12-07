const express = require('express');

const app = express();

const { register, login }= require('./controllers/auth.controller');

const userController = require('./controllers/user.controller');

const productController = require('./controllers/product.controller');

const registerController = require('./controllers/register.controller');

const passport = require("./configs/passport");

app.use(passport.initialize());

passport.serializeUser(function ({ user, token }, done) {
  done(null, { user, token });
});
passport.deserializeUser(function (user, done) {
  done(err, user);
});


app.use(express.json());

app.use("/users",userController);
app.use("/products",productController);
app.use("/register",registerController);
app.post("/login",login);


app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["email", "profile"],
    })
  );
  
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/auth/google/failure",
    }),
    function (req, res) {
      return res.status(201).json({ user: req.user.user, token: req.user.token });
    }
  );
  
  app.get("/auth/google/failure", function (req, res) {
    return res.send("Something went wrong");
  });
  

module.exports =app;