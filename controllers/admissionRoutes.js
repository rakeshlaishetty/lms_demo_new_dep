//********************************* ADMISSION ROUTES ****************************************** */

var express = require("express");
var router = express.Router();



const Student = require("../Schemas/StudentSchema");
const Classes = require("../Schemas/ClassesSchema");


router.get("/getAdmission", async (req, res) => {
  let data = await Student.find({ class: req.query.classId });
  res.status(200).send(data);
});

router.get("/getRecentAdmissions", async (req, res) => {
  let data = await Student.find({schoolId: req.query.schoolId}).sort({$natural:-1}).limit(5).populate('class');
  console.log(data) 
  res.status(200).send(data);
});

router.get('/getGenderDistribution', async (req, res) => {
  let males = await Student.countDocuments({schoolId: req.query.schoolId, gender: 'male'})
  let females = await Student.countDocuments({schoolId: req.query.schoolId, gender: 'female'})
  
  const data = [
    (males/(males+females))*100,
    (females/(males+females))*100
  ]

  res.status(200).send(data);
})

module.exports = router;