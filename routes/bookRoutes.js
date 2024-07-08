const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticateJWT } = require('../middleware/authMiddleware');

router.get('/', bookController.getAllBooks);
router.get('/:isbn', bookController.getBookByISBN);
router.get('/author/:author', bookController.getBooksByAuthor);
router.get('/title/:title', bookController.getBooksByTitle);
router.get('/:bookId/reviews', bookController.getBookReview);
router.post('/:bookId/reviews', authenticateJWT, bookController.addReview);
router.put('/:bookId/reviews/:reviewId', authenticateJWT, bookController.modifyReview);
router.delete('/:bookId/reviews/:reviewId', authenticateJWT, bookController.deleteReview);

module.exports = router;
