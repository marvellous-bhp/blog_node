const express = require('express')
const Article = require('../models/article')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const Comment = require('../models/comment')


router.get('/new', async(req, res) => {
  let user = await User.findById(req.session.userId)
  console.log(user,"user");
  res.render('articles/new', { article: new Article(),user })
})

router.get('/edit/:id', async (req, res) => {
  
  let article = await Article.findById(req.params.id)
  let user = await User.findById(req.session.userId)
  
  let user_id = article.User
  if (user_id === req.session.userId){
    res.render('articles/edit', { article, user })
  }
  else{
    res.render('/dashboard')
  }  
})

router.get('/:slug', async (req, res) => {
  let article = await Article.findOne({ slug: req.params.slug });
  let cmt = await Comment.find({ article: article._id.toString() });
    // let user_cmt = await User.find({_id:cmt.User})
    // console.log("cmmm",cmt);
    for(let j=0; j<cmt.length;j++){
      // console.log(cmt);
      let user_cmt = await User.find({_id:cmt[j].User})
      cmt[j].User = user_cmt[0].name
    }
    (article).comment_list = cmt;
  // console.log("p",req);
  if (article == null) res.redirect('/')
  res.render('articles/show', { article, cmt })
})

router.post('/', async (req, res, next) => {
  req.article = new Article()
  next()
  // console.log("user..",req.session);
}, saveArticleAndRedirect('/new'))

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
  await Article.findByIdAndDelete(req.params.id);
  await Comment.deleteMany({article:req.params.id})
  res.redirect('/dashboard')
})

router.post('/like/:id', async (req, res) => {
  let user_id = req.session.userId;
  let article = await Article.findById(req.params.id).select("like_list _id");
  let article_id = article._id

  if(user_id){
    if (article.like_list && (article.like_list.includes(user_id))){
      await Article.updateOne(
        {
          _id: req.params.id,
        },
        {
          $pull: {
            like_list: user_id,
          },
        },
        // {
        //   $set: {
        //     like_count: like_list.length(),
        //   },
        // }
      )
      console.log(article.like_list.length,"aaa");
    }
    else {
        await Article.updateOne(
          {
            _id: req.params.id,
          },
          {
            $push: {
              like_list: user_id,
            },
          }
        );
        // console.log(article.like_list.length,"aaa");
      }
  }
  let count = article.like_list
  
  res.send(count)
  // res.redirect(`/like/${id}`)
  // res.redirect(`/dashboard`)
})

// router.get("/like/:id", async(req,res)=>{
//   let article = await Article.findById(req.params.id).select("like_list _id");

//   console.log(article,"kkkkkkk");
//   res.render("custom/payout_information_1_completed",{payout_completed, current_balance});
// })


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