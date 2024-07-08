const Book = require('../models/Book');

// Controller functions
exports.getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        next(error);
    }
};

exports.getBookByISBN = async (req, res, next) => {
    const isbn = req.params.isbn;
    try {
        const book = await Book.findOne({ isbn });
        res.json(book);
    } catch (error) {
        next(error);
    }
};

exports.getBooksByAuthor = async (req, res, next) => {
    const author = req.params.author;
    try {
        const books = await Book.find({ author });
        res.json(books);
    } catch (error) {
        next(error);
    }
};

exports.getBooksByTitle = async (req, res, next) => {
    const title = req.params.title;
    try {
        const books = await Book.find({ title: new RegExp(title, 'i') });
        res.json(books);
    } catch (error) {
        next(error);
    }
};

exports.getBookReview = async (req, res, next) => {
    const bookId = req.params.bookId;
    try {
        const book = await Book.findById(bookId).populate('reviews');
        res.json(book.reviews);
    } catch (error) {
        next(error);
    }
};

exports.addReview = async (req, res, next) => {
    const bookId = req.params.bookId;
    const { review } = req.body;
    try {
        const book = await Book.findById(bookId);
        book.reviews.push(review);
        await book.save();
        res.json(book);
    } catch (error) {
        next(error);
    }
};

exports.modifyReview = async (req, res, next) => {
    const { bookId, reviewId } = req.params;
    const { review } = req.body;
    try {
        const book = await Book.findById(bookId);
        const existingReview = book.reviews.id(reviewId);
        if (existingReview) {
            existingReview.set(review);
            await book.save();
            res.json(book);
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        next(error);
    }
};

exports.deleteReview = async (req, res, next) => {
    const { bookId, reviewId } = req.params;
    try {
        const book = await Book.findById(bookId);
        book.reviews.id(reviewId).remove();
        await book.save();
        res.json(book);
    } catch (error) {
        next(error);
    }
};
