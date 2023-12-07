//(npm i express),(npm i mongoose),(npm i nodemon),(npm i dotenv),(npm i cloudinary),(npm i express-fileupload),(npm i nodemailer=>mail sent krne ke liye )

/**
 * app create
 * 
 * find port 
 * 
 * 
 * 
 * middleware add(body parser)
 * 
 * db connection 
 * 
 * cloudinary connection 
 * 
 * mount api route 
 * 
 * 
 * activate server


main problem
kya express framework ke pas file se interact krene ka koi tareeka h ? nhi ,nhi h 
usse json se interact krna toh aat h but file se interact krne ke kiya koi 
third party/package install krna padega 
eg-multer,express file upload 


toh ek middleware available h express file upload 
 express-fileupload simple express middleware for uploading file 
step1->npm i express-fileupload
strp2 import 

 * 
 */


const express=require("express");
 
const app =express();

require("dotenv").config();

const PORT=process.env.PORT||3000;


//middleware
app.use(express.json());

const fileupload=require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//db connect
const db=require("./config/database");
db.connect();

//cloudinary connection 
const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api mount
const Upload=require("./routes/FileUpload");
const { getMaxListeners } = require("nodemailer/lib/xoauth2");
app.use('/api/v1/upload',Upload);

//activate server
app.listen(PORT,()=>{
    console.log(`app is running at port ${PORT}`)
});






//mail_pass steps
/*gmail
manage your account
security
2 step verification 
otp
turn on 
2 step verifcation complete
click again on 2 step verification
scroll kro 
niche niche hoga 
app uspe click kro 
name aap kro aap ka koi bhi 
create  
*/



