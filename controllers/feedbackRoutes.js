//********************************* FEEDBACK ROUTES ****************************************** */

var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

const Classes = require("../Schemas/ClassesSchema");
const Teachers = require("../Schemas/TeacherSchema");
const Ratings = require("../Schemas/RatingSchema");

router.get("/getRatingsFromStudent", async (req, res) => {
  const data = [];
  const ids = req.query.teachers[0].split(",");
  for (let id of ids) {
    const doc = await Ratings.findOne({
      teacherId: id,
      "ratings.studentId": mongoose.Types.ObjectId(req.query.studentId),
    });

    if (!doc) {
      data.push({ teacherId: id, rating: 0, timing: 0, preparedness: 0, attitude: 0 });
    } else {
      const student = doc.ratings.find(
        (item) => item.studentId == req.query.studentId
      );
      
      data.push({
        teacherId: id,
        rating: student.rating,
        timing: student.timing,
        attitude: student.attitude,
        preparedness: student.preparedness,
      });
    }
  }
  res.status(200).send(data);
});

router.get('/getFeedbackReport', async (req, res) => {
  const data = await Ratings.findOne({teacherId: req.query.teacherId});
  res.status(200).send(data);
})

router.post("/setRating", async (req, res) => {
    const ratings = req.body.ratings

    try{
        for(const teacherId in ratings){
        
            const found = await Ratings.findOne({
                teacherId: teacherId,
                "ratings.studentId": mongoose.Types.ObjectId(req.body.studentId),
              });
    
              if (found === null) {
                //Insert
                const data = {
                  studentId: mongoose.Types.ObjectId(req.body.studentId),
                  preparedness: ratings[teacherId].preparedness,
                  timing: ratings[teacherId].timing,
                  attitude: ratings[teacherId].attitude,
                };
                await Ratings.updateOne(
                  { teacherId: teacherId },
                  { $push: { ratings: data } }
                );
              }else {
                //Update
                await Ratings.updateOne(
                  {
                    teacherId: teacherId,
                    "ratings.studentId": mongoose.Types.ObjectId(req.body.studentId),
                  },
                  {
                    $set: {
                      "ratings.$.attitude": ratings[teacherId].attitude,
                      "ratings.$.timing": ratings[teacherId].timing,
                      "ratings.$.preparedness": ratings[teacherId].preparedness,
                    },
                  }
                );
              }
              res.status(200).send();
        }
    }
    catch(err){
        if(err){
            console.log(err)
            res.status(500).send()
        }
    }

 
 
 
});

module.exports = router;
