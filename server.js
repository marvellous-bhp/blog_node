const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// const bcrypt = require('bcrypt')
const Article = require('./models/article')
const User = require('./models/user');

// const initRoutes = require('./routes/loginRoutes.js')
const methodOverride = require('method-override')
const app = express()
const path = require('path')
const port = 3332
const session = require('express-session');
const articleRouter = require('./routes/articles');
const loginRoutes = require('./routes/signRoutes');
const commentRouter = require('./routes/comment');
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
  .sort({ updateAt: 1 })
  res.render('articles/index', { articles,user })
})



app.listen(port, () => {
  console.log(`port ${port}`);
});


