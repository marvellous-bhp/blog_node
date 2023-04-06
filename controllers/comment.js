const Comment = require('../models/comment');
const Article = require('../models/article');
const User = require('../models/user');

exports.createComment = async (req, res) => {
  console.log("rep",req.params);
  try {
    console.log("cmt",req.body);
    const comment = new Comment({
      text: req.body.comment,
      User: req.session.userId,
      article: req.params.articleId, // changed from req.params.id
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
    let user = await User.findById(comment.User).select("name, avatar")
    console.log("ukk",user);
    comment.User = user
    console.log("cmt ok",cmt_id);
    res.send(comment);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).send('Comment not found');
    }
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.updateComment = async (req, res) => {
  try {
    console.log("repara",req.body);
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!comment) {
      return res.status(404).send('Comment not found');
    }
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).send('Comment not found');
    }
    res.redirect('/dashboard')
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
