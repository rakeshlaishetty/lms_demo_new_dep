//********************************* DOCUMENTS ROUTES ****************************************** */
var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const AWS = require("aws-sdk");

const Document = require("../Schemas/DocumentSchema");

// cloudinary.config({
//   cloud_name: "db0vkpdye",
//   api_key: "321311331486674",
//   api_secret: "3K_bVdk1OhgWQFvfQi-qKOZiGdY",
// });

const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET } = process.env;

AWS.config.setPromisesDependency(require("bluebird"));
AWS.config.update({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

router.post("/share-document", async (req, res) => {
  const s3 = new AWS.S3();

  const base64Data = new Buffer.from(
    req.body.file.replace(/^data:([A-Za-z-+\/]+);base64,/, ""),
    "base64"
  );
  const type = req.body.file.split(";")[0].split(":")[1];

  // console.log(type);

  const id = new mongoose.Types.ObjectId();

  const params = {
    Bucket: S3_BUCKET,
    Key: String(id),
    Body: base64Data,
    ACL: "public-read",
    ContentEncoding: "base64",
    ContentType: type,
  };

  let location = "";
  let key = "";

  try {
    const { Location, Key } = await s3.upload(params).promise();
    location = Location;
    key = Key;
  } catch (error) {
    console.log(error);
    return;
  }

  // console.log(location, key);

  const newDoc = {
    _id: id,
    name: req.body.name,
    category: req.body.category,
    classId: mongoose.Types.ObjectId(req.body.classId),
    url: location,
    format: type,
    created: new Date().toLocaleDateString(),
  };

  // console.log(newDoc);

  const nDoc = new Document(newDoc);
  nDoc
    .save()
    .then(() => {
      res.status(200).send();
    })
    .catch((e) => {
      console.log("error");
      res
        .status(500)
        .send({ status: false, message: "route not working fine" });
    });

  // res.status(200).send();
});

router.get("/getDocuments", async (req, res) => {
  const data = await Document.find({ classId: req.query.classId });
  res.status(200).send(data);
});

router.get("/download-file", async (req, res) => {
  var fileKey = String(req.query.key);
  // console.log("Trying to download file", fileKey);

  var s3 = new AWS.S3();
  var options = {
    Bucket: "lms-shared-documents",
    Key: fileKey,
  };

  res.attachment(fileKey);
  var fileStream = s3.getObject(options, function (err, data) {
    if (err) {
      console.log(err);
      return;
    } else {
      // console.log(data);
      // res.status(200).send(data.Body.toString('base64'));
      res.writeHead(200, {
        "Content-Type": data.ContentType,
        "Content-Length": data.ContentLength,
        // "Content-Disposition": 'attachment; filename="india.png"',
      });
      res.end(data.Body);
    }
  });

  // const file = s3.getObject(options).promise();
  // res.status(200).send(file.Body)
});

module.exports = router;
