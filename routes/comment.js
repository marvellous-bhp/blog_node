const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');

// Get all comments for a post
// router.get('/cmt/:articleId', commentController.getAllComments);
// Create a new comment
router.post('/:articleId', commentController.createComment);


// Update a comment by ID
router.post('/:id/edit', commentController.updateComment);

// Delete a comment by ID
router.get('/:id/del', commentController.deleteComment);

router.get('/:id/like', commentController.likeComment);

module.exports = router;
