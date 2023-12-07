const express=require('express');
const router=express.Router();

//fetch controller/Handllers
const {localFileUpload,imageUpload,videoUpload,imageReduceUpload}=require("../controllers/fileUpload");

router.post("/localFileUpload",localFileUpload);
router.post("/imageUpload",imageUpload);
router.post("/videoUpload",videoUpload);
router.post("/imageReduceUpload",imageReduceUpload);

module.exports=router;

