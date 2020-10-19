const express = require('express');
const router = express.Router();
//const { Video } = require("../models/Video");
const multer = require('multer');
const { auth } = require("../middleware/auth");


// storage multer config
let storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,"uploads/");
    },
    // where to save the video file

    filename: (req,file,cb) =>{
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    // get filename
    filefilter: (req,file,cb) => {
        const text = path.extname(file.originalname)
        if(ext != '.mp4'){   
            return cb(res.status(400).end('only mp4 is allowed'),false);
        }
        // filefiltering : only mp4 type 
        // ext != '.mp4' || ext != '.png'
        cb(null,true)
    }
});

const upload = multer({storage : storage}).single("file")




router.post('/uploadfiles', (req,res) => {

    // save video in server
    upload(req,res,err => { 
        if(err){
            return res.json({success:false,err})
        }
        return res.json({success:true,url:res.req.file.path, fileName:res.req.file.filename})
        // url : file path
    })
})




module.exports = router;