var express = require('express');
const User = require('../models/User');
var router = express.Router();
const authenticated = require("../middleware/auth.middleware");

const tempDb = [];

/* GET users listing. */
router.post('/register', async(req, res)=> {
   try {
    const {username, password} = req.body;
    const existingUser =  await User.findOne({username});
    if(existingUser){
      return res.status(400).json({message:"user already exists"})
    }

   const userData = {username, password};
       const newUser =  await new User(userData).save();
       const user  =  newUser.toJSON();
       req.session.user = user;
       delete user.password;
       res.status(200).json({user:user});
   } catch (error) {
      res.status(300).json({message:error.message});
   } 
});





router.post('/login', async(req, res) =>{ 
  try {
    const {username, password} = req.body;
    const existingUser =  await User.findOne({username}); 
  
    if(!existingUser){
      return res.status(404).json({message:"user does not  exists !"})
    }else if(!existingUser.comparePassword(password)){
      return res.status(400).json({message:"Invalid credentials !"})
    } 

    const user  =  existingUser.toJSON(); 
    delete user.password;

    req.session.user = user;
    res.status(200).json({user:user});
  } catch (error) {
    res.status(300).json({message:error.message});
  }
});


/* GET users listing. */
router.get('/me',  authenticated , async(req, res) =>{
   const {username} = req.session.user;
   const user = await User.findOne({username}); 
   res.status(200).json({user});
});




/* GET users listing. */
router.get('/logout', function(req, res) {
 req.session.destroy((err)=>{
     if(err){
        return res.status(400).json({
           message:err.message
        })
     }
     res.redirect("/login");
 })
});





module.exports = router;
