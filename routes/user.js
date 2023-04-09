const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Get all comments for a post
// router.get('/cmt/:articleId', commentController.getAllComments);
// Create a new comment
router.get('/list', userController.getAllUser);

router.get('/detail', userController.getDetailUser);

router.get('/articles/:slug', userController.getArticleUser)

module.exports = router;
