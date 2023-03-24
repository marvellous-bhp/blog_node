const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');

// Get all comments for a post
router.get('/:articleId/comments', commentController.getAllComments);

// Get a single comment by ID
router.get('/:articleId/comments/:id', commentController.getComment);

// Create a new comment
router.post('/:articleId/comments', commentController.createComment);

// Update a comment by ID
router.put('/:articleId/comments/:id', commentController.updateComment);

// Delete a comment by ID
router.delete('/:articleId/comments/:id', commentController.deleteComment);

module.exports = router;
