const mongoose=require("mongoose");

//import nodemailer
const nodemailer=require("nodemailer");

const fileSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },

    imageUrl:{
        type:String,

    },

    tags:{
        type:String,
    },

    email:{
        type:String,
    }







});


//write post middleware using save fuction that means database m entry create krne ke baad tumhe mail sent krna h 

//doc=>woh entry jo tumhare db m create hui h (pura schema aa jaye ga jo user bej rha h +obj id)
 fileSchema.post("save",async function(doc){
    try{
        console.log("doc=>",doc);

        //transporter
        let transporter=nodemailer.createTransport({
            //mail sent krne ke liye konse server ka use kroge(we will use here  gmail ka mail server )
            host:process.env.MAIL_HOST,
            auth:{
                //konsi id se mail sent krna h or uska password 
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        })

        //send mail
       let info=transporter.sendMail({
       from:`codehelp`,
       to:doc.email,
       subject:"new file uploadde on cloudinary",
       html:`<h2>Hello jee</h2> <p>file uploaded  view here:<a href="${doc.imageUrl}">${doc.imageUrl}</a> </p>`,

      })
      console.log("info=>",info)
    }
    catch(err){
        console.log(err);
    }
 });



 














const file=mongoose.model("File",fileSchema);
module.exports=file;