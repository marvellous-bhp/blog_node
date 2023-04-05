const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Get all comments for a post
// router.get('/cmt/:articleId', commentController.getAllComments);
// Create a new comment
router.get('/list', userController.getAllUser);

// router.get('/list', async (req, res) => {
//     let article = await Article.findOne({ slug: req.params.slug })
//     // console.log("p",req);
//     if (article == null) res.redirect('/')
//     res.render('articles/show', { article: article })
//   })

// Get a single comment by ID
// router.get('/:articleId', commentController.getComment);

// // Update a comment by ID
// router.post('/:id/edit', commentController.updateComment);

// // Delete a comment by ID
// router.post('/:id/del', commentController.deleteComment);

module.exports = router;
