const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
let mathSimilarQuestionsSchema =new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    qId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mathQuestions'
    },
    topic: {
        type: String
    },
    question: {
        type: String
    },
    imgUrl: {
        type: String
    },
    videoUrl: {
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
});



module.exports=mongoose.model('mathSimilarQuestions', mathSimilarQuestionsSchema,'mathSimilarQuestions');