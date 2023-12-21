const mongoose = require("mongoose");

const languagesSchema = new mongoose.Schema({
    username:{
         type:String,
         required:true,
         unique:true
    },
    iconUrl:{
        type:String,
        required:true,
    }    
}, {
    timestamps:true
});




module.exports = mongoose.model("language", languagesSchema); 