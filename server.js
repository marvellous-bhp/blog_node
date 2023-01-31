const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const initRoutes = require('./routes/user.js')
const methodOverride = require('method-override')
const app = express()
const path = require('path')
const port = 3434

//cnn db
mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

//view
app.set('views/articles',path.join(__dirname,'views'))
app.set('view engine', 'ejs')

//app conf
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended: true}));
initRoutes(app);


app.post('/upload',(req,res)=>{
  console.log("ok")
})

app.post('/login',(req,res)=>{
  console.log(req.body)
})

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(port, () => {
  console.log(`port ${port}`);
});