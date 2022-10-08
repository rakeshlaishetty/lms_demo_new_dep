const db = 'mongodb+srv://Qwings_India:thisIsNewPassword@lms.5dnac.mongodb.net/?retryWrites=true&w=majority';

module.exports = (mon) => {
  mon
    .connect(db, { useNewUrlParser: true })
    .then(() => {
      console.log("database connection made");
    })
    .catch((err) => console.log(err + " while connecting the datanbase"));
};
