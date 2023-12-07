const File=require("../models/File");
const cloudinary=require("cloudinary").v2;
//localFileUpload =>handller upload on server

exports.localFileUpload=async (req,res)=>{
    try{
    //fetch file
    const file=req.files.file;
    console.log("FILE AAGYI JEE->",file);

    //path bta diya server m kha upload krni h /**curr directory(controllers) */
    let path =__dirname + "/files/"+ Date.now() + `.${file.name.split('.')[1]}`;
    console.log("PATH->",path)
        //using move function mv ,we can upload file
    file.mv(path,(err)=>{
        console.log(err);
    });

    res.json({
        success:true,
        message:'local file uploaded successfully',
    });




}
catch(err){
    console.log(err);
   
}
}

//image upload handller



 function  isFileTypeSupported(fileType,supportedTypes){
return supportedTypes.includes(fileType);
}

async function  uploadFileToCloudinary(file,myfolder,quality){
const options={myfolder};

if(quality){
    options.quality=quality;
}


//lekin tempFilePath voh toh empty h toh upload kha kroge

//es line se code chal gya (automatically detect kr le ga kya type h )
options.resource_type="auto";

 return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.imageUpload=async (req,res)=>{

    try{
    //data fetch 
    const {name,email,tags}=req.body;
    console.log(name,tags,email);

    const file=req.files.imageFile;
    console.log(file);

    //validation 
    const supportedTypes=["jpg","jpeg","png","jfif"];
    const fileType=file.name.split('.')[1].toLowerCase();

    if(!isFileTypeSupported(fileType,supportedTypes)){
        return res.status(400).json({
            success:false,
            message:'file format not supported',
        })
    }

    //file format is supported

    //upload on cloudinary

    const response= await uploadFileToCloudinary(file,"myfolder");
    console.log("response=>",response);

    //save entry in db
    const fileData=await File.create({
        name,
        tags,
        email,
        imageUrl:response.secure_url,

    })


    res.json({
        success:true,
        imageUrl:response.secure_url,
        message:'image is successfully uploaded on cloudinary ',
    });





}catch(err){
    console.log(err);
    res.status(400).json({
        success:false,
        message:"somethiing went wrong ",
    });
}

}


//videoUpload handller 
exports.videoUpload=async (req,res)=>{
    try{

        //data fetch 
    const {name,email,tags}=req.body;
    console.log(name,tags,email);

    const file=req.files.videoFile;
    console.log(file);


        //validation 
    const supportedTypes=["mp4","mov"];
    const fileType=file.name.split('.')[1].toLowerCase();

    if(!isFileTypeSupported(fileType,supportedTypes)){
        return res.status(400).json({
            success:false,
            message:'file format not supported',
        })
    }

     //file format is supported

    //upload on cloudinary

    const response= await uploadFileToCloudinary(file,"myfolder");
    console.log("response=>",response);


     //save entry in db
     const fileData= await File.create({
        name,
        tags,
        email,
        imageUrl:response.secure_url,

    })


    res.json({
        success:true,
        imageUrl:response.secure_url,
        message:'video is successfully uploaded on cloudinary ',
    });





    }catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:"somethiing went wrong ",
        });
    }
}

/////////////////////////////////////////////////////////////
//imageReduceUpload handller
exports.imageReduceUpload=async (req,res)=>{
    try{

         //data fetch 
    const {name,email,tags}=req.body;
    console.log(name,tags,email);

    const file=req.files.imageFile;
    console.log(file);


        //validation 
    const supportedTypes=["jpg","png","jpeg","jfif"];
    const fileType=file.name.split('.')[1].toLowerCase();

    if(!isFileTypeSupported(fileType,supportedTypes)){
        return res.status(400).json({
            success:false,
            message:'file format not supported',
        })
    }

     //file format is supported

    //upload on cloudinary
//(30=>quality)
    const response= await uploadFileToCloudinary(file,"myfolder",30);
    console.log("response=>",response);


     //save entry in db
     const fileData= await File.create({
        name,
        tags,
        email,
        imageUrl:response.secure_url,

    })


    res.json({
        success:true,
        imageUrl:response.secure_url,
        message:'reduce file is successfully uploaded on cloudinary ',
    });



    







    }catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:"somethiing went wrong ",
        });

    }
}