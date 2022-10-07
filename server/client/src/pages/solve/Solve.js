import React, { useState, useEffect, useRef, createRef } from "react";
import ReactDOM from 'react-dom';
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import Timer from '../../components/Timer/Timer';
import {Input} from '@material-ui/core'
import { LinearProgress } from '@mui/material';
import TopMenu from "../../components/TopMenu/TopMenu";
import empty from '../../images/empty.png';

import "../../styles/styles.css";

const Solve = (props) => {

  const [toggle, setToggle] = useState("solve");
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
  const [answers, setAnswers] = useState({});
  const [blank, setBlank] = useState('');
  const [mins, setMins] = useState(0);

  const history = useHistory();
  const location = useLocation();

  const getAssignment = (id) => {
    axios
      .get(`/assignments/getPerticularAssignment?id=${id}`)
      .then((res) => {
        setPerticularAssignment(res.data.aiss);
        setMins(res.data.aiss.mins)
        setQuestions(res.data.aiss.questions);
        setCurrentQuestion(res.data.aiss.questions[0]);
      })
      .catch((e) => {
        console.log("error while getAllAssignmentStudent client ", e);
      });
  };

  useEffect(() => {
    getAssignment(props.id)
  }, []);

  useEffect(() => {
    if(questions.length){
        let ans = {}
    for(let [i, item] of questions.entries()){
        if(item.type === 'MCQ'){
            ans[i] = {
                chosen: null,
                correct: item.option1.correct ? 1 : item.option2.correct ? 2 : item.option3.correct ? 3 : 4
            }
        }
        if(item.type === 'Fill in the blanks'){
            let str = item.statement
            let regex = /#/gi, result, indices = [];
            while ( (result = regex.exec(str)) ) {
                indices.push(result.index);
            }
            let temp = []
            while(indices.length){
                let start = indices[0]
                let end = indices[1]
                let a = item.statement.slice(start,end+1);
                temp.push(a.slice(1,a.length-1));
                indices.shift();
                indices.shift();
            }
            ans[i] = {
                correct: temp,
                answers: temp.map(i => '')
                
            }
        }
        if(item.type === 'Rearrange'){
            ans[i] = {
                answers: [],
                correct: [item.item1, item.item2, item.item3, item.item4]
            }
        }
    }
    setAnswers(ans);
    }
  }, [questions])

  const chooseAnswer = (id) => {
    setSelectedAnswer(id);
    let temp = answers
    temp[questionNumber].chosen = parseInt(id);
    setAnswers(temp);
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

const blankSpace = <div><Input/></div>

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
            
            if(answers[questionNumber].answers.length){

                let item1 = document.createElement('li');
                item1.classList.add('draggable');
                item1.setAttribute('id', '1');
                item1.setAttribute('draggable', 'true');
                item1.setAttribute('style', "border: none; backrgound-color: #eeb316; border-radius: 25px; padding: 2%");
                item1.innerText = answers[questionNumber].answers[0]
                list.appendChild(item1);

                let item2 = document.createElement('li');
            item2.classList.add('draggable');
            item2.setAttribute('id', '2');
            item2.setAttribute('draggable', 'true');
            item2.setAttribute('style', "border: none; backrgound-color: #eeb316; border-radius: 25px; padding: 2%");
            item2.innerText =  answers[questionNumber].answers[1]
            list.appendChild(item2);

            let item3 = document.createElement('li');
            item3.classList.add('draggable');
            item3.setAttribute('id', '3');
            item3.setAttribute('draggable', 'true');
            item3.setAttribute('style', "border: none; backrgound-color: #eeb316; border-radius: 25px; padding: 2%");
            item3.innerText =  answers[questionNumber].answers[2]
            list.appendChild(item3);

            let item4 = document.createElement('li');
            item4.classList.add('draggable');
            item4.setAttribute('id', '4');
            item4.setAttribute('draggable', 'true');
            item4.setAttribute('style', "border: none; backrgound-color: #eeb316; border-radius: 25px; padding: 2%");
            item4.innerText =  answers[questionNumber].answers[3]
            list.appendChild(item4);


            }else{
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
            }

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
                  let temp = []
                  for(let i=1; i<=4; i++){
                    temp.push(document.getElementById(i).innerHTML);
                  }
                  let ans = answers;
                  ans[questionNumber].answers = temp;
                  setAnswers(ans);
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
                let sentence = document.createElement('h2');
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
                dash.style.textAlign = 'center';
                dash.value = answers[questionNumber].answers[i]
                dash.setAttribute('type', 'text');
                dash.setAttribute('id', `input${i}`);
                dash.setAttribute('className', `blank`);
                dash.addEventListener('input', (evt) => {
                    let ans = answers;
                    ans[questionNumber].answers[evt.target.id.charAt(evt.target.id.length-1)] = evt.target.value;
                });

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
            button1.classList.add('mt-4');
            button1.setAttribute('style', "border: none; backrgound-color: #eeb316; border-radius: 25px; padding: 2%")
            button1.addEventListener('click', () => chooseAnswer('1'));
            let button2 = document.createElement('button');
            button2.innerText = String(currentQuestion.option2.option);
            button2.id = 'option2';
            button2.classList.add('option-button');
            button2.classList.add('mt-4');
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
            box2.appendChild(button3)
            box2.appendChild(button4)

            questionBox.appendChild(box1);
            questionBox.appendChild(box2);

            if(typeof answers[questionNumber] !== 'undefined' && answers[questionNumber].chosen){
                document.getElementById(`option${answers[questionNumber].chosen}`).style.backgroundColor = 'rgba(238, 179, 22, 0.7)';
                document.getElementById(`option${answers[questionNumber].chosen}`).style.color = 'white';
            }

          }
        }
  }, [currentQuestion])

  const saveAnswer = () => {

    if(currentQuestion.type === 'Rearrange'){
      let answers = [];
      document.querySelectorAll('.draggable').forEach(item => answers.push(item.innerText));
      if(answers[0].trim().toLowerCase() === currentQuestion.item1.trim().toLowerCase() && answers[1].trim().toLowerCase() === currentQuestion.item2.trim().toLowerCase() && answers[2].trim().toLowerCase() === currentQuestion.item3.trim().toLowerCase() && answers[3].trim().toLowerCase() === currentQuestion.item4.trim().toLowerCase()){
          //Correct
          answers[currentQuestion._id] = true
      }else{
          //Wrong
          answers[currentQuestion._id] = false
      }
  }

  if(currentQuestion.type === 'MCQ'){
    if(!selectedAnswer){
        swal('Please select an option first!', '', 'warning')
        return;
    }
    answers[currentQuestion._id] = selectedAnswer;  

  }

    if(currentQuestion.type === 'Fill in the blanks'){
      let answers = []
      for(let i=0; i<blankAnswers.length; i++){
          answers.push(document.getElementById(`input${i}`).value);
      }
      console.log(answers)
      for(let i=0; i<blankAnswers.length; i++){
          if(document.getElementById(`input${i}`).value.toLowerCase() !== blankAnswers[i].toLowerCase()){
              //Wrong
              answers[currentQuestion._id] = false
              return;
          }
      }
      //Correct
      answers[currentQuestion._id] = true
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

const submit = async () => {

}


    return(
        <div className="body">
      <h1 className="title d-block">Assignment - <span style={{fontSize: '0.5em'}}>{perticularAssignment != null ? perticularAssignment.assignmentName : ''}</span></h1>
      
      <div
        className="mt-3 section-card"
        style={{
          width: "95%",
          padding: "5%",
          background: "white",
          borderRadius: "12px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          maxHeight: '500%',
          transition: 'max-height 0.7s ease-in'
        }}
      >

{
            toggle === 'solve'?
            <div style={{textAlign: 'center'}}>

                <Timer mins={mins} />
                {
                    questions.length ?
                    <div class=''>
                        
                <LinearProgress variant="determinate" value={(questionNumber/(questions.length-1))*100} />
                    
                <h6 style={{textAlign: 'center', color: '#eeb316', width: '100%', marginLeft: 'auto', marginRight: 'auto'}} className="question-no mt-5">QUESTION {questionNumber+1}/{questions.length}</h6>

                    <div className="d-flex justify-content-between align-items-center">
                    <button style={{color: 'white', backgroundColor: '#eeb316'}} className='arrow-btns' onClick={() => previous()}><i className="fas fa-arrow-left"></i></button>
                        <div className="question-card" id='question-box'>

                        </div>
                        <button style={{color: 'white', backgroundColor: '#eeb316'}} className='arrow-btns' onClick={() => next()}><i className="fas fa-arrow-right"></i></button>
                    </div>
                    
                    {
                        questionNumber === questions.length-1?
                        <div className="d-flex justify-content-around align-items-center">
                        <button onClick={submit} className="attendance-button btn-rounded py-2 mt-5">Submit</button>
                        </div>
                        :
                        null
                    }
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
        </div>

        </div>
    )
}

export default Solve;