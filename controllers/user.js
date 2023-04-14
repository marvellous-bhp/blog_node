const Comment = require('../models/comment');
const Article = require('../models/article');
const User = require('../models/user');


exports.getAllUser = async (req, res) => {
  try {
    let user = await User.find();
    let userId = req.session.userId;
    let users = []
    console.log(user,"ll");
    for(let i=0;i<user.length;i++){
        users.push(user[i])
        // console.log(user[i],"mm");
    }
    for(let i=0; i<users.length; i++){
        let articles = await Article.find({User:users[i]._id.toString()})
        let art_count = articles.length;
        users[i]["password"] = art_count;
        // console.log(users[i],art_count,"uu");

    }
    console.log("list u",users);
    res.render('users/listUser', { users,userId })
    // res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getDetailUser = async (req, res) => {
  try {
    let userId = req.session.userId;
    let user = await User.findById(userId);
    let articles = []
    articles = await Article.find({User:userId.toString()}).sort({ createdAt: -1 })
    let art_count = articles.length;
    if (art_count === 0){
      articles.push({
        title: 'This account have not had an article',
      })
    }
    // user[0]["password"] = art_count;
    console.log(articles,"oooo");
    res.render('users/detail', { user,articles,art_count,userId })
    // res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getArticleUser = async (req, res) => {
  let article = await Article.findOne({ slug: req.params.slug });
  let userId = req.session.userId;
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
  res.render('articles/show', { article, cmt, userId })
};

