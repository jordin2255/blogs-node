const path=require('path');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer=require('multer');
const {v4:uuidv4}=require('uuid');
const app = express();


const fileStorage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'images');
  },
  filename:(req,file,cb)=>{
    cb(null,uuidv4())
  }
});
const fileFilter=(req,file,cb)=>{
  if(file.mimetype==='image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
    cb(null,true);
  }else{
    cb(null,false);
  }
}
app.use(bodyParser.json());
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'));
app.use('/images',express.static(path.join(__dirname,'images')));
// app.use('/images',express.static('images'));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const feedRoutes = require("./routes/feed");

app.use("/feed", feedRoutes);

app.use((error,req,res,next)=>{
  console.log(error);
  const status=error.statusCode || 500;
  const message=error.message;
  res.status(status).json({message:message});
});

mongoose
  .connect('mongodb+srv://jordin:password%40123@cluster0.q8wxp.mongodb.net/messages?retryWrites=true&w=majority&appName=Cluster0')
  .then((result) => app.listen(8080))
  .catch((err) => console.log(err));
