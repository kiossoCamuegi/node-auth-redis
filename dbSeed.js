//const Language = require("./models/Languages"); 
const fs = require("fs");
const path = require("path");
const mongoose =  require("mongoose");

mongoose.connect(process.env.DATABASE_URL ,{useNewUrlParser:true})
const DB = mongoose.connection;

/*
const Run = async()=>{
  const languages = await Language.find({});
if (languages.length) {
  return;
}
const languagesFromGitHub = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "./data/languages-from-github.json"),
    "utf8"
  )
);
const languagesToAdd = Object.keys(languagesFromGitHub).map((key) => {
  const name = key;
  const iconKey = languagesFromGitHub[key];
  const iconUrl = `https://github.com/abrahamcalf/programming-languages-logos/raw/master/src/${iconKey}/${iconKey}.svg`;
  return { name, iconUrl };
});
try {
     console.log(languagesToAdd)
  console.log("Languages added to database");
} catch (e) {
  console.log("Error while instering languages", e);
}
process.exit(0);  
}
*/


try {
    DB.on("error", (error)=>console.error("kiosso"));
   DB.once("open", ()=>console.log("Connected to Database 😎😍🤔😘"));
   //Run()
} catch (error) {
   console.log(  `My url = ${process.env.DATABASE_URL}  `  ); 
}

 