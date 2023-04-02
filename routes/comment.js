const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');

// Get all comments for a post
// router.get('/cmt/:articleId', commentController.getAllComments);
// Create a new comment
router.post('/:articleId', commentController.createComment);

// Get a single comment by ID
router.get('/:articleId', commentController.getComment);

// Update a comment by ID
router.post('/:id/edit', commentController.updateComment);

// Delete a comment by ID
router.post('/:id/del', commentController.deleteComment);

module.exports = router;
