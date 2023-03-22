const express = require('express')
const Article = require('../models/article')
const router = express.Router()
const passport = require('passport')

router.get('/new', (req, res) => {
  
  res.render('articles/new', { article: new Article() })
})

router.get('/edit/:id', async (req, res) => {
  
  let article = await Article.findById(req.params.id)
  
  let user_id = article.User
  if (user_id === req.session.userId){
    res.render('articles/edit', { article: article })
  }
  else{
    res.render('/dashboard')
  }  
})

router.get('/:slug', async (req, res) => {
  let article = await Article.findOne({ slug: req.params.slug })
  // console.log("p",req);
  if (article == null) res.redirect('/')
  res.render('articles/show', { article: article })
})

router.post('/', async (req, res, next) => {
  req.article = new Article()
  next()
  // console.log("user..",req.session);
}, saveArticleAndRedirect('new'))

router.post('/upload',(req,res)=>{
  console.log("ok")
})

router.post("/", passport.authenticate('local',{
  failureRedirect: "/",
  successRedirect: '/'
}));

router.post('/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id)
  // console.log("par",req.params);
  next()
}, saveArticleAndRedirect('/edit'))

router.post('/delete/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  // console.log(req.params.id,"ddd");
  res.redirect('/dashboard')
})

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    // console.log("rbody",req.body.status);
    // console.log("resbody",req.body);

    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.detail = req.body.detail
    article.markdown = req.body.markdown
    article.User = req.session.userId
    article.status = req.body.status.toString()
    console.log(article.status,"user");
    // console.log(req.body);
    try {
      article = await article.save()
      res.redirect(`/articles/${article.slug}`)
    } catch (e) {
      res.render(`articles/${path}`, { article: article })
    }
  }
}

module.exports = router