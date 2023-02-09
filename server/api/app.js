import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import models from './models/index.js';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
const __dirname = path.resolve();

//create app
const app = express();


//connect to db name
mongoose.connect('mongodb://localhost:27017/homesearchdb');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/images')));

routes(app);





// The code below uses /public/images folder
var storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + '-' +file.originalname )
    cb(null, file.originalname)

  }
})

//uploading images
var upload = multer({ storage: storage }).array('file')
app.post('/pics', function (req, res) {

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)

  })

});

export default app;