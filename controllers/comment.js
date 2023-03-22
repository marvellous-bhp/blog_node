const Comment = require('../models/comment');

exports.createComment = async (req, res) => {
  try {
    const comment = new Comment({
      text: req.body.text,
      author: req.body.author,
      post: req.params.postId
    });
    await comment.save();
    res.status(201).json(comment);
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
    res.send('Comment deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
