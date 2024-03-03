const mongoose = require('mongoose');

const jokeSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    joke: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Joke', jokeSchema);