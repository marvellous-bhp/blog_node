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
const multer = require('multer');
const fs = require('fs');
const articleRouter = require('./routes/articles');
const loginRoutes = require('./routes/signRoutes');
const commentRouter = require('./routes/comment');
const userRouter = require('./routes/user');
const uploadRouter = require('./routes/upload');
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

app.use('/upload', uploadRouter)
//view
app.set('view engine', 'ejs')

//app conf
app.use(express.static('public'));
app.use(express.static('helpers'));

// 


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
  .sort({ updatedAt: -1 })
  


  for(let i=0; i<articles.length; i++){
    let user_art = await User.findById(articles[i].User)
    articles[i].User = user_art
    // console.log("ua",user_art);
    let cmt = await Comment.find({ article: articles[i]._id.toString() });
    // let user_cmt = await User.find({_id:cmt.User})
    // console.log("cmmm",cmt);
    for(let j=0; j<cmt.length;j++){
      // console.log(cmt);
      let user_cmt = await User.find({_id:cmt[j].User})
      // if(user_cmt)
//      {
        cmt[j].User = user_cmt[0]
      // }
    }
    (articles[i]).comment_list = cmt;
    // console.log("cmme",articles[i].comment_list);
  }

  res.render('articles/index', { articles,user,userId })
})


app.listen(port, () => {
  console.log(`port ${port}`);
});


