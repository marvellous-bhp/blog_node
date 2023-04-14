const express = require('express')
const Article = require('../models/article')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const Comment = require('../models/comment')


router.get('/new', async(req, res) => {
  let userId = req.session.userId;
  let user = await User.findById(req.session.userId)
  console.log(user,"user");
  res.render('articles/new', { article: new Article(),user,userId })
})

router.get('/edit/:id', async (req, res) => {
  let userId = req.session.userId;
  let article = await Article.findById(req.params.id)
  let user = await User.findById(req.session.userId)
  
  let user_id = article.User
  if (user_id === req.session.userId){
    res.render('articles/edit', { article, user,userId })
  }
  // else{
  //   res.render('/dashboard')
  // }  
})

router.get('/:slug', async (req, res) => {
  let userId = req.session.userId;
  let article = await Article.findOne({ slug: req.params.slug });
  console.log(article.User,"llkjh");
  let markdown = await User.findById(article.User);
  article.markdown = markdown
  let cmt = await Comment.find({ article: article._id.toString() });
    // let user_cmt = await User.find({_id:cmt.User})
    // console.log("cmmm",cmt);
    for(let j=0; j<cmt.length;j++){
      // console.log(cmt);
      let user_cmt = await User.find({_id:cmt[j].User})
      cmt[j].User = user_cmt[0]
    }
    (article).comment_list = cmt;
  // console.log("p",req);
  if (article == null) res.redirect('/')
  res.render('articles/show', { article, cmt,userId })
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
  let cur_user = req.session.userId;
  let art = await Article.findById(req.params.id).select("User")
  console.log(art,"arrrrj");
  if(cur_user===art.User){
    await Article.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({article:req.params.id})
    res.redirect('/dashboard')
  }
  // else res.send("It is not your Article!!!")
})

router.post('/like/:id', async (req, res) => {
  let user_id = req.session.userId;
  let article = await Article.findById(req.params.id).select("like_list _id");
  let old_like = article.like_list.length
  let new_like
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
      )
      new_like = old_like - 1;
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
        new_like=old_like+1;
        // console.log(article.like_list.length,"aaa");
      }
  }
  // let new_like = article.like_list
  let like;
  if(new_like>old_like){
    like = true;
  }
  else{
    like = false;
  }
  let like_arr = [];
  like_arr.push(like,new_like)
  console.log(new_like,old_like,new_like > old_like,"kkm");
  res.send(like_arr)
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
    let userId = req.session.userId;
    // console.log("rbody",req.body.status);
    // console.log("resbody",req.body);

    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.detail = req.body.detail
    article.markdown = req.body.markdown
    article.User = req.session.userId
    article.status = req.body.status.toString()
    article.like_list =[]
    console.log(article.status,"user");
    // console.log(req.body);
    try {
      article = await article.save()
      res.redirect(`/articles/${article.slug}`)
    } catch (e) {
      res.render(`articles/${path}`, { article: article,userId })
    }
  }
}

module.exports = router