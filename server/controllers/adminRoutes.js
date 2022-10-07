//********************************* ADMIN ROUTES ****************************************** */

var express = require("express");
var router = express.Router();
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const multer = require("multer");
const mongoose = require("mongoose");



const Admin = require("../Schemas/AdminSchema");




const storage = new GridFsStorage({
    url: "mongodb+srv://Qwings_India:thisIsNewPassword@lms.5dnac.mongodb.net/?retryWrites=true&w=majority",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, res) => {
      const match = ["image/png", "image/jpg", "image/jpeg"];
      if (match.indexOf(file.mimetype) === -1) {
        const filename = `${Date.now()}-any-name-${file.originalname}`;
        return filename;
      }
  
      return {
        bucketName: "photos",
        filename: `${Date.now()}-any-name-${file.originalname}`,
      };
    },
  });
  
  const upload = multer({ storage });





router.get("/getAdminDetails", async (req, res) => {
  const admin = await Admin.findOne({ _id: req.query.id }).populate("schoolId");
  // console.log(admin)
  res.status(200).send(admin);
});

router.post("/editAdminDetails", upload.single("file"), async (req, res) => {
  // if(req.file === undefined) return res.status(500).send("You must select a file!");

  console.log(req.body.schooLogo);
  // await Admin.updateOne({_id: req.body.id}, {$set: {
  //   name: req.body.adminName,
  //   email: req.body.adminEmail
  // }});

  // await School.updateOne({_id: req.body.schoolId}, {$set: {
  //   name: req.body.schoolName,
  //   city: req.body.schoolCity,
  // }})

  res.status(200).send();
});




module.exports = router;