const mongoose =require('mongoose');

const bcrypt = require('bcryptjs');

const userSchema= new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    role:[{type:String}]
}, {
    timestamps:true,
    versionKey:false
})

userSchema.pre("save", function (next) {
    if(!this.isModified("password")) return next();
    
    const hash = bcrypt.hashSync(this.password, 10);
    this.password =hash;
    return next();
})

userSchema.methods.checkPassword = function (password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, function (err, same) {
        if (err) return reject(err);
  
        return resolve(same);
      });
    });
};

module.exports=mongoose.model("user",userSchema);