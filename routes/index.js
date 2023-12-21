var express = require('express');
var router = express.Router();
const path = require("path");


const publicRootConfig = {
  root:path.join(__dirname, "../public")
}

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.user) return res.redirect("/login");
   console.log(req.session.user)
  res.sendFile('index.html', publicRootConfig);
});

/* login */
router.get('/login', (req, res)=>{
  if(req.session.user) return res.redirect("/");
  res.sendFile('login.html', publicRootConfig );
});


 
/* register */
router.get('/register', (req, res)=>{
  if(req.session.user) return res.redirect("/");
  res.sendFile('register.html', publicRootConfig );
});



module.exports = router;
