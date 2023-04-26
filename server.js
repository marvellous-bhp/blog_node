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
const {showArticles} = require('./helpers/showArticles');
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
  let userId = req.session.userId;
  console.log("id: ",req.session);
  let user = await User
  .findById(userId)
  let articles = await showArticles(userId,'dashboard')
  console.log(articles,"ll");
  console.log("checkkkk",userId === undefined);

  res.render('articles/index', { articles,user,userId })
})

app.get('/login', async (req, res) => {
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
  let articles = await showArticles(userId,'dashboard')
  console.log(articles,"ll");
  console.log("checkkkk",userId === undefined);

  res.render('articles/index', { articles,user,userId })
})


app.listen(port, () => {
  console.log(`port ${port}`);
});


