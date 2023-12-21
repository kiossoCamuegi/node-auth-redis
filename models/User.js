const mongoose = require("mongoose");
const bcrypt =  require("bcrypt");

const userSchema = new mongoose.Schema({
    username:{
         type:String,
         required:true,
         unique:true
    },
    password:{
        type:String,
        required:true,
    }    
}, {
    timestamps:true
});


userSchema.pre("save", function(next){
     if(!this.isModified){
       return  next();
     }
     this.password =  bcrypt.hashSync(this.password, 12);
     next();
});


userSchema.methods.comparePassword = function(password){
   return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("User", userSchema); 