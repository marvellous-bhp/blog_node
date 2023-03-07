const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
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
app.use('/login', loginRoutes);
//view
app.set('views/articles',path.join(__dirname,'views'))
app.set('view engine', 'ejs')

//app conf
// app.use(express.urlencoded({ extended: false }))
// app.use(methodOverride('_method'))
// app.use(express.static(path.join(__dirname,'public')))
// app.use(bodyParser.urlencoded({extended: true}));
// loginRoutes(app);


app.post('/upload',(req,res)=>{
  console.log("ok")
})

app.post('/login',(req,res)=>{
  console.log(req.body);
})

app.get('/login', async (req, res) => {
  
  res.render('sign/login')
})

// Set up registration route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const existingLogin = await User.findOne({ username });
  if (existingLogin) {
    res.status(409).send('Username already exists');
    return;
  }
  const login = new User({ username, password });
  await login.save();
  res.send('Account created successfully');
});

app.get('/register', async (req, res) => {
  
  res.render('sign/register')
})

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(port, () => {
  console.log(`port ${port}`);
});


