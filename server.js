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
  .populate([{path:'comment_list'}])
  .sort({ updateAt: 1 })
  let cmt = await Comment
  .find({User:req.session.userId})
  .populate([
    {
      path: 'Articles',
      select: "title",
    },])
  .sort({ updateAt: 1 })
  
  Article.find({$or:[{User:req.session.userId},{status:'public'}]}, (err, articles) => {
    if (err) {
      console.log(err);
      return;
    }
  
    // For each article, find its associated comments
    articles.forEach((article) => {
      let cme = Comment.find({ article: article._id }, (err, comments) => {
        if (err) {
          console.log(err);
          return;
        }
      
        // Print the article and its comments
        // console.log(`Article: ${article.title}`);
        // console.log(`Comments: ${comments.map((c) => c.text).join(', ')}`);
      });
      // console.log("cmt",cme);
    });

    
  });


  console.log("aaar",articles);
  res.render('articles/index', { articles,user, cmt,aa: JSON.stringify(articles) })
})



app.listen(port, () => {
  console.log(`port ${port}`);
});


