import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import { LinearProgress } from '@mui/material';
import Switch from "react-switch";
import { Link, animateScroll as scroll } from "react-scroll";
import TopMenu from "../../components/TopMenu/TopMenu";
import { FaDownload } from "react-icons/fa";

import "../../styles/styles.css";
import trash from '../../images/trash.png';
import empty from '../../images/empty.png';
import emptyFolder from '../../images/empty-folder.png';

const Latex = require('react-latex');

const AssignmentDetails = (props) => {
  const [toggle, setToggle] = useState("view");
  const [questions, setQuestions] = useState([]);
  const [assignment, setAssignment] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [chapter, setChapter] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({type: null, starred: false});
  const [blankAnswers, setBlankAnswers] = useState([]);
  const [words, setWords] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showScore, setShowScore] = useState(false);
  const [custom, setCustom] = useState(true);
  const [perticularAssignment, setPerticularAssignment] = useState({assignmentName: ''});
  const [addAssignQues, setAddAssignQues] = useState({});
  const [autoData, setAutoData] = useState([]);
  const [questionType, setQuestionType] = useState('MCQ');
  const [level, setLevel] = useState('0');
  const [option1Correct, setOption1Correct] = useState(false);
  const [option2Correct, setOption2Correct] = useState(false);
  const [option3Correct, setOption3Correct] = useState(false);
  const [option4Correct, setOption4Correct] = useState(false);

  const history = useHistory();
  const location = useLocation();

  
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
          let res = await axios.post('/assignments/addAssignmentQuestion', data);
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
          let res = await axios.post('/assignments/addAssignmentQuestion', {assignId: perticularAssignment._id, assignName: perticularAssignment.assignmentName, statement: evt.target.elements.statement.value, type: questionType, level: level});
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
          let res = await axios.post('/assignments/addAssignmentQuestion', data);
          if(res.status === 200){
              swal('Question added successfully!', '', 'success');
              
          }
      }catch(err){
          swal('Something went wrong!', err.message, 'error');   
      }
    }
}

  useEffect(() => {
    setQuestionNumber(0);
    setCurrentQuestion(questions[0])
  }, [toggle])

  const getAssignment = (id) => {
    axios
      .get(`/assignments/getPerticularAssignment?id=${id}`)
      .then((res) => {
        setPerticularAssignment(res.data.aiss);
        setQuestions(res.data.aiss.questions);
        setCurrentQuestion(res.data.aiss.questions[0]);
      })
      .catch((e) => {
        console.log("error while getAllAssignmentStudent client ", e);
      });
  };

  useEffect(() => {
    getAssignment(props.id)
  }, [])

  const toggleToView = () => {
    setToggle("view");
  };
  const toggleToAdd = () => {
    setToggle("add");
  };
  const toggleToSubmissions = () => {
    setToggle("submissions");
  };

  const items = [
    { name: "View Assignment", click: toggleToView },
    { name: "View Submissions", click: toggleToSubmissions },
    { name: "Add Questions", click: toggleToAdd },
  ];

  
  const chooseAnswer = (id) => {
    setSelectedAnswer(id);
    document.getElementById('option1').style.backgroundColor = 'rgb(238, 179, 22, 0.2)';
    document.getElementById('option1').style.color = 'black';
    document.getElementById('option2').style.backgroundColor = 'rgb(238, 179, 22, 0.2)';
    document.getElementById('option2').style.color = 'black';
    document.getElementById('option3').style.backgroundColor = 'rgb(238, 179, 22, 0.2)';
    document.getElementById('option3').style.color = 'black';
    document.getElementById('option4').style.backgroundColor = 'rgb(238, 179, 22, 0.2)';
    document.getElementById('option4').style.color = 'black';
    document.getElementById(`option${id}`).style.backgroundColor = 'rgba(238, 179, 22, 0.7)';
    document.getElementById(`option${id}`).style.color = 'white';
}

  useEffect(() => {
        let questionBox = document.getElementById('question-box');
        if(questionBox){
          while (questionBox.firstChild) {
            questionBox.removeChild(questionBox.firstChild);
          }

          if(currentQuestion.type === 'Rearrange'){
            let questionText = document.createElement('h2');
            questionText.innerHTML = currentQuestion.statement;
            questionText.style.display = 'inline';
            questionBox.appendChild(questionText);

            let answersList = [currentQuestion.item1, currentQuestion.item2, currentQuestion.item3, currentQuestion.item4]
            let list = document.createElement('ul');
            list.classList.add('drag-list');
            
            let item1 = document.createElement('li');
            item1.classList.add('draggable');
            item1.setAttribute('id', '1');
            item1.setAttribute('draggable', 'true');
            item1.setAttribute('style', "border: none; backrgound-color: #eeb316; border-radius: 25px; padding: 2%");
            item1.innerText = String(answersList.splice(Math.floor(Math.random()*answersList.length), 1));
            list.appendChild(item1);

            let item2 = document.createElement('li');
            item2.classList.add('draggable');
            item2.setAttribute('id', '2');
            item2.setAttribute('draggable', 'true');
            item2.setAttribute('style', "border: none; backrgound-color: #eeb316; border-radius: 25px; padding: 2%");
            item2.innerText = String(answersList.splice(Math.floor(Math.random()*answersList.length), 1));
            list.appendChild(item2);

            let item3 = document.createElement('li');
            item3.classList.add('draggable');
            item3.setAttribute('id', '3');
            item3.setAttribute('draggable', 'true');
            item3.setAttribute('style', "border: none; backrgound-color: #eeb316; border-radius: 25px; padding: 2%");
            item3.innerText = String(answersList.splice(Math.floor(Math.random()*answersList.length), 1));
            list.appendChild(item3);

            let item4 = document.createElement('li');
            item4.classList.add('draggable');
            item4.setAttribute('id', '4');
            item4.setAttribute('draggable', 'true');
            item4.setAttribute('style', "border: none; backrgound-color: #eeb316; border-radius: 25px; padding: 2%");
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
                let sentence = document.createElement('h3');
                sentence.style.display = 'inline';
                sentence.innerHTML = remainingWords[i];

                questionBox.appendChild(sentence);

                if(i === remainingWords.length-1) return;
                
                let dash = document.createElement('input');
                dash.style.width = temp[i].length*20 + 'px'
                dash.style.display = 'inline';
                dash.style.width = '180px';
                dash.style.background = '#eee';
                dash.style.border = 'none';
                dash.style.padding = '10px';
                dash.style.marginRight = '5px';
                dash.style.marginLeft = '5px';
                dash.style.borderRadius = '4px';
                dash.setAttribute('type', 'text');
                dash.setAttribute('id', `input${i}`);
                dash.setAttribute('className', `blank`);

                questionBox.appendChild(dash);
            }
          }

          if(currentQuestion.type === 'MCQ'){
            let questionText = document.createElement('h2');
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
            button1.setAttribute('style', "border: none; backrgound-color: #eeb316; border-radius: 25px; padding: 2%")
            button1.addEventListener('click', () => chooseAnswer('1'));
            let button2 = document.createElement('button');
            button2.innerText = String(currentQuestion.option2.option);
            button2.id = 'option2';
            button2.classList.add('option-button');
            button2.setAttribute('style', "border: none; backrgound-color: #eeb316; border-radius: 25px; padding: 2%")
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
            button3.setAttribute('style', "border: none; backrgound-color: #eeb316; border-radius: 25px; padding: 2%")
            button3.addEventListener('click', () => chooseAnswer('3')); 
            let button4 = document.createElement('button');
            button4.innerText = String(currentQuestion.option4.option);
            button4.id = 'option4';
            button4.classList.add('option-button');
            button4.setAttribute('style', "border: none; backrgound-color: #eeb316; border-radius: 25px; padding: 2%")
            button4.addEventListener('click', () => chooseAnswer('4'));
            box2.appendChild(button4)
            box2.appendChild(button3)

            questionBox.appendChild(box1);
            questionBox.appendChild(box2);

          }
        }
  }, [currentQuestion])

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
    if(!selectedAnswer){
        swal('Please select an option first!', '', 'warning')
        return;
    }
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

  return (
    <div className="body">
      <h1 className="title d-block">Assignment - <span style={{fontSize: '0.5em'}}>{perticularAssignment != null ? perticularAssignment.assignmentName : ''}</span></h1>
      <TopMenu items={items} />

      <div
        className="mt-3"
        style={{
          width: "95%",
          padding: "5%",
          background: "white",
          borderRadius: "12px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >

        {
            toggle === 'view'?
            <div style={{textAlign: 'center'}} class="">
                {/* <svg className='web-svg' viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
                  <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z" style={{stroke: 'none', fill: '#E5ECF4'}}></path>
                </svg> */}

                {
                    questions.length ?
                    <div class=''>
                <LinearProgress variant="determinate" value={(questionNumber/(questions.length-1))*100} />
                    
                <h6 style={{textAlign: 'center', color: '#eeb316', width: '100%', marginLeft: 'auto', marginRight: 'auto'}} className="question-no mt-5">QUESTION {questionNumber+1}/{questions.length}</h6>

                    <div id='question-box'>
                    
                    </div>

                    <div className='d-flex justify-content-around align-items-center'>
                        <button className='arrow-btns' onClick={() => previous()}><i className="fas fa-arrow-left"></i></button>
                        <button onClick={checkAnswer} className='btn-rounded attendance-button py-2 mt-3'>Check</button>
                        <button className='arrow-btns' onClick={() => next()}><i className="fas fa-arrow-right"></i></button>
                    </div>   

                </div>
                :
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img style={{height: '150px'}} src={empty}/>
                    <h3>No questions added yet!</h3>
                </div>
                }
            </div>
            :
            null
        }

{
            toggle === 'submissions'?
            <div>
                {
                    perticularAssignment.submission.length ?
                    <table className='table table-striped'>
                        <thead>
    <tr className="schedule-heading">
      <th scope="col">Sr No.</th>
      <th scope="col">Student</th>
      <th scope="col">Marks</th>
    </tr>
  </thead>

  <tbody>
    {
        assignment.submission.map((item, index) => 
            <tr>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.marks}</td>
            </tr>
        )
    }
  </tbody>

                    </table>
                    :
                    <div className="d-flex flex-column justify-content-center align-items-center">
                    <img style={{height: '200px'}} src={emptyFolder}/>
                    <h3 className="mt-4">No submissions yet!</h3>
                </div>
                }
            </div>
            :
            null
        }

{
            toggle === 'add'?
            <div>

                <div style={{textAlign: 'center', width: '100%', marginLeft: 'auto', marginRight: 'auto'}}>
                <label>
        <span><h5>Custom Questions</h5></span>
        <Switch checkedIcon={false} uncheckedIcon={false} onColor="#eeb316" onChange={() => setCustom(!custom)} checked={custom} />
      </label>
                </div>

                <hr/>

                {
                    custom === true ?
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

                    <button
                      className="btn-rounded attendance-button py-2 mt-4"
                      type="submit"
                    >
                      Add Question
                    </button>
              </form>
                    :
                    <div>
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
                    <button className="btn-rounded attendance-button py-2 mt-4"
                      type="submit"
                      onClick={() => handleAutoSubmit()}>Assign questions</button>
                  </div>
                    </div>
                }
            </div>
            :
            null
        }
        </div>
    </div>
)

}

export default AssignmentDetails;