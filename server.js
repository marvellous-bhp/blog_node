const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// const bcrypt = require('bcrypt')
const Article = require('./models/article')
const User = require('./models/user');
const Comment = require('./models/comment');

// const initRoutes = require('./routes/loginRoutes.js')
const methodOverride = require('method-override')
const app = express()
const path = require('path')
const port = 3331
const session = require('express-session');
const articleRouter = require('./routes/articles');
const loginRoutes = require('./routes/signRoutes');
const commentRouter = require('./routes/comment');
const userRouter = require('./routes/user');
const imageRoutes = require('./routes/image');
//cnn db
mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})


// Set up session middleware
app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: false
}));

// Set up body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Include login routes
app.use('/', loginRoutes);
//
app.use('/articles', articleRouter);
//
app.use('/cmt', commentRouter)

app.use('/user', userRouter)
//view
app.set('view engine', 'ejs')

//app conf
app.use(express.static('public'));
app.use(express.static('helpers'))

app.post('/upload',(req,res)=>{
  console.log("ok")
})

app.post('/',(req,res)=>{
  console.log(req.body);
})

app.get('/', async (req, res) => {
  res.render('sign/login')
})

app.get('/register', async (req, res) => {
  res.render('sign/register')
})

app.get('/dashboard', async (req, res) => {
  let userId = req.session.userId;
  console.log("id: ",req.session);
  let user = await User
  .findById(userId)
  let articles = await Article
  .find({$or:[{User:req.session.userId},{status:'public'}]})
  // .populate([{path:'Comment'}])
  .sort({ updateAt: 1 })


  for(let i=0; i<articles.length; i++){
    let cmt = await Comment.find({ article: articles[i]._id.toString() });
    // let user_cmt = await User.find({_id:cmt.User})
    // console.log("cmmm",cmt);
    for(let j=0; j<cmt.length;j++){
      // console.log(cmt);
      let user_cmt = await User.find({_id:cmt[j].User})
      cmt[j].User = user_cmt[0].name
    }
    (articles[i]).comment_list = cmt;
    // console.log("cmme",articles[i].comment_list);
  }
  // let cme = await Comment.find({ article: "641b21e0abf32c3748942a4b" })

  // console.log("aaar",articles[0].comment_list[0]);
  res.render('articles/index', { articles,user,aa: JSON.stringify(articles) })
})

const multer = require('multer');



// Thiết lập thư mục 'uploads' để lưu trữ các tệp hình ảnh được tải lên
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

// Tạo middleware multer để xử lý tệp hình ảnh được tải lên từ giao diện trên
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
}).single('image');

// Định nghĩa route xử lý yêu cầu tải lên tệp hình ảnh
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send(err.message);
    } else {
      console.log("ok nha");
      res.send('Upload success');
    }
  });
});


app.listen(port, () => {
  console.log(`port ${port}`);
});


