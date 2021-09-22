const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
    ownerId: {
        type: String,
        required: true
    },
    bookId: {
        type: String,
        required: true
    },
}, { timestamps: true})

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite };