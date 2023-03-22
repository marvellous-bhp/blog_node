const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');

// Get all comments for a post
router.get('/:postId/comments', commentController.getAllComments);

// Get a single comment by ID
router.get('/:postId/comments/:id', commentController.getComment);

// Create a new comment
router.post('/:postId/comments', commentController.createComment);

// Update a comment by ID
router.put('/:postId/comments/:id', commentController.updateComment);

// Delete a comment by ID
router.delete('/:postId/comments/:id', commentController.deleteComment);

module.exports = router;
