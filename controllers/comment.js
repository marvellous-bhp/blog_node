const Comment = require('../models/comment');
const Article = require('../models/article');
const User = require('../models/user');

exports.createComment = async (req, res) => {
  // console.log("rep",req.params);
  try {
    // console.log("cmt",req.body);
    let arr = []
    let comment = new Comment({
      text: req.body.comment,
      User: req.session.userId,
      article: req.params.articleId,
      like_list: arr,
       // changed from req.params.id
    });
    await comment.save();
    let cmt_id = comment._id;
    await Article.updateOne(
      {
        _id: req.params.articleId,
      },
      {
        $push: {
          comment_list: cmt_id,
        },
      }
    )
    let user = await User.findById(req.session.userId).select("name avatar")
    // console.log("ukk",req.session.userId,user);
    comment.User = user
    let ava = comment.User.avatar.data.toString('base64')
    res.send({comment,user,ava});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.updateComment = async (req, res) => {
  try {
    // console.log("repara",req.body);
    let comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!comment) {
      return res.status(404).send('Comment not found');
    }
    res.send(comment);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteComment = async (req, res) => {
  try {
    let comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).send('Comment not found');
    }
    res.redirect('/dashboard')
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.likeComment = async (req, res) => {
  
  let user_id = req.session.userId;
  let comment = await Comment.findById(req.params.id).select("like_list _id");
  console.log(comment,"lkjhg");
  let old_like = comment.like_list.length
  let new_like
  if(user_id){
    if (comment.like_list && (comment.like_list.includes(user_id))){
      await Comment.updateOne(
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
      console.log(comment.like_list.length,"aaa");
    }
    else {
        await Comment.updateOne(
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
  console.log(new_like,old_like,new_like > old_like,"kkmn");
  res.send(like_arr)
  // res.send("o")
};


