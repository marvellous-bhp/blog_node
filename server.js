const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// const bcrypt = require('bcrypt')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
// const initRoutes = require('./routes/loginRoutes.js')
const User = require('./models/user')
const methodOverride = require('method-override')
const app = express()
const path = require('path')
const port = 3332
const session = require('express-session');
const loginRoutes = require('./routes/signRoutes');
const user = require('./routes/user');
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

app.use('/user', user);
//view
app.set('views/articles',path.join(__dirname,'views'))

app.set('view engine', 'ejs')

// app.get('/public/css/article.css', function(req, res) {
//   res.setHeader('Content-Type', 'text/css');
//   res.sendFile(__dirname + '/public/css/article.css');
// });
// app.get('/public/css/edit.css', function(req, res) {
//   res.setHeader('Content-Type', 'text/css');
//   res.sendFile(__dirname + '/public/css/edit.css');
// });
// app.get('/public/css/partials/header.css', function(req, res) {
//   res.setHeader('Content-Type', 'text/css');
//   res.sendFile(__dirname + '/public/css/edit.css');
// });
// app.get('/public/css/partials/main.css', function(req, res) {
//   res.setHeader('Content-Type', 'text/css');
//   res.sendFile(__dirname + '/public/css/edit.css');
// });
// app.get('/public/css/login.css', function(req, res) {
//   res.setHeader('Content-Type', 'text/css');
//   res.sendFile(__dirname + '/public/css/login.css');
// });

// console.log("aabc",path.join(__dirname + '/public/css/edit.css'));
//app conf
// app.use(express.urlencoded({ extended: false }))
// app.use(methodOverride('_method'))
// app.use(express.static(path.join(__dirname,'public')))
// app.use(bodyParser.urlencoded({extended: true}));
// loginRoutes(app);

app.get('/listUser', async (req, res) => {
  let listUser = await User.find();
  let list = JSON.stringify(listUser)
  console.log("list",list.length);
  res.render('users/listUser', { list: list})
});

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
  const userId = req.session.userId;
  console.log("id: ",userId);
  let articles = await Article
  .find({$or:[{User:req.session.userId},{User:null}]})
  // .find({User:null})
  .sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(port, () => {
  console.log(`port ${port}`);
});


