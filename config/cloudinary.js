const cloudinary=require("cloudinary").v2;//abhi version 2 chal rha h 

require("dotenv").config();

exports.cloudinaryConnect=()=>{
    try{
        //establish a connectioln 
        cloudinary.config(
            {
                cloud_name:process.env.CLOUD_NAME,
                api_key:process.env.API_KEY,
                api_secret:process.env.API_SECRET,
            }
        )
    }
    catch(err){
        console.log(err);
    }
}

/*
you will get cloud name api key, api secret
go to cloudinary
sign up for free
Setting
access keys
go to dashboard
*/
