const mongoose = require('mongoose');

const userPhotoSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
}, { timestamps: true})

const UserPhoto = mongoose.model('UserPhoto', userPhotoSchema);

module.exports = { UserPhoto };