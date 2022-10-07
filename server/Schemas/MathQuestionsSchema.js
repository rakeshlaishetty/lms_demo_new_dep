const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

let mathQuestionSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    chapId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mathChapters'
    },
    type: {
        type: String
    },
    qNo: {
        type: String
    },
    topic: {
        type: String
    },
    statement: {
        type: String
    },
    question: {
        type: String
    },
    level: {
        type: String
    },
    imgUrl: {
        type: String
    },
    option1: {
        type: mongoose.Schema.Types.Mixed
    },
    option2: {
        type: mongoose.Schema.Types.Mixed
    },
    option3: {
        type: mongoose.Schema.Types.Mixed
    },
    option4: {
        type: mongoose.Schema.Types.Mixed
    },
    item1: {
        type: String
    },
    item2: {
        type: String
    },
    item3: {
        type: String
    },
    item4: {
        type: String
    }
});



module.exports = mongoose.model('mathQuestions', mathQuestionSchema, 'mathQuestions');