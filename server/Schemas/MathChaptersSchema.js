//modules
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

let mathChapterChaptersSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    number: {
        type: Number,
        required: [true, 'Chapter must have a number']
    },
    name: {
        type: String,
        required: [true, 'Chapter must have a name']
    },
    class: {
        type: String,
        required: [true, 'Chapter must be associated with a class']
    }
});



module.exports = mongoose.model('mathChapters',mathChapterChaptersSchema,'mathChapters');