//********************************* FEES ROUTES ****************************************** */

var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");


const FeeTransaction = require("../Schemas/FeeTransactionSchema");
const Student = require("../Schemas/StudentSchema");
const School = require("../Schemas/SchoolSchema");

router.get('/getInstallments', async (req, res) => {
    let installments = await FeeTransaction.find({studentId: req.query.studentId});
    res.status(200).send(installments);
})

router.get("/getDues", async (req, res) => {
    //First check the payment type of the student and total fees for each month
    let student = await Student.findOne({_id: req.query.studentId}, {paymentType: 1, fees: 1});
    
    let totalFees = student.fees.admission + student.fees.sports + student.fees.tuition + student.fees.transport;

    //Lets say the school collects fees on the 4th of every month
    let school = await School.findOne({_id: req.query.schoolId})
    let paymentDay = school.paymentDay;

    //Today's date
    let date = new Date()

    const data = {
        installmentData: [],
        totalInstallments: student.paymentType === 'Monthly' ? 12 : student.paymentType === 'Quarterly' ? 4 : 12,
        totalPayable: totalFees*12,
        paymentType: student.paymentType
    }
    

        let transactions = await FeeTransaction.find({studentId: mongoose.Types.ObjectId(req.query.studentId)}).sort({date: 1});
        data.installmentData = transactions;

        //Check if there are any dues
        if(transactions.length){
            if(date > transactions[transactions.length-1].nextDue){
                data['defaulter'] = true;
            }else{
                data['defaulter'] = false;
            }
    
            data['nextDue'] = transactions[transactions.length-1].nextDue
        }else{
            data['defaulter'] = true;
            let school = await School.findOne({_id: req.query.schoolId})
            data['nextDue'] = new Date(school.sessionStart);
        }
        
    
    res.status(200).send(data);

});

router.get('/getRecentFeePayments', async (req, res) => {
    let data = await FeeTransaction.find({ $orderby: { $natural: -1 } }).limit(3);
    res.status(200).send(data);
})


router.post("/addTransaction", async (req, res) => {

    let school = await School.findOne({_id: req.body.schoolId})

    const newTransaction = {
      _id: new mongoose.Types.ObjectId(),
      amount: req.body.amount,
      studentId: req.body.id,
      date: new Date()
    };

    if(req.body.type === 'Monthly'){
        const date = new Date()
        date.setDate(school.paymentDay);
        const newDate = new Date(date.setMonth(date.getMonth()+1));
        newTransaction.nextDue = newDate;
    }
    else if(req.body.type === 'Quarterly'){
        const date = new Date()
        date.setDate(school.paymentDay);
        const newDate = new Date(date.setMonth(date.getMonth()+3));
        newTransaction.nextDue = newDate;
    }else{
        newTransaction.nextDue = null;
    }

    const transaction = new FeeTransaction(newTransaction);
  
    transaction
      .save()
      .then((s) => {
        res.status(200).send({transactionId: newTransaction._id});
      })
      .catch((e) => {
        console.log(e);
        res.status(500).send();
      });
  });

  router.get('/getDefaulterList', async (req, res) => {
    let defaulterList = [];
  
    let date = new Date()
    const students = await Student.find({schoolId: req.query.schoolId}).sort({className: 1});
  
    let school = await School.findOne({_id: req.query.schoolId})
    let paymentDay = school.paymentDay;
  
    for(let student of students){
      const data = {}
  
  
      let transactions = await FeeTransaction.find({studentId: mongoose.Types.ObjectId(student._id)}).sort({date: 1});
  
      //Check if there are any dues
      if(transactions.length){
          if(date > transactions[transactions.length-1].nextDue){
              data['name'] = student.name;
              data['class'] = student.className + '-' + student.division;
              defaulterList.push(data)
          }

      }else{
          data['name'] = student.name;
          data['class'] = student.className + ' - ' + student.division;
          defaulterList.push(data)
      }
      
      
  
    }
    res.status(200).send(defaulterList);
  })
  

module.exports = router;