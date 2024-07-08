const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    reviewText: String,
    rating: Number,
    date: { type: Date, default: Date.now }
});

const bookSchema = new Schema({
    title: String,
    author: String,
    isbn: String,
    reviews: [reviewSchema]
});

module.exports = mongoose.model('Book', bookSchema);
