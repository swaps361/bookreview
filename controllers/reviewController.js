const Review = require('../models/Review');

exports.addReview = async (req, res, next) => {
    const { user, book, rating, comment } = req.body;
    try {
        const newReview = new Review({ user, book, rating, comment });
        await newReview.save();
        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        next(error);
    }
};

exports.updateReview = async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const { rating, comment } = req.body;
    try {
        const updatedReview = await Review.findByIdAndUpdate(reviewId, { rating, comment }, { new: true });
        res.json(updatedReview);
    } catch (error) {
        next(error);
    }
};

exports.deleteReview = async (req, res, next) => {
    const reviewId = req.params.reviewId;
    try {
        await Review.findByIdAndDelete(reviewId);
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        next(error);
    }
};
