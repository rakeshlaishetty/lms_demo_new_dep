const mongoose = require("mongoose");

const SctudentSchema = new mongoose.Schema({
  class: String,
  subject: [
    {
      chapterName: String,
      easyQue: [
        {
          question: String,
          opt1: String,
          opt2: String,
          opt3: String,
          opt4: String,
          ans: String,
          marks: {
            type: String,
            default: 0,
          },
        },
      ],
      mediumQue: [
        {
          question: String,
          opt1: String,
          opt2: String,
          opt3: String,
          opt4: String,
          ans: String,
          marks: {
            type: String,
            default: 0,
          },
        },
      ],
      difficultQue: [
        {
          question: String,
          opt1: String,
          opt2: String,
          opt3: String,
          opt4: String,
          ans: String,
          marks: {
            type: String,
            default: 0,
          },
        },
      ],
    },
  ],
});

Student = mongoose.model("questions", SctudentSchema, "questions");
module.exports = Student;
