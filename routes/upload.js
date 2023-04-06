const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path')

const User = require('../models/user');


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

let upload = multer({ storage: storage });

router.get('/img', (req, res) => {
  console.log("hehe");
  User.findById(req.session.userId)
  .then((data, err)=>{
      if(err){
          console.log(err);
      }
      console.log("dataa",data);
      res.render('imagepage',{items: data})
  })
});

router.post('/img', upload.single('image'), async (req, res, next) => {
  console.log("lkjh",req.body);
  var obj = 
      {
          data: fs.readFileSync(path.join(__dirname,'..' + '/uploads/' + req.body.image)),
          contentType: 'image/png'
      }
  // console.log("db1",obj);
  
  await User.findById(req.session.userId).updateOne(
    {
      avatar: obj,
    },
  )
  let id = req.session.userId
  let u = await User.findById(id);
  // console.log("mm1",u);
  res.redirect('/user/detail');
});


module.exports = router;
