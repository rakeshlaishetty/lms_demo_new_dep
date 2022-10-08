/* eslint no-inner-declarations: 0 */
/* eslint-disable react/no-array-index-key */
/* react/no-this-in-sfc: 0 */
/* eslint prefer-template: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-empty: 0 */
/* eslint  no-cond-assign: 0 */
/* eslint  no-useless-return: 0 */
/* eslint no-unneeded-ternary: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint no-nested-ternary: 0 */
/* eslint no-restricted-syntax: 0 */
/* eslint guard-for-in: 0 */

import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Input, Jumbotron, Card, CardBody, Button } from 'reactstrap';
import reactStringReplace from 'react-string-replace';
import { Colxx } from 'components/common/CustomBootstrap';
import { LinearProgress } from '@mui/material';
import IntlMessages from 'helpers/IntlMessages';
import StateButton from 'components/StateButton';
import axios from 'axios';

import empty from '../../../assets/img/empty-folder.png';

const Solve = ({ location }) => {
  const [solve, setSolve] = useState(false);
  const [assignment, setAssignment] = useState(null);

  const [questionNumber, setQuestionNumber] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({
    type: null,
    starred: false,
  });
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [selectedType, setSelectedType] = useState('MCQ');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [option1Correct, setOption1Correct] = useState(false);
  const [option2Correct, setOption2Correct] = useState(false);
  const [option3Correct, setOption3Correct] = useState(false);
  const [option4Correct, setOption4Correct] = useState(false);

  const [responses, setResponses] = useState({});
  const history = useHistory();
  const dropzone = useRef();

  const getAssignment = async () => {
    const res = await axios.get(
      `/assignments/getPerticularAssignment?id=${location.state.assignmentId}`
    );
    if (res.status === 200) {
      setAssignment(res.data.aiss);
      setCurrentQuestion(res.data.aiss.questions[0]);
      const temp = {};
      for (let i = 0; i < res.data.aiss.questions.length; i += 1) {
        if (res.data.aiss.questions[i].type === 'MCQ') {
          temp[i + 1] = {
            selected: null,
            correct: res.data.aiss.questions[i].option1.correct
              ? '1'
              : res.data.aiss.questions[i].option2.correct
              ? '2'
              : res.data.aiss.questions[i].option3.correct
              ? '3'
              : '4',
          };
        }
        if (res.data.aiss.questions[i].type === 'Fill in the blanks') {
          const str = res.data.aiss.questions[i].statement;
          const regex = /#/gi;
          let result;
          const indices = [];
          while ((result = regex.exec(str))) {
            indices.push(result.index);
          }
          const tem = [];
          while (indices.length) {
            const start = indices[0];
            const end = indices[1];
            const ans = res.data.aiss.questions[i].statement.slice(
              start,
              end + 1
            );
            tem.push(ans.slice(1, ans.length - 1));
            indices.shift();
            indices.shift();
          }

          const arr = reactStringReplace(
            res.data.aiss.questions[i].statement,
            /#/gi,
            (match, idx) => (
              <Input type="text" className="d-inline mx-2 blank" />
            )
          );

          const t = {};
          for (let j = 0; j < arr.length; j += 1) {
            if (typeof arr[j] !== 'string') {
              t[j] = {
                answer: tem.shift(),
                given: '',
              };
            }
          }
          temp[i + 1] = t;

          //   const arr = [];
          //   for (let j = 0; j < tem.length; j += 1) {
          //     arr.push('');
          //   }
          //   temp[i + 1] = {
          //     answers: tem,
          //     entered: arr,
          //   };
        }

        setResponses(temp);
      }
    }
  };

  useEffect(() => {
    getAssignment();
  }, []);

  useEffect(() => {
    if (currentQuestion.type === 'MCQ') {
      if (
        typeof responses[questionNumber + 1] !== 'undefined' &&
        responses[questionNumber + 1].selected
      ) {
        setSelectedAnswer(responses[questionNumber + 1].selected);
      } else {
        setSelectedAnswer('');
      }
    }
  }, [currentQuestion]);

  const handleInputBlank = (i, val) => {
    const temp = responses;
    temp[questionNumber + 1][i].given = val;
    setResponses(temp);
  };

  const manageFillInTheBlanks = () => {
    const str = currentQuestion.statement;
    const regex = /#/gi;
    let result;
    const indices = [];
    while ((result = regex.exec(str))) {
      indices.push(result.index);
    }

    const temp = [];
    while (indices.length) {
      const start = indices[0];
      const end = indices[1];
      const ans = currentQuestion.statement.slice(start, end + 1);
      temp.push(ans.slice(1, ans.length - 1));
      indices.shift();
      indices.shift();
    }

    const arr = reactStringReplace(
      currentQuestion.statement,
      /#/gi,
      (match, idx) => (
        <Input
          onChange={(evt) => handleInputBlank(idx, evt.target.value)}
          defaultValue={responses[questionNumber + 1][idx].given}
          id={`input${idx}`}
          type="text"
          className="d-inline mx-2 blank"
        />
      )
    );

    return arr;
  };

  const handleOptionClick = (option) => {
    const temp = responses;
    temp[questionNumber + 1].selected = String(option);
    setResponses(temp);

    setSelectedAnswer(option);
  };

  const next = () => {
    if (questionNumber + 1 < assignment.questions.length) {
      setCurrentQuestion(assignment.questions[questionNumber + 1]);
      setQuestionNumber(questionNumber + 1);
    }
  };

  const previous = () => {
    if (questionNumber > 0) {
      setCurrentQuestion(assignment.questions[questionNumber - 1]);
      setQuestionNumber(questionNumber - 1);
    }
  };

  const submit = async () => {
    let score = 0;
    for (let i = 1; i <= assignment.questions.length; i += 1) {
      if (typeof responses[i] !== 'undefined') {
        if (assignment.questions[i - 1].type === 'MCQ') {
          if (responses[i].selected === responses[i].correct) {
            score += 1;
          }
        }
        if (assignment.questions[i - 1].type === 'Fill in the blanks') {
          score += 1;
          for (const item in responses[i]) {
            if (
              responses[i][item].answer.toLowerCase() !==
              responses[i][item].given.toLowerCase()
            ) {
              score -= 1;
              break;
            }
          }
        }
      }
    }

    score = parseInt((score/assignment.questions.length)*100, 10);

    return new Promise((success, fail) => {
      setTimeout(async () => {
        const student = JSON.parse(window.localStorage.getItem('userdata'));
        const res = await axios.post('/assignments/updateScore', {
          studentId: student._id,
          studentName: student.name,
          assignmentId: assignment._id,
          score: score,
        });
        if (res.status === 200) {
          history.push({
            pathname: '/app/assignments/score',
            state: {
              score: score,
              responses: responses,
              assignment: assignment,
            },
          });
        }
      }, 3000);
    });
  };

  return (
    <>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card>
            {assignment !== null ? (
              <CardBody>
                {!solve ? (
                  <Jumbotron>
                    <h1 className="display-4">
                      <IntlMessages id={assignment.assignmentName} />
                    </h1>
                    <div className="w-70 d-flex flex-lg-row justify-content-between">
                      <p className="text-muted">
                        <IntlMessages
                          id={`Faculty: Prof. ${assignment.facultyId.name}`}
                        />
                      </p>
                      <p className="text-muted">
                        <IntlMessages
                          id={`Due: ${new Date(
                            assignment.deadline
                          ).toLocaleDateString()}`}
                        />
                      </p>
                      <p className="text-muted">
                        <IntlMessages
                          id={`Time limit: ${
                            assignment.mins
                              ? `${assignment.mins}mins ${assignment.sec}sec`
                              : 'N/A'
                          }`}
                        />
                      </p>
                    </div>
                    <hr className="mb-4" />
                    <div className="w-100 d-flex justify-content-center">
                      <Button
                        onClick={() => setSolve(true)}
                        color="primary"
                        size="lg"
                      >
                        <IntlMessages id="Solve" />
                      </Button>
                    </div>
                  </Jumbotron>
                ) : (
                  <div>
                    <div style={{ textAlign: 'center' }} className="">
                      {assignment.questions.length ? (
                        <div className="">
                          <LinearProgress
                            variant="determinate"
                            value={
                              (questionNumber /
                                (assignment.questions.length - 1)) *
                              100
                            }
                          />

                          <h6
                            style={{
                              textAlign: 'center',
                              color: '#eeb316',
                              width: '100%',
                              marginLeft: 'auto',
                              marginRight: 'auto',
                            }}
                            className="question-no mt-5"
                          >
                            QUESTION {questionNumber + 1}/
                            {assignment.questions.length}
                          </h6>

                          <div id="question-box" />

                          {currentQuestion.type === 'MCQ' ? (
                            <div>
                              <h2 className="mt-4">
                                {currentQuestion.question}
                              </h2>

                              <div
                                style={{
                                  marginLeft: 'auto',
                                  marginRight: 'auto',
                                }}
                                className="mx-5 d-flex flex-wrap w-100 text-align-center"
                              >
                                {selectedAnswer === 1 ? (
                                  <Button
                                    onClick={() => handleOptionClick(1)}
                                    color="info"
                                    className="w-40 mt-3 mx-3 py-2"
                                  >
                                    {currentQuestion.option1.option}
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => handleOptionClick(1)}
                                    outline={
                                      responses[questionNumber + 1].selected ===
                                      '1'
                                        ? false
                                        : true
                                    }
                                    color="info"
                                    className="w-40 mt-3 mx-3 py-2"
                                  >
                                    {currentQuestion.option1.option}
                                  </Button>
                                )}

                                {selectedAnswer === 2 ? (
                                  <Button
                                    onClick={() => handleOptionClick(2)}
                                    color="info"
                                    className="w-40 mt-3 mx-3 py-2"
                                  >
                                    {currentQuestion.option2.option}
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => handleOptionClick(2)}
                                    outline={
                                      responses[questionNumber + 1].selected ===
                                      '2'
                                        ? false
                                        : true
                                    }
                                    color="info"
                                    className="w-40 mt-3 mx-3 py-2"
                                  >
                                    {currentQuestion.option2.option}
                                  </Button>
                                )}

                                {selectedAnswer === 3 ? (
                                  <Button
                                    onClick={() => handleOptionClick(3)}
                                    color="info"
                                    className="w-40 mt-3 mx-3 py-2"
                                  >
                                    {currentQuestion.option3.option}
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => handleOptionClick(3)}
                                    outline={
                                      responses[questionNumber + 1].selected ===
                                      '3'
                                        ? false
                                        : true
                                    }
                                    color="info"
                                    className="w-40 mt-3 mx-3 py-2"
                                  >
                                    {currentQuestion.option3.option}
                                  </Button>
                                )}

                                {selectedAnswer === 4 ? (
                                  <Button
                                    onClick={() => handleOptionClick(4)}
                                    color="info"
                                    className="w-40 mt-3 mx-3 py-2"
                                  >
                                    {currentQuestion.option4.option}
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => handleOptionClick(4)}
                                    outline={
                                      responses[questionNumber + 1].selected ===
                                      '4'
                                        ? false
                                        : true
                                    }
                                    color="info"
                                    className="w-40 mt-3 mx-3 py-2"
                                  >
                                    {currentQuestion.option4.option}
                                  </Button>
                                )}
                              </div>
                            </div>
                          ) : null}

                          {currentQuestion.type === 'Fill in the blanks' ? (
                            <div className="w-100 mt-4 d-flex justify-content-center flex-grow-1 flex-wrap">
                              {manageFillInTheBlanks().map((item, i) => (
                                <h2 id={i} key={i}>
                                  {item}
                                </h2>
                              ))}
                            </div>
                          ) : null}

                          <div className="d-flex justify-content-around align-items-center mt-4">
                            <Button
                              outline
                              color="primary"
                              onClick={() => previous()}
                            >
                              <div className="glyph-icon simple-icon-arrow-left" />
                            </Button>
                            {questionNumber ===
                            assignment.questions.length - 1 ? (
                              <StateButton
                                id="successButton"
                                color="primary"
                                className="mb-3"
                                onClick={submit}
                              >
                                <IntlMessages id="button.click-here" />
                              </StateButton>
                            ) : null}
                            <Button
                              outline
                              color="primary"
                              onClick={() => next()}
                            >
                              <div className="glyph-icon simple-icon-arrow-right" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="d-flex flex-column justify-content-center align-items-center">
                          <img
                            alt="empty-folder"
                            style={{ height: '150px' }}
                            src={empty}
                          />
                          <h3>No questions added yet!</h3>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardBody>
            ) : null}
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default Solve;
