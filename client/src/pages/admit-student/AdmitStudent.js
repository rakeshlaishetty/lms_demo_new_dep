import React, { useState, useEffect, useRef, createRef } from "react";
import {
  Grid,
  TextField,
  TableRow,
  TableCell,
  Button,
  TableHead,
  TableBody,
  Table,
  InputLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import axios from "axios";
import swal from 'sweetalert';
import TopMenu from '../../components/TopMenu/TopMenu';

import '../../styles/styles.css';
import { stepButtonClasses } from "@mui/material";


const AdmitStudent = () => {
  
const items = [
    {name: 'Admit student', click: ''}
]

const [newStudent, setNewStudent] = useState({});
const [classes, setClasses] = useState([]);
const [selectedClass, setSelectedClass] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value, class: selectedClass });
  };
  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    const adm = JSON.parse(window.localStorage.getItem('userdata'))
    let res = await axios.post("/addStudent", { newStudent: newStudent, schoolId: adm.schoolId });
    if(res.status === 200){
        axios('/getAdmissionPDF', {
          method: 'GET'
        })
        .then(response => {
          swal('Student added successfully!', '', 'success');
          })
          .catch(error => {
              console.log(error);
          });
        
    }   
  };

  const getClasses = async () => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));
    let res = await axios.get(`/classes/getClasses?schoolId=${adm.schoolId}`);
    if(res.status === 200){
      setClasses(res.data)
    }
  }

  useEffect(() => {
    getClasses();
  })

    
  return(
    <div className='body'>
        <h1 className='title'>Admit Student</h1>
        <TopMenu items={items}/>

        <form>
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: "20px" }}
                      >
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3} style={{ marginRight: "20px" }}>
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b>Student Name</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="name"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                        </Grid>

                        <Grid item xs={3} style={{ marginRight: "20px" }}>
                        
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Father's Name</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="fatherName"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                        </Grid>

                        <Grid item xs={3} style={{ marginRight: "20px" }}>
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Mother's Name</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="motherName"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: "20px" }}
                      >
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                        
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b>Gender</b>
                          </InputLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="female"
                              control={<Radio />}
                              label="Female"
                              name="gender"
                              onChange={(e) => {
                                handleInputChange(e);
                              }}
                            />
                            <FormControlLabel
                              value="male"
                              control={<Radio />}
                              label="Male"
                              name="gender"
                              onChange={(e) => {
                                handleInputChange(e);
                              }}
                            />
                          </RadioGroup>
                        </Grid>
                        <Grid item xs={3}>
                         
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b>Handicapped</b>
                          </InputLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="no"
                              control={<Radio />}
                              label="No"
                              name="handicapped"
                              onChange={(e) => {
                                handleInputChange(e);
                              }}
                            />
                            <FormControlLabel
                              value="yes"
                              control={<Radio />}
                              label="Yes"
                              name="handicapped"
                              onChange={(e) => {
                                handleInputChange(e);
                              }}
                            />
                          </RadioGroup>
                        </Grid>
                        <Grid item xs={3}>
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b>child with special need</b>
                          </InputLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="no"
                              control={<Radio />}
                              label="No"
                              name="childWithSpecialNeed"
                              onChange={(e) => {
                                handleInputChange(e);
                              }}
                            />
                            <FormControlLabel
                              value="yes"
                              control={<Radio />}
                              label="Yes"
                              name="childWithSpecialNeed"
                              onChange={(e) => {
                                handleInputChange(e);
                              }}
                            />
                          </RadioGroup>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: "20px" }}
                      >
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Catagory</b>
                          </InputLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="open"
                              control={<Radio />}
                              label="Open"
                              name="catagory"
                              onChange={(e) => {
                                handleInputChange(e);
                              }}
                            />
                            <FormControlLabel
                              value="obc"
                              control={<Radio />}
                              label="OBC"
                              name="catagory"
                              onChange={(e) => {
                                handleInputChange(e);
                              }}
                            />
                            <FormControlLabel
                              value="sc/st"
                              control={<Radio />}
                              label="SC/ST"
                              name="catagory"
                              onChange={(e) => {
                                handleInputChange(e);
                              }}
                            />
                          </RadioGroup>
                        </Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Mother Name"
                            placeholder="Mother Name"
                            name="motherName"
                            style={{ width: "350px" }}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Add Adhaar Number</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="adharNumber"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Date Of Birth</b>
                          </InputLabel>
                          <input
                            type="date"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="dob"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                        </Grid>
                      </Grid>
                    
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: "20px" }}
                      >
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                         
                        </Grid>
                        <Grid item xs={3}>
                         
                        </Grid>
                        <Grid item xs={3}>
                         
                        </Grid>
                      </Grid>
                    
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: "20px" }}
                      >
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                          
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b>Enrollment No</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="enrollmentNo"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                         
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Bank Name(Father)</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="fatherBankName"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Account Number(Father)</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="fatherAccountNo"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                        </Grid>
                      </Grid>
                      {/* next Grid  */}
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: "20px" }}
                      >
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                         
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Bank IFSC Code(Father)</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="fatherBankIfsc"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                        
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Bank Name(Student)</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="studentBankName"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Division"
                            placeholder="Division"
                            name="division"
                            style={{ width: "100px" }}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b>Account Number(Student)</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="studentAccountNo"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                        </Grid>
                      </Grid>
                      {/* next Grdi  */}
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: "20px" }}
                      >
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Age"
                            placeholder="only Number"
                            name="age"
                            fullWidth
                            style={{ width: "100px" }}
                            className={classes.textfield}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}

                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b>Bank IFSC Code(Student)</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="studentBankIfsc"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Class"
                            placeholder="only Number"
                            name="class"
                            style={{ width: "100px" }}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}
                          {/* <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            Banck Name(Father)
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="childid"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}
                        </Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Division"
                            placeholder="Division"
                            name="division"
                            style={{ width: "100px" }}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}
                          {/* <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            Account Number(Father)
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="regestrationNo"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                            /> */}
                        </Grid>
                      </Grid>
                      <div style={{ marginTop: "30px" }}>
                        <h1 style={{ color: "red" }}>Admission Details:</h1>
                      </div>
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: "20px" }}
                      >
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Age"
                            placeholder="only Number"
                            name="age"
                            fullWidth
                            style={{ width: "100px" }}
                            className={classes.textfield}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}

                         
                        </Grid>
                        <Grid item xs={3}>
                                                 </Grid>
                        <Grid item xs={3}>
                         
                        </Grid>
                      </Grid>
                      {/* new Gris  */}
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: "20px" }}
                      >
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                          
                        </Grid>
                        <Grid item xs={3}>
                          
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b>Date Of Admission</b>
                          </InputLabel>
                          <input
                            type="date"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="dateOfAdmission"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Division"
                            placeholder="Division"
                            name="division"
                            style={{ width: "100px" }}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b>Admission No</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="admissionNum"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                          {/* <h1>Schollo old or new</h1> */}
                        </Grid>
                      </Grid>
                      {/* new Grid */}
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: "20px" }}
                      >
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Age"
                            placeholder="only Number"
                            name="age"
                            fullWidth
                            style={{ width: "100px" }}
                            className={classes.textfield}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}

                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Scholorship No</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="scholorshipNo"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                          {/* <h1>Medium</h1> */}
                        </Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Class"
                            placeholder="only Number"
                            name="class"
                            style={{ width: "100px" }}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b>Previous Class</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="prevClass"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                          {/* <h1>Adission Scheme</h1> */}
                        </Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Division"
                            placeholder="Division"
                            name="division"
                            style={{ width: "100px" }}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Previous School Name</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="prevSchoolName"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                          {/* <h1>Schollo old or new</h1> */}
                        </Grid>
                      </Grid>
                      {/* end Grid */}
                      {/* new Grid  */}
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: "20px" }}
                      >
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Age"
                            placeholder="only Number"
                            name="age"
                            fullWidth
                            style={{ width: "100px" }}
                            className={classes.textfield}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}

                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Class</b>
                          </InputLabel>
                          <select style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }} onChange={(evt) => setSelectedClass(evt.target.value)}>
                            {
                              classes.map((item) => <option value={item._id}>{item.class} {item.division}</option>)
                            }
                          </select>
                          {/* <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="class"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}
                          {/* <h1>Medium</h1> */}
                        </Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Class"
                            placeholder="only Number"
                            name="class"
                            style={{ width: "100px" }}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Division</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="division"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                          {/* <h1>Adission Scheme</h1> */}
                        </Grid>
                        <Grid item xs={3}>
                          
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b>Admission Remark</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="admissionRemark"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: "20px" }}
                      >
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b>Fees Catagory</b>
                          </InputLabel>
                          <select
                            name="fees_catagory"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                          >
                            <option value="monthly">Monthly</option>
                            <option value="four_months">Four Monts</option>
                            <option value="six_months">Six Months</option>
                            <option value="yearly">Yearly</option>
                          </select>
                        </Grid>
                        <Grid item xs={3}>
                          
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Bus</b>
                          </InputLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="no"
                              control={<Radio />}
                              label="No"
                              name="bus"
                              onChange={(e) => {
                                handleInputChange(e);
                              }}
                            />
                            <FormControlLabel
                              value="yes"
                              control={<Radio />}
                              label="Yes"
                              name="bus"
                              onChange={(e) => {
                                handleInputChange(e);
                              }}
                            />
                          </RadioGroup>
                        </Grid>
                        <Grid item xs={3}>
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b>Hostel</b>
                          </InputLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="no"
                              control={<Radio />}
                              label="No"
                              name="hostel"
                              onChange={(e) => {
                                handleInputChange(e);
                              }}
                            />
                            <FormControlLabel
                              value="yes"
                              control={<Radio />}
                              label="Yes"
                              name="hostel"
                              onChange={(e) => {
                                handleInputChange(e);
                              }}
                            />
                          </RadioGroup>
                        </Grid>
                      </Grid>
                      {/* end Grid  */}
                      {/* new Grid  */}
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: "20px" }}
                      >
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b>Library</b>
                          </InputLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="no"
                              control={<Radio />}
                              label="No"
                              name="library"
                              onChange={(e) => {
                                handleInputChange(e);
                              }}
                            />
                            <FormControlLabel
                              value="yes"
                              control={<Radio />}
                              label="Yes"
                              name="library"
                              onChange={(e) => {
                                handleInputChange(e);
                              }}
                            />
                          </RadioGroup>
                        </Grid>
                        <Grid item xs={3}>
                          {/* <h1>siblings</h1> */}
                        </Grid>
                        <Grid item xs={3}>
                          {/* <h1>Sibling detail 2</h1> */}
                        </Grid>
                      </Grid>
                      {/* end Grid  */}
                      <div style={{ marginTop: "30px" }}>
                        <h1 style={{ color: "red" }}>Family Contacts:</h1>
                      </div>
                      {/* new Grid  */}
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: "20px" }}
                      >
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Age"
                            placeholder="only Number"
                            name="age"
                            fullWidth
                            style={{ width: "100px" }}
                            className={classes.textfield}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}

                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b>Father Contact No 1</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="fatherContactNo1"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                          {/* <h1>Library</h1> */}
                        </Grid>
                        <Grid item xs={3}>
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Father Contact No 2</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="fatherContactNo2"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                          {/* <h1>Sibling detail 2</h1> */}
                        </Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Division"
                            placeholder="Division"
                            name="division"
                            style={{ width: "100px" }}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Father Email id</b>
                          </InputLabel>
                          <input
                            type="email"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="fatherEmail"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                          {/* <h1>Sibling detail 2</h1> */}
                        </Grid>
                      </Grid>
                      {/* end Grid  */}
                      {/* new Grid  */}
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: "20px" }}
                      >
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Age"
                            placeholder="only Number"
                            name="age"
                            fullWidth
                            style={{ width: "100px" }}
                            className={classes.textfield}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}

                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Mother Contact No</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="motherContactNo"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                          {/* <h1>Library</h1> */}
                        </Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Class"
                            placeholder="only Number"
                            name="class"
                            style={{ width: "100px" }}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Mother Email id</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="motherEmail"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                          {/* <h1>Sibling detail 2</h1> */}
                        </Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Division"
                            placeholder="Division"
                            name="division"
                            style={{ width: "100px" }}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b>Father Occupation</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="fatherOccupation"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                          {/* <h1>Sibling detail 2</h1> */}
                        </Grid>
                      </Grid>
                      {/* end Grid  */}
                      {/* new Grid  */}
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: "20px" }}
                      >
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Age"
                            placeholder="only Number"
                            name="age"
                            fullWidth
                            style={{ width: "100px" }}
                            className={classes.textfield}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}

                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Guardian Name</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="guardianName"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                          {/* <h1>Library</h1> */}
                        </Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Class"
                            placeholder="only Number"
                            name="class"
                            style={{ width: "100px" }}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Guardian Contact No</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="guardianContactNo"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                          {/* <h1>Sibling detail 2</h1> */}
                        </Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Division"
                            placeholder="Division"
                            name="division"
                            style={{ width: "100px" }}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Guardian Email id</b>
                          </InputLabel>
                          <input
                            type="email"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="guardianEmail"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                          {/* <h1>Sibling detail 2</h1> */}
                        </Grid>
                      </Grid>
                      {/* end Grid  */}
                      {/* new Grid */}
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: "20px" }}
                      >
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Age"
                            placeholder="only Number"
                            name="age"
                            fullWidth
                            style={{ width: "100px" }}
                            className={classes.textfield}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}

                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Guardian Occupation</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="guardianOccupation"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                          {/* <h1>Library</h1> */}
                        </Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Class"
                            placeholder="only Number"
                            name="class"
                            style={{ width: "100px" }}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Student Contact No</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="studentNumber"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                          {/* <h1>Sibling detail 2</h1> */}
                        </Grid>
                        <Grid item xs={3}>
                          {/* <TextField
                            // id="outlined-textarea"
                            label="Division"
                            placeholder="Division"
                            name="division"
                            style={{ width: "100px" }}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          /> */}
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> SMS Contact</b>
                          </InputLabel>
                          <input
                            type="text"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="smsContact"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                          {/* <h1>Sibling detail 2</h1> */}
                        </Grid>
                      </Grid>
                      {/* end Grid  */}
                      {/* new Grid  */}
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: "20px" }}
                      >
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b>SMS Facility</b>
                          </InputLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="no"
                              control={<Radio />}
                              label="No"
                              name="smsFacility"
                              onChange={(e) => {
                                handleInputChange(e);
                              }}
                            />
                            <FormControlLabel
                              value="yes"
                              control={<Radio />}
                              label="Yes"
                              name="smsFacility"
                              onChange={(e) => {
                                handleInputChange(e);
                              }}
                            />
                          </RadioGroup>
                        </Grid>
                        <Grid item xs={3}>
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b>Student Conveyance</b>
                          </InputLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="no"
                              control={<Radio />}
                              label="No"
                              name="studentConveyance"
                              onChange={(e) => {
                                handleInputChange(e);
                              }}
                            />
                            <FormControlLabel
                              value="yes"
                              control={<Radio />}
                              label="Yes"
                              name="studentConveyance"
                              onChange={(e) => {
                                handleInputChange(e);
                              }}
                            />
                          </RadioGroup>
                        </Grid>
                        <Grid item xs={3}>
                          <InputLabel
                            htmlFor="component-simple"
                            style={{ color: "black" }}
                          >
                            <b> Student Email id</b>
                          </InputLabel>
                          <input
                            type="email"
                            style={{
                              border: "2px solid #a6a49d",
                              marginTop: "5px",
                              width: "300px",
                              lineHeight: "25px",
                              fontSize: "20px",
                              padding: "3px",
                            }}
                            name="email"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={3}>
                          <Button
                            variant="contained"
                            color="primary"
                            type="submitt"
                            style={{ marginTop: "50px" }}
                            onClick={(e) => {
                              handleStudentSubmit(e);
                            }}
                          >
                            Admit Student
                          </Button>
                        </Grid>
                        <Grid item xs={3}></Grid>
                      </Grid>
                    </form>
    </div>
  );
};

export default AdmitStudent;
