import React, { useEffect, useState } from "react";
import PageTitle from "../PageTitle/PageTitle";
import { useParams } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';
import {
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Table,
  Button,
  Grid,
  TextField,
} from "@material-ui/core";

import './styles.css'

const assignStatusCol = ["No.", "Name", "Roll NO.", "Marks", "Submission Date"];

function Assignment() {
  const { name, option } = useParams();
  const [custom, setCustom] = useState(true);
  const [perticularAssignment, setPerticularAssignment] = useState({assignmentName: ''});
  const [addAssignQues, setAddAssignQues] = useState({});
  const [autoData, setAutoData] = useState([]);
  const [chapter, setChapter] = useState('');
  const [chapters, setChapters] = useState([]);
  
  const [questionType, setQuestionType] = useState('MCQ');
  const [level, setLevel] = useState('0');
  const [option1Correct, setOption1Correct] = useState(false);
  const [option2Correct, setOption2Correct] = useState(false);
  const [option3Correct, setOption3Correct] = useState(false);
  const [option4Correct, setOption4Correct] = useState(false);

  // console.log("his is param value ,", assignName);
  const getPerticularAssignment = (id) => {
    axios
      .post("/getPerticularAssignment", {
        id: id,
      })
      .then((res) => {
        console.log("this is the getPerticularAssignment", res.data);
        // setAssignments(res.data.aiss);
        setPerticularAssignment(res.data.aiss);
        getChapters(res.data.aiss);
        console.log("assignment is set", res.data.aiss);
      })
      .catch((e) => {
        console.log("error while getAllAssignmentStudent client ", e);
      });
  };

  // const addNewQuestion = (assignName) => {
  //   axios
  //     .post("http://localhost:3008/addAssignmentQuestion", {
  //       newQuestion: addAssignQues,
  //       assignName: name,
  //     })
  //     .then((res) => {
  //       console.log("res apip addAssignmentQuestion", res.data);
  //       setAddAssignQues({});
  //     })
  //     .catch((e) => {
  //       console.log("api failed addNewQuestion");
  //     });
  // };
  // const handleInputChangeForAddQuestion = (e) => {
  //   const { name, value } = e.target;
  //   setAddAssignQues({ ...addAssignQues, [name]: value });
  //   console.log("the new assignment question to add  is ", addAssignQues);
  // };

  const automaticAssign = (e) => {
    const { name, value } = e.target;
    setAutoData({ ...autoData, [name]: value });
  };

  
  const handleAutoSubmit = () => {
    axios
      .post("/assignQuestions", {
        assign: perticularAssignment,
        chapId: chapter
      })
      .then((res) => {
        swal('Questions added successfully', '', 'success')
      })
      .catch((e) => console.log("error while assignQuestions client", e));
  };

  const getChapters = async (ass) => {
    let res = await axios.get(`/getChapters?class=${ass.class}&subject=${ass.subject}`);
    if(res.status === 200){
      setChapters(res.data);
      setChapter(res.data[0]._id)
    }
  }

  useEffect(() => {
    getPerticularAssignment(name);
  }, []);

  const handleCustomSubmit = async (evt) => {
      evt.preventDefault();

      if(questionType === 'MCQ'){
        if(!option1Correct && !option2Correct && !option3Correct && !option4Correct){
            swal('Correct option not found!', '', 'error')
            return;
        }

        let data = {
            assignId: perticularAssignment._id,
            assignName: perticularAssignment.assignmentName,
            question: evt.target.elements.question.value,
            imgUrl: evt.target.elements.imgUrl.value,
            type: questionType,
            level: level,
            option1: {
                option: evt.target.elements.option1.value,
                correct: option1Correct ? true : false
            },
            option2: {
                option: evt.target.elements.option2.value,
                correct: option2Correct ? true : false
            },
            option3: {
                option: evt.target.elements.option3.value,
                correct: option3Correct ? true : false
            },
            option4: {
                option: evt.target.elements.option4.value,
                correct: option4Correct ? true : false
            }
        }
        try{
            let res = await axios.post('/addAssignmentQuestion', data);
            if(res.status === 200){
                swal('Question added successfully!', '', 'success');

                setOption1Correct(false);
                setOption2Correct(false);
                setOption3Correct(false);
                setOption4Correct(false);

                document.getElementsByName("option1Correct")[0].checked = false;
                document.getElementsByName("option2Correct")[0].checked = false;
                document.getElementsByName("option3Correct")[0].checked = false;
                document.getElementsByName("option4Correct")[0].checked = false;
            }
        }catch(err){
            swal('Something went wrong!', err.message, 'error');
        }
      }

      if(questionType === 'Fill in the blanks'){
        let count = (evt.target.elements.statement.value.match(/#/g) || []).length;
        if(count%2 !== 0){
            swal('It seems you have not inserted the placeholders properly!', 'The number of placeholders should be even', 'warning')
            return;
        }
        if(count === 0){
          swal('It seems you have not inserted the placeholders!', 'Please enter the placeholders properly', 'warning')
          return;
        }
            let res = await axios.post('/addAssignmentQuestion', {assignId: perticularAssignment._id, assignName: perticularAssignment.assignmentName, statement: evt.target.elements.statement.value, type: questionType, level: level});
            if(res.status === 200){
                swal('Question added successfully!', '', 'success');
            }
        
      }

      if(questionType === 'Rearrange'){
        let data = {
            assignId: perticularAssignment._id,
            assignName: perticularAssignment.assignmentName,
            statement: evt.target.elements.statement.value,
            type: questionType,
            level: level,
            item1: evt.target.elements.item1.value,
            item2: evt.target.elements.item2.value,
            item3: evt.target.elements.item3.value,
            item4: evt.target.elements.item4.value
        }

        try{
            let res = await axios.post('/addAssignmentQuestion', data);
            if(res.status === 200){
                swal('Question added successfully!', '', 'success');
                
            }
        }catch(err){
            swal('Something went wrong!', err.message, 'error');   
        }
      }
  }

  return (
    <>
      {option == "result" ? (
        <>
          <h1>Submissions for <b>{perticularAssignment.assignmentName}</b></h1>
          {perticularAssignment.submission?.length > 0 ? (
            <Table className="mb-0" style={{ width: "900px" }}>
              <TableHead>
                <TableRow>
                  {assignStatusCol.map((col, i) => (
                    <TableCell>
                      <h4>{col}</h4>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {perticularAssignment.submission?.map((s, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.rollnumber}</TableCell>
                    <TableCell>{s.marks}</TableCell>
                    <TableCell>00/00/00</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <h1 style={{ color: "red" }}>No responses yet...</h1>
          )}
        </>
      ) : (
        ""
      )}
      {option == "question" ? (
        <div style={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}} className='question-card'>
          <div className="mb-5 px-3" style={{width: '100%', borderRadius: '8px', padding: '10px', color: 'white', backgroundColor: '#FF5C93'}}>
            <h1 className="mb-3">Add Questions</h1>
            
          </div>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Button
                variant={custom == false ? "contained" : "outlined"}
                color={custom == false ? "secondary" : "error"}
                onClick={() => {
                  setCustom(false);
                }}
                style={{ marginRight: "10px" }}
              >
                Automatic
              </Button>
              <Button
                variant={custom == true ? "contained" : "outlined"}
                color={custom == true ? "secondary" : "error"}
                onClick={() => {
                  setCustom(true);
                  // getAllAssignment();
                }}
              >
                Customized
              </Button>
            </Grid>
          </Grid>
          {custom == true ? (
            <>
              <form onSubmit={handleCustomSubmit} className="py-3 mt-4 form-group" style={{width: '70%', marginLeft: 'auto', marginRight: 'auto'}}>
                  <label className='mb-3'>
                    Question type
                    <select 
                        style={{width: '400px'}}
                        className="form-control mt-3 mb-3"
                        value={questionType} 
                        onChange={e => setQuestionType(e.target.value)}>
                        <option value="MCQ">MCQ</option>
                        <option value="Fill in the blanks">Fill in the blanks</option>
                        <option value="Rearrange">Rearrange</option>
                    </select>
                  </label>

                  <label>
                    Difficulty
                    <select
                      style={{width: '400px'}}
                      className="form-control mt-3 mb-3"
                      onChange={e => setLevel(e.target.value)}>
                        <option value='0'>Easy</option>
                        <option value='1'>Medium</option>
                        <option value='2'>Hard</option>

                    </select>
                  </label>


                  {
                    questionType === 'MCQ' ?
                    <div>
                        <label>
                            Question
                            <input className="form-control mb-3" style={{width: '450px'}} type='text' name='question' required/>
                        </label>
                        <label>
                            Image URL
                            <input className="form-control mb-3" style={{width: '450px'}} type='text' name='imgUrl'/>
                        </label>
                        <label className='mt-3'>
                            Option 1
                            <input style={{width: '400px', marginRight: '15px'}} className="form-control mb-3" type='text' name='option1' required/>
                        </label>
                        <label>
                            <input className="form-check-input" type='radio' name='option1Correct' value='1' onChange={() => setOption1Correct(!option1Correct)}/>
                            Correct?
                        </label>
                        <br/>
                        <label className='mt-3'>
                            Option 2
                            <input style={{width: '400px', marginRight: '15px'}} className="form-control mb-3" type='text' name='option2' required/>
                        </label>
                        <label>
                            <input className="form-check-input" type='radio' name='option2Correct' value='1' onChange={() => setOption2Correct(!option2Correct)}/>
                            Correct?
                        </label>
                        <br/>
                        <label className='mt-3'>
                            Option 3
                            <input style={{width: '400px', marginRight: '15px'}} className="form-control mb-3" type='text' name='option3' required/>
                        </label>
                        <label>
                            <input className="form-check-input" type='radio' name='option3Correct' value='1' onChange={() => setOption3Correct(!option3Correct)}/>
                            Correct?
                        </label>
                        <br/>
                        <label className='mt-3'>
                            Option 4
                            <input style={{width: '400px', marginRight: '15px'}} className="form-control mb-3" type='text' name='option4' required/>
                        </label>
                        <label>
                            <input className="form-check-input" type='radio' name='option4Correct' value='1' onChange={() => setOption4Correct(!option4Correct)}/>
                            Correct?
                        </label>
                    </div>
                    :
                    null
                }

                {
                    questionType === 'Fill in the blanks' ?
                    <div>
                    <label className='mt-1'>
                        Question statement
                        <input className="form-control mb-3" style={{width: '400px'}} type='text' name='statement' required/>
                        <div style={{width: '400px'}} className="alert alert-warning">
                            <p style={{fontWeight: '100', fontStyle: 'italic'}}>Enter the question statement and enclose the words in #....# which are to be replaced with a blank.</p>
                            <p style={{fontWeight: '100', fontStyle: 'italic'}}>Ex. The capital of India is #Delhi#</p>
                        </div>
                    </label>
                    </div>
                    :
                    null
                }

                {
                    questionType === 'Rearrange' ?
                    <div>
                        <label>
                            Question / Statement
                            <input className="form-control mb-3" style={{width: '450px'}} type='text' name='statement'/>
                        </label>
                        <h6>Items</h6>
                        <div style={{width: '400px'}} className="alert alert-warning"><p style={{fontWeight: '100', fontStyle: 'italic'}}>Enter the items in correct order. Student's response will be compared to the order you enter.</p></div>
                        <label className='mt-3'>
                            Item 1
                            <input style={{width: '400px', marginRight: '15px'}} className="form-control mb-3" type='text' name='item1' required/>
                        </label>
                        <label className='mt-3'>
                            Item 2
                            <input style={{width: '400px', marginRight: '15px'}} className="form-control mb-3" type='text' name='item2' required/>
                        </label>
                        <label className='mt-3'>
                            Item 3
                            <input style={{width: '400px', marginRight: '15px'}} className="form-control mb-3" type='text' name='item3' required/>
                        </label>
                        <label className='mt-3'>
                            Item 4
                            <input style={{width: '400px', marginRight: '15px'}} className="form-control mb-3" type='text' name='item4' required/>
                        </label>
                    </div>
                    :
                    null
                }

                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Add Question
                    </Button>
              </form>
            </>
          ) : (
            <>
             
              <h5 className="mt-4">Chapter</h5>
                    <select 
                        style={{width: '400px'}}
                        className="form-control mt-3 mb-3"
                        onChange={e => setChapter(e.target.value)}>
                          {
                            chapters.map((item) => <option value={item._id}>{item.name}</option>)
                          }
                    </select>
              {/* <Grid container spacing={2} style={{ marginTop: "50px" }}>
                <Grid item xs={12} md={12}> */}
                  <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
                    <Button variant="contained"
                      color="primary"
                      type="submit"
                      onClick={() => handleAutoSubmit()}>Assign questions</Button>
                  </div>
                  {/* <form>
                    <Grid
                      container
                      spacing={2}
                      style={{ marginBottom: "20px" }}
                    >
                      <Grid item xs={1}></Grid>
                      <Grid item xs={5}>
                        <TextField
                          label="No. of Easy Questions"
                          placeholder="No. of Easy Questions"
                          name="easyqs"
                          fullWidth
                          style={{ width: "350px" }}
                          onChange={(e) => {
                            automaticAssign(e);
                          }}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          label="No. of Medium Questions"
                          placeholder="No. of Medium Questions"
                          name="mediumqs"
                          fullWidth
                          style={{ width: "350px" }}
                          onChange={(e) => {
                            automaticAssign(e);
                          }}
                        />
                      </Grid>
                      <Grid item xs={1}></Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      style={{ marginBottom: "20px" }}
                    >
                      <Grid item xs={1}></Grid>

                      <Grid item xs={5}>
                        <TextField
                          label="No. of Difficult Questions"
                          placeholder="Number Of Questions"
                          name="difficultqs"
                          fullWidth
                          style={{ width: "350px" }}
                          onChange={(e) => {
                            automaticAssign(e);
                          }}
                        />
                      </Grid>
                      <Grid item xs={1}></Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      style={{ marginBottom: "20px" }}
                    >
                      <Grid item xs={1}></Grid>

                      <Grid item xs={5}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submitt"
                          onClick={(e) => {
                            handleAutoSubmit(e);
                          }}
                        >
                          Assign Assignment
                        </Button>
                      </Grid>
                      <Grid item xs={1}></Grid>
                    </Grid>
                  </form> */}
                {/* </Grid>
              </Grid> */}
            </>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Assignment;
