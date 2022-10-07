import React, { useEffect, useState, useRef } from "react";
import {
  Grid,
  Button,
  TextField,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { LinearProgress } from '@mui/material';
import { useHistory } from "react-router-dom";
import { Link, animateScroll as scroll } from "react-scroll";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';

// styles
import useStyles from "./styles";
import './styles.css';

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import { Typography } from "../../components/Wrappers";
import axios, { AxiosError } from "axios";
import { QuestionAnswerSharp } from "@material-ui/icons";

const Latex = require('react-latex');

export default function TypographyPage() {
  var classes = useStyles();
  const history = useHistory();

  const [user, setUser] = useState("");
  const [custom, setCustom] = useState(true);
  const [createAssign, setCreateAssign] = useState(false);
  const [newAsign, setNewAssign] = useState({class: '8', subject: 'math', division: 'a'});
  const [addAssignQues, setAddAssignQues] = useState({});
  const [loggedUser, setLoggedUser] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [currentAssignmentName, setCurrentAssignmentName] = useState("");
  const [perticularAssignment, setPerticularAssignment] = useState({});
  const [isSolve, setIsSolve] = useState(false);
  const [answers, setAnswers] = useState({});
  // const [marks, setMarks] = useState(0);
  const [isAllAssignments, setIsAllAssignments] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({type: null, starred: false});
  const [blankAnswers, setBlankAnswers] = useState([]);
  const [words, setWords] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showScore, setShowScore] = useState(false);
  const [showAssignments, setShowAssignments] = useState(true);

  const marks = useRef(0);

  const handleInputChangeNewAssign = (e) => {
    const { name, value } = e.target;
    setNewAssign({ ...newAsign, [name]: value });
    console.log("the new assignment creates is ", newAsign);
  };

  const handleInputChangeAddAssign = (e) => {
    const { name, value } = e.target;
    setAddAssignQues({ ...addAssignQues, [name]: value });
    console.log("the new assignment question to add  is ", addAssignQues);
  };

  const createAssignment = () => {
    axios
      .post("/createNewAssignment", {
        assign: newAsign,
        facName: loggedUser.name,
      })
      .then((res) => {
        
        getAllAssignment();
        setIsAllAssignments(true);
        setShowPreview(false);
        setCreateAssign(false);
        setNewAssign({});
      });
  }

  const addNewQuestion = (assignName) => {
    axios
      .post("http://localhost:3008/addAssignmentQuestion", {
        newQuestion: addAssignQues,
        assignName: currentAssignmentName,
      })
      .then((res) => {
        console.log("res apip addAssignmentQuestion", res.data);
        setAddAssignQues({});
      })
      .catch((e) => {
        console.log("api failed addNewQuestion");
      });
  };

  const colt = [
    "Assignment",
    "Class",
    "Section",
    "Subject",
    "Chapter",
    "Deadline",
    "Action",
  ];
  const cols = [
    "Assignment Name",
    "Subject",
    "Chapter",
    "teacher",
    "Deadline",
    "Action",
  ];

  const getAllAssignment = async () => {
    // console.log("from effecr", loggedUser);
    if (user == "teacher") {
      axios
        .post("/getAllAssignment", { facName: loggedUser.name })
        .then((res) => {
          setAssignments(res.data.aiss);
          // console.log(res.data);
        })
        .catch((e) => {
          console.log("error while getAllAssignment client ", e);
        });
    }

    if (user == "student") {
      let res = await axios.get(`/getAllAssignmentStudent?class=${loggedUser.class}&division=${loggedUser.division}`);
      if(res.status === 200){
        setAssignments(res.data);
      }
      
    }
  };

  const getPerticularAssignment = async (id) => {
    await axios
      .post("/getPerticularAssignment", {
        id: id,
      })
      .then((res) => {
        setPerticularAssignment(res.data.aiss);
      })
      .catch((e) => {
        console.log("error while getAllAssignmentStudent client ", e);
      });
  };

  const setEachAnswer = (e) => {
    const { name, value } = e.target;
    setAnswers({ ...answers, [name]: value });
  };

  

  const deleteAssignment = (asName) => {
    console.log("this is currnet to delete ", currentAssignmentName);
    axios
      .post("/deleteAssignment", { assignName: asName })
      .then((res) => {
        console.log("this is the res api", res.data);
      })
      .catch((e) => {
        console.log("error while deleteAssignment in client", e);
      });

    getAllAssignment();
  };

  useEffect(() => {
    const cuser = window.localStorage.getItem("user");
    setUser(cuser);
    setLoggedUser(JSON.parse(localStorage.getItem("userdata")));

    getAllAssignment();
  }, []);

  const checkAnswer = () => {

    if(currentQuestion.type === 'Rearrange'){
      let answers = [];
      document.querySelectorAll('.draggable').forEach(item => answers.push(item.innerText));
      if(answers[0].trim().toLowerCase() === currentQuestion.item1.trim().toLowerCase() && answers[1].trim().toLowerCase() === currentQuestion.item2.trim().toLowerCase() && answers[2].trim().toLowerCase() === currentQuestion.item3.trim().toLowerCase() && answers[3].trim().toLowerCase() === currentQuestion.item4.trim().toLowerCase()){
          
          swal('Great job! 💯', '', 'success')
      }else{
          swal('Oh no! Wrong answer 😣', '', 'error');
      }
  }

  if(currentQuestion.type === 'MCQ'){
      if(currentQuestion[`option${selectedAnswer}`].correct){
          swal('Great job! 💯', '', 'success')
      }else{
          swal('Oh no! Wrong answer 😣', '', 'error');
      }
  }

    if(currentQuestion.type === 'Fill in the blanks'){
      let answers = []
      for(let i=0; i<blankAnswers.length; i++){
          answers.push(document.getElementById(`input${i}`).value);
      }
      console.log(answers)
      for(let i=0; i<blankAnswers.length; i++){
          if(document.getElementById(`input${i}`).value.toLowerCase() !== blankAnswers[i].toLowerCase()){
              swal('Oh no! Wrong answer 😣', '', 'error');
              return;
          }
      }
      swal('Great job! 💯', '', 'success')
  }
  }

  const check = (n) => {
    if (n > 10) return true;
    else return false;
  };

  const handlePreview = (questions) => {
    setQuestions(questions);
    setIsAllAssignments(false);
    setShowPreview(true);
    setCurrentQuestion(questions[0])
  }

  const next = () => {
        
    if(questionNumber+1<questions.length){
        setCurrentQuestion(questions[questionNumber+1]);
        setQuestionNumber(questionNumber+1);
    }
    
}

const previous = () => {
    
    if(questionNumber>0){
        setCurrentQuestion(questions[questionNumber-1]);
        setQuestionNumber(questionNumber-1);
    }
    
}

  const chooseAnswer = (id) => {
    setSelectedAnswer(id);
    document.getElementById('option1').style.backgroundColor = 'inherit';
    document.getElementById('option2').style.backgroundColor = 'inherit';
    document.getElementById('option3').style.backgroundColor = 'inherit';
    document.getElementById('option4').style.backgroundColor = 'inherit';
    document.getElementById(`option${id}`).style.backgroundColor = 'rgba(173,216,230,0.5)';
}

  useEffect(() => {
        let questionBox = document.getElementById('question-box');
        if(questionBox){
          while (questionBox.firstChild) {
            questionBox.removeChild(questionBox.firstChild);
          }

          if(currentQuestion.type === 'Rearrange'){
            let answersList = [currentQuestion.item1, currentQuestion.item2, currentQuestion.item3, currentQuestion.item4]
            console.log(answersList)
            let list = document.createElement('ul');
            list.classList.add('drag-list');
            
            let item1 = document.createElement('li');
            item1.classList.add('draggable');
            item1.setAttribute('id', '1');
            item1.setAttribute('draggable', 'true');
            item1.innerText = String(answersList.splice(Math.floor(Math.random()*answersList.length), 1));
            list.appendChild(item1);

            let item2 = document.createElement('li');
            item2.classList.add('draggable');
            item2.setAttribute('id', '2');
            item2.setAttribute('draggable', 'true');
            item2.innerText = String(answersList.splice(Math.floor(Math.random()*answersList.length), 1));
            list.appendChild(item2);

            let item3 = document.createElement('li');
            item3.classList.add('draggable');
            item3.setAttribute('id', '3');
            item3.setAttribute('draggable', 'true');
            item3.innerText = String(answersList.splice(Math.floor(Math.random()*answersList.length), 1));
            list.appendChild(item3);

            let item4 = document.createElement('li');
            item4.classList.add('draggable');
            item4.setAttribute('id', '4');
            item4.setAttribute('draggable', 'true');
            item4.innerText = String(answersList.splice(Math.floor(Math.random()*answersList.length), 1));
            list.appendChild(item4);

            questionBox.appendChild(list);

            let dragSrcEl;

            function dragStart(e) {
                this.style.opacity = '0.4';
                dragSrcEl = this;
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', this.innerHTML);
              };
              
              function dragEnter(e) {
                this.classList.add('over');
              }
              
              function dragLeave(e) {
                e.stopPropagation();
                this.classList.remove('over');
              }
              
              function dragOver(e) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                return false;
              }
              
              function dragDrop(e) {
                if (dragSrcEl != this) {
                  dragSrcEl.innerHTML = this.innerHTML;
                  this.innerHTML = e.dataTransfer.getData('text/html');
                }
                return false;
              }
              
              function dragEnd(e) {
                var listItens = document.querySelectorAll('.draggable');
                [].forEach.call(listItens, function(item) {
                  item.classList.remove('over');
                });
                this.style.opacity = '1';
              }
              
              function addEventsDragAndDrop(el) {
                el.addEventListener('dragstart', dragStart, false);
                el.addEventListener('dragenter', dragEnter, false);
                el.addEventListener('dragover', dragOver, false);
                el.addEventListener('dragleave', dragLeave, false);
                el.addEventListener('drop', dragDrop, false);
                el.addEventListener('dragend', dragEnd, false);
              }
              
              var listItens = document.querySelectorAll('.draggable');
              [].forEach.call(listItens, function(item) {
                addEventsDragAndDrop(item);
              });
              

          }

          if(currentQuestion.type === 'Fill in the blanks'){
            let str = currentQuestion.statement
            let regex = /#/gi, result, indices = [];
            while ( (result = regex.exec(str)) ) {
                indices.push(result.index);
            }
            
            let temp = []
            while(indices.length){
                let start = indices[0]
                let end = indices[1]
                let ans = currentQuestion.statement.slice(start,end+1);
                temp.push(ans.slice(1,ans.length-1));
                indices.shift();
                indices.shift();
            }
            setBlankAnswers(temp);

            let remainingWords = currentQuestion.statement.split('#');
            remainingWords = remainingWords.filter((word) => !temp.includes(word))
            setWords(remainingWords);

            
            for(let i=0; i<remainingWords.length; i++){
                let sentence = document.createElement('p');
                sentence.style.display = 'inline';
                sentence.innerHTML = remainingWords[i];

                questionBox.appendChild(sentence);

                if(i === remainingWords.length-1) return;
                
                let dash = document.createElement('input');
                dash.style.width = temp[i].length*20 + 'px'
                dash.style.display = 'inline';
                dash.style.padding = '3px';
                dash.style.marginRight = '5px';
                dash.style.marginLeft = '5px';
                dash.style.border = 'none';
                dash.style.borderRadius = '4px';
                dash.setAttribute('type', 'text');
                dash.setAttribute('id', `input${i}`);
                dash.setAttribute('className', `blank`);

                questionBox.appendChild(dash);
            }
          }

          if(currentQuestion.type === 'MCQ'){
            let questionText = document.createElement('p');
            questionText.innerHTML = currentQuestion.question;
            questionText.style.display = 'inline';
            questionBox.appendChild(questionText);

            let box1 = document.createElement('div');
            box1.style.display = 'flex';
            box1.style.width = '90%';
            box1.style.justifyContent = 'space-between';
            box1.style.alignItems = 'center';

            let button1 = document.createElement('button');
            button1.innerText = String(currentQuestion.option1.option);
            button1.id = 'option1';
            button1.classList.add('option-button');
            button1.addEventListener('click', () => chooseAnswer('1'));
            let button2 = document.createElement('button');
            button2.innerText = String(currentQuestion.option2.option);
            button2.id = 'option2';
            button2.classList.add('option-button');
            button2.addEventListener('click', () => chooseAnswer('2'));
            box1.appendChild(button1)
            box1.appendChild(button2)

            let box2 = document.createElement('div');
            box2.style.display = 'flex';
            box2.style.width = '90%';
            box2.style.justifyContent = 'space-between';
            box2.style.alignItems = 'center';

            let button3 = document.createElement('button');
            button3.innerText = String(currentQuestion.option3.option);
            button3.id = 'option3';
            button3.classList.add('option-button');
            button3.addEventListener('click', () => chooseAnswer('3'));
            let button4 = document.createElement('button');
            button4.innerText = String(currentQuestion.option4.option);
            button4.id = 'option4';
            button4.classList.add('option-button');
            button4.addEventListener('click', () => chooseAnswer('4'));
            box2.appendChild(button4)
            box2.appendChild(button3)

            questionBox.appendChild(box1);
            questionBox.appendChild(box2);

          }
        }
  }, [currentQuestion])

  const handleSolve = (ass) => {
    setShowAssignments(false);
    setCurrentAssignmentName(ass.assignmentName);
    getPerticularAssignment(ass._id);
    setIsSolve(true);
    setQuestions(ass.questions);
    setCurrentQuestion(ass.questions[0]);
  }

  const submitAnswer = async () => {


    const correct = () => {
      let temp = answers;
      temp[questionNumber] = true;
      setAnswers(temp)
      marks.current += 1;
    }

    const wrong = () => {
      let temp = answers;
      temp[questionNumber] = false;
      setAnswers(temp)
    }

    if(currentQuestion.type === 'Rearrange'){
      let answers = [];
      document.querySelectorAll('.draggable').forEach(item => answers.push(item.innerText));
      if(answers[0].trim().toLowerCase() === currentQuestion.item1.trim().toLowerCase() && answers[1].trim().toLowerCase() === currentQuestion.item2.trim().toLowerCase() && answers[2].trim().toLowerCase() === currentQuestion.item3.trim().toLowerCase() && answers[3].trim().toLowerCase() === currentQuestion.item4.trim().toLowerCase()){
          
          correct()
      }else{
          wrong()
      }
  }

  if(currentQuestion.type === 'MCQ'){
      if(currentQuestion[`option${selectedAnswer}`].correct){
        correct()
      }else{
        wrong()
      }
  }

    if(currentQuestion.type === 'Fill in the blanks'){
      let answers = []
      for(let i=0; i<blankAnswers.length; i++){
          answers.push(document.getElementById(`input${i}`).value);
      }
      console.log(answers)
      for(let i=0; i<blankAnswers.length; i++){
          if(document.getElementById(`input${i}`).value.toLowerCase() !== blankAnswers[i].toLowerCase()){
              wrong()
          }
      }
      correct()
    }

    if(questionNumber+1 === questions.length){
      await axios
      .post("/submitAssignment", {
        assignName: currentAssignmentName,
        assignId: perticularAssignment._id,
        answers: answers,
        student: loggedUser._id,
        data: {
          marks: marks.current,
          name: loggedUser.name,
          rollnumber: loggedUser.rollnumber,
        },
      })
      .then((res) => {
        swal('Assignment submitted successfully!', '', 'success')
        setIsSolve(false);
        setShowAssignments(false);
        setShowScore(true)
        // setAssignments(res.data.aiss);
        // setPerticularAssignment(res.data.aiss);
        // console.log("quesions for pa", res.data.aiss.questions);
      })
      .catch((e) => {
        console.log("error while getAllAssignmentStudent client ", e);
      });
      
    }else{
      setCurrentQuestion(questions[questionNumber+1])
      setQuestionNumber(questionNumber+1)
    }
    
    
  }


  if (user == "teacher") {
    return (
      <div className='question-card' style={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}}>
        <PageTitle title="Typography" />
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <div style={{ display: "flex" }}>
              <Button
                variant="contained"
                color={isAllAssignments == true ? "secondary" : "error"}
                onClick={() => {
                  getAllAssignment();
                  setCreateAssign(false);
                  setIsAllAssignments(true);
                  setShowPreview(false);
                }}
                style={{ marginTop: "20px", marginRight: "20px" }}
              >
                Show All Assignments
              </Button>
              <Button
                variant="contained"
                color={createAssign == true ? "secondary" : "error"}
                style={{ marginTop: "20px" }}
                onClick={(e) => {
                  // handleStudentSubmit(e);
                  setIsAllAssignments(false);
                  setShowPreview(false);
                  setCreateAssign(true);
                  console.log("this is full new assign", newAsign);
                  // createNewAssignment();
                }}
              >
                Make New Assignment
              </Button>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            {
              showPreview ?
              questions.length ?
              <div class="main-quiz-area">
                <svg className='web-svg' viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
                  <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z" style={{stroke: 'none', fill: '#E5ECF4'}}></path>
                </svg>

                <div class='quiz-card'>
                  <LinearProgress variant="determinate" value={(questionNumber/(questions.length-1))*100} />
                    <div className='d-flex justify-content-between align-items-center'>
                      <h3 className='mb-4 mt-5'>Practice makes a man perfect</h3>
                    </div>
                    {
                        currentQuestion.type === 'MCQ' ?
                        <p className='instructions'>Choose the correct option.</p>
                        :
                        null
                    }
                    {
                        currentQuestion.type === 'Rearrange' ?
                        <p className='instructions'>Drag and drop the items to arrange them in a correct sequence.</p>
                        :
                        null
                    }

                    <div id='question-box' className='question-box'>
                    
                    </div>

                    <div className='d-flex justify-content-around align-items-center'>
                    <button className='arrow-btns' onClick={() => previous()}><i className="fas fa-arrow-left"></i></button>
                    <button onClick={checkAnswer} style={{marginLeft: 'auto', marginRight: 'auto'}} className='check-button'>Check</button>
                    <button className='arrow-btns' onClick={() => next()}><i className="fas fa-arrow-right"></i></button>
                    </div>     

                </div>
              </div>
              :
              <h1>No questions added yet. Please add some questions</h1>
              :
              null
            }
            {isAllAssignments ? (
              <div style={{width: '95%', marginLeft: 'auto', marginRight: 'auto'}} className='p-2 d-flex justify-content-around align-items-center flex-wrap'>
                {
                  assignments.reverse().map((ass, i) => (
                      <div className="bg-light card mb-3" style={{width: '18rem'}}>
                        <div className="card-body">
                          <h6 className="card-title">{ass.subject.charAt(0).toUpperCase() + ass.subject.slice(1)}</h6>
                          <h4 className="card-subtitle mb-2 text-muted">{ass.assignmentName}</h4>
                          {/* <div className='d-flex justify-content-between align-items-center'><i className="fas fa-hourglass"></i> <p className="text-muted">{ass.deadline}</p></div> */}
                          <div className='d-flex justify-content-between align-items-center mt-2'>
                            <button onClick={() => {
                              setCurrentAssignmentName(ass.assignmentName);
                              setIsAllAssignments(false);
                              history.push(`/app/question/${ass._id}`);
                              // addNewQuestion(a.assignmentName);
                            }} className="btn btn-primary">Add questions</button>
                            <a onClick={() => handlePreview(ass.questions)} style={{textDecoration: 'none'}} class="card-link">Preview</a>
                            <button onClick={() => deleteAssignment(ass.assignmentName)} style={{width: '10%', border: 'none', background: 'inherit', color: 'grey'}}><i class="fas fa-trash"></i></button>
                          </div>
                        </div>
                      </div>
                  ))
                }
              </div>
            ) : (
              ""
            )}
            {createAssign == true ? (
              <>
                <div style={{width: '80%'}} className="py-4 px-4 form-card mt-4">
                  <div className="mb-4">
                    <label for="exampleFormControlInput1" className="form-label">Assignment name</label>
                    <input name="assignmentName" onChange={(e) => {handleInputChangeNewAssign(e)}} style={{width: '80%'}} type="email" className="form-control" id="exampleFormControlInput1" placeholder='Ex. Rational Numbers Assignment' required/>
                  </div>
                  <div className="mb-4">
                    <label for='class-select' className="form-label">Class</label>
                    <select onChange={(e) => {handleInputChangeNewAssign(e)}} name="class" style={{width: '30%'}} class="form-select" id='class-select'>
                      <option value="8" selected>8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label for='class-select' className="form-label">Subject</label>
                    <select onChange={(e) => {handleInputChangeNewAssign(e)}} name="subject" style={{width: '30%'}} class="form-select" id='class-select'>
                      <option value="math" selected>Maths</option>
                      <option value="science">Science</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label for='class-select' className="form-label">Division</label>
                    <select name="division" onChange={(e) => {handleInputChangeNewAssign(e)}} style={{width: '30%'}} class="form-select" id='class-select'>
                      <option value='a'>A</option>
                      <option value='b'>B</option>
                      <option value='c'>C</option>
                      <option value='d'>D</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label for="exampleFormControlInput1" className="form-label">Chapter</label>
                    <input name="chapter" onChange={(e) => {handleInputChangeNewAssign(e)}} style={{width: '80%'}} type="email" className="form-control" id="exampleFormControlInput1" placeholder='Ex. Rational Numbers' required/>
                  </div>
                  <div className="mb-4">
                    <label className="form-label" for="datetime">Deadline</label>
                    <input className="form-control" onChange={(e) => {handleInputChangeNewAssign(e)}} style={{width: '30%'}} type="datetime-local" id="datetime" name="deadline"/>
                  </div>

                    <Button
                      className='mt-3 mb-3'
                      style={{marginLeft: 'auto', marginRight: 'auto'}}
                      variant="contained"
                      color="secondary"
                      // type="submitt"
                      onClick={(e) => {
                        // handleStudentSubmit(e);
                        setCreateAssign(!createAssign);
                        createAssignment();
                        swal('Assignment created!', '', 'success');
                      }}
                    >
                      Create Assignment
                    </Button>
                </div>
                {/* <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <TextField
                      // id="outlined-textarea"
                      label="Assignment Name"
                      placeholder="Assignment Name"
                      name="assignmentName"
                      fullWidth
                      style={{
                        width: "350px",
                        marginBottom: "20px",
                        marginTop: "20px",
                      }}
                      className={classes.textfield}
                      onChange={(e) => {
                        handleInputChangeNewAssign(e);
                      }}
                    />
                    <br />
                    <TextField
                      // id="outlined-textarea"
                      label="Chapter"
                      placeholder="Chapter Name"
                      name="chapter"
                      fullWidth
                      style={{ width: "350px", marginBottom: "20px" }}
                      className={classes.textfield}
                      onChange={(e) => {
                        handleInputChangeNewAssign(e);
                      }}
                    />

                    <TextField
                      // id="outlined-textarea"
                      label="Class"
                      placeholder="Class"
                      name="class"
                      fullWidth
                      style={{
                        width: "350px",
                        marginBottom: "20px",
                      }}
                      className={classes.textfield}
                      onChange={(e) => {
                        handleInputChangeNewAssign(e);
                      }}
                    />
                    <br />
                    <br />
                    <Button
                      variant="contained"
                      color="secondary"
                      // type="submitt"
                      onClick={(e) => {
                        // handleStudentSubmit(e);
                        setCreateAssign(!createAssign);
                        createNewAssignment();
                      }}
                    >
                      Create Assignment
                    </Button>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      // id="outlined-textarea"
                      label="Subject"
                      placeholder="Subject"
                      name="subject"
                      style={{ width: "350px", marginTop: "20px" }}
                      onChange={(e) => {
                        handleInputChangeNewAssign(e);
                      }}
                    />
                    <TextField
                      // id="outlined-textarea"
                      label="Deadline"
                      placeholder="Last Date To submit"
                      name="deadline"
                      style={{
                        width: "350px",
                        marginBottom: "20px",
                        marginTop: "20px",
                      }}
                      onChange={(e) => {
                        handleInputChangeNewAssign(e);
                      }}
                    />

                    <TextField
                      // id="outlined-textarea"
                      label="Division"
                      placeholder="Division"
                      name="division"
                      style={{
                        width: "350px",
                      }}
                      onChange={(e) => {
                        handleInputChangeNewAssign(e);
                      }}
                    />
                  </Grid>
                  <Grid item xs={1}></Grid>
                </Grid>*/}
              </>
            ) : (
              ""
            )}
          </Grid> 
        </Grid> 
      </div>
    );
  } else if (user == "student") {
    return (
      <>
      {
        showScore ?
        <div className='container mt-4 mb-3 py-2'>
            <div className='score-bar'>
              <h1 className='score-number'>{parseInt(marks.current/questions.length*100)} %</h1>
              <div className='details'>
                  <p style={{fontSize: '1.2em'}}>Assignment</p>
                  <h3>{currentAssignmentName}</h3>
              </div>
            </div>
                    <div className="d-flex justify-content-between align-items-lg-start">
                      <div className='question-bar'>
                        {
                            Object.keys(answers).map((item, index) => {
                              return(
                                <div className='d-flex'>
                                  {
                                    answers[item] === true ?
                                    <Link style={{textDecoration: 'none', color: 'inherit'}} activeClass="active" spy={true} smooth={true} offset={-90} duration={500} to={`que${index}`} className='question-number'>
                                      <p className='mx-2 text-success'>&#10004;</p> <p>{index+1}</p>
                                    </Link>
                                    :
                                    <Link style={{textDecoration: 'none', color: 'inherit'}} activeClass="active" spy={true} smooth={true} offset={-90} duration={500} to={`que${index}`} className='question-number'>
                                      <p className='mx-2 text-danger'>&#10006;</p> <p>{index+1}</p>
                                    </Link>
                                  }
                                </div>
                              )
                          })
                        }
                    </div>

                    <div className='questions-section'>
                      {
                        questions.map((item, index) => {
                          return(
                            <div id={`que${index}`} className='question-card mt-3'>
                              
                                
                                  {
                                    item.type === 'MCQ' ?
                                    <div>
                                      <h4 className='mx-3'>Q{index+1} <Latex>{item.question ? item.question : item.statement}</Latex></h4>
                                    <div className='d-flex justify-content-between option-area mt-4'>

                                      {
                                        item.option1.correct ?
                                          <div className="alert alert-success" role="alert">
                                              <Latex>{item.option1.option}</Latex>
                                          </div>
                                          :
                                          <div className="alert" role="alert">
                                              <Latex>{item.option1.option}</Latex>
                                          </div>
                                      }
                                      {
                                        item.option2.correct ?
                                          <div className="alert alert-success" role="alert">
                                              <Latex>{item.option2.option}</Latex>
                                          </div>
                                          :
                                          <div className="alert" role="alert">
                                              <Latex>{item.option2.option}</Latex>
                                          </div>
                                      }
                                      {
                                        item.option3.correct ?
                                          <div className="alert alert-success" role="alert">
                                              <Latex>{item.option3.option}</Latex>
                                          </div>
                                          :
                                          <div className="alert" role="alert">
                                              <Latex>{item.option3.option}</Latex>
                                          </div>
                                      }
                                      {
                                        item.option4.correct ?
                                          <div className="alert alert-success" role="alert">
                                              <Latex>{item.option4.option}</Latex>
                                          </div>
                                          :
                                          <div className="alert" role="alert">
                                              <Latex>{item.option4.option}</Latex>
                                          </div>
                                      }
                                    </div>
                                    </div>
                                    :
                                    null
                                  }
                                  {
                                    item.type === 'Fill in the blanks' ?
                                    <div style={{width: '100%'}} className='d-flex flex-wrap align-items-baseline'>
                                      <h4>Q{index+1}</h4> {item.statement.split(" ").map((word) => <h4 className="mx-1 px-1">{word[0] === '#' ? <span className="alert alert-success">{word.substr(1,word.length-2)}</span> : <p>{word}</p>}</h4>)}
                                    </div>
                                    
                                  
                                    :
                                    null
                                  }
                                  {
                                    item.type === 'Rearrange' ?
                                    <div className='mt-1'>
                                      <h4>Q{index+1} {item.statement}</h4>
                                      <div className='alert alert-success'>{item.item1}</div>
                                      <div className='alert alert-success'>{item.item2}</div>
                                      <div className='alert alert-success'>{item.item3}</div>
                                      <div className='alert alert-success'>{item.item4}</div>
                                    </div>
                                    :
                                    null
                                  }
                                </div>
                            
                          )
                        })
                      }
                    </div>
                    </div>
        </div>
        :
        null
      }
        
        {isSolve == true ? (
          <div class="main-quiz-area mt-3">
              
              <svg className='web-svg' viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
                  <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z" style={{stroke: 'none', fill: '#E5ECF4'}}></path>
              </svg>

              <div class='quiz-card mt-5'>
                {
                  typeof questions !== 'undefined' ?
                  <LinearProgress variant="determinate" value={(questionNumber/(questions.length-1))*100} />
                  :
                  null
                }
                <div className='d-flex justify-content-between align-items-center'>
                    <h3 className='mb-4 mt-5'>Practice makes a man perfect</h3>
                </div>

                {
                   currentQuestion.type === 'Fill in the blanks' ?
                   <p className='instructions'>Fill in the blanks.</p>
                   :
                   null
                }
                {
                   currentQuestion.type === 'MCQ' ?
                   <p className='instructions'>Choose the correct option.</p>
                   :
                   null
                }
                {
                   currentQuestion.type === 'Rearrange' ?
                   <p className='instructions'>Drag and drop the items to arrange them in a correct sequence.</p>
                   :
                   null
                }
                
                  <div id='question-box' className='question-box'>
                
                  </div>

                  <div className='d-flex justify-content-around align-items-center'>
                    <button onClick={submitAnswer} style={{marginLeft: 'auto', marginRight: 'auto'}} className='check-button'>Next</button>
                  </div>      
              </div>
            
          </div>
        ) : null
        }
        {
          showAssignments ?
          <div>
            <PageTitle
          title={`Class ${
            loggedUser.class
          }${loggedUser.division.toUpperCase()} Assignments`}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setIsSolve(false);
            getAllAssignment();
          }}
        >
          {" "}
          {isSolve == true ? "Close" : "Fetch Assignments"}{" "}
        </Button>
            <Table className="mb-0">
              <TableHead>
                <TableRow>
                  {cols.map((key, i) => (
                    <TableCell key={i}>
                      {key}
                      {/* "sangham" */}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {assignments.map((a, i) => (
                  <TableRow key={i}>
                    <TableCell>{a.assignmentName}</TableCell>
                    <TableCell>{a.subject}</TableCell>
                    <TableCell>{a.chapter}</TableCell>
                    <TableCell>{a.facultyName}</TableCell>
                    <TableCell>{a.deadline}</TableCell>
                    <TableCell>
                      {" "}
                      {/* <Link
                        // to={`/app/assignment/${a.assignmentName}`}
                        style={{ textDecoration: "none" }}
                      > */}
                      <Button
                        variant="contained"
                        color="primary"
                        // href={`/app/assignment/`}
                        onClick={() => {
                          handleSolve(a)
                        }}
                      >
                        {" "}
                        Solve{" "}
                      </Button>{" "}
                      {/* </Link> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* {check(8) == true ? <h1>this is true</h1> : <h1>this is false</h1>} */}
          </div>
          :
          null
        }
      </>
    );
  } else {
    return <PageTitle title="this is the admin" />;
  }
}
