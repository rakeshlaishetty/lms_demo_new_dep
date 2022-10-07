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

import React, { useState, useEffect, useRef } from 'react';
import {
  Row,
  Alert,
  Form,
  Input,
  Button,
  NavLink,
  Nav,
  NavItem,
  CardBody,
  Card,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import IconCard from 'components/cards/IconCard';
import Select from 'react-select';
import classnames from 'classnames';
import CustomSelectInput from 'components/common/CustomSelectInput';
import DropzoneComponent from 'react-dropzone-component';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { NotificationManager } from 'components/common/react-notifications';
import { LinearProgress } from '@mui/material';
import reactStringReplace from 'react-string-replace';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
import axios from 'axios';

import empty from '../../../assets/img/empty-folder.png';

const ReactDOMServer = require('react-dom/server');

const Preview = ({ location }) => {
  const [activeTab, setActiveTab] = useState('View');
  const [modalRight, setModalRight] = useState(false);
  const [perticularAssignment, setPerticularAssignment] = useState({
    assignmentName: '',
  });
  const [auto, setAuto] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [img, setImg] = useState('');
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

  const dropzone = useRef();

  const selectData = [
    { label: 'Multiple Choice Questions', value: 'MCQ', key: 0 },
    { label: 'Fill in the blanks', value: 'Fill in the blanks', key: 1 },
    // { label: 'Rearrange', value: 'Rearrange', key: 2 },
  ];

  const levelData = [
    { label: 'Easy', value: 0, key: 0 },
    { label: 'Moderate', value: 1, key: 1 },
    { label: 'Hard', value: 2, key: 2 },
  ];

  const dropzoneComponentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: 'no-url',
  };
  const dropzoneConfig = {
    thumbnailHeight: 160,
    maxFilesize: 2,
    previewTemplate: ReactDOMServer.renderToStaticMarkup(
      <div className="dz-preview dz-file-preview mb-3">
        <div className="d-flex flex-row ">
          <div className="p-0 w-30 position-relative">
            {/* <div className="dz-error-mark">
              <span>
                <i />{' '}
              </span>
            </div> */}
            <div className="dz-success-mark">
              <span>
                <i />
              </span>
            </div>
            <div className="preview-container">
              {/*  eslint-disable-next-line jsx-a11y/alt-text */}
              <img data-dz-thumbnail className="img-thumbnail border-0" />
              <i className="simple-icon-doc preview-icon" />
            </div>
          </div>
          <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
            <div>
              {' '}
              <span data-dz-name />{' '}
            </div>
            <div className="text-primary text-extra-small" data-dz-size />
            <div className="dz-progress">
              <span className="dz-upload" data-dz-uploadprogress />
            </div>
            {/* <div className="dz-error-message">
              <span data-dz-errormessage />
            </div> */}
          </div>
        </div>
        <a href="#/" className="remove" data-dz-remove>
          {' '}
          <i className="glyph-icon simple-icon-trash" />{' '}
        </a>
      </div>
    ),
    headers: { 'My-Awesome-Header': 'header value' },
  };

  useEffect(() => {
    setSelectedAnswer('');
  }, [currentQuestion]);

  const createNotification = (type, className, msg, title) => {
    const cName = className || '';
    switch (type) {
      case 'primary':
        NotificationManager.primary(
          'This is a notification!',
          'Primary Notification',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'secondary':
        NotificationManager.secondary(
          'This is a notification!',
          'Secondary Notification',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'info':
        NotificationManager.info('Info message', '', 3000, null, null, cName);
        break;
      case 'success':
        NotificationManager.success(msg, title, 3000, null, null, cName);
        break;
      case 'warning':
        NotificationManager.warning(
          'Warning message',
          'Close after 3000ms',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'error':
        NotificationManager.error(
          msg,
          title,
          5000,
          () => {
            alert('callback');
          },
          null,
          cName
        );
        break;
      default:
        NotificationManager.info('Info message');
        break;
    }
  };

  const getAssignment = (id) => {
    axios
      .get(`/assignments/getPerticularAssignment?id=${id}`)
      .then((res) => {
        setPerticularAssignment(res.data.aiss);
        setQuestions(res.data.aiss.questions);
        setCurrentQuestion(res.data.aiss.questions[0]);
      })
      .catch((e) => {
        console.log('error while getAllAssignmentStudent client ', e);
      });
  };

  useEffect(() => {
    getAssignment(location.state.id);
  }, []);

  const handleCustomSubmit = async (evt) => {
    evt.preventDefault();

    if (selectedType.value === 'MCQ') {
      if (selectedLevel === '') {
        createNotification(
          'error',
          'filled',
          'Please select a difficulty level!',
          'Error'
        );
        return;
      }
      if (
        !option1Correct &&
        !option2Correct &&
        !option3Correct &&
        !option4Correct
      ) {
        createNotification(
          'error',
          'filled',
          'Correct option not found!',
          'Error'
        );
        return;
      }

      const data = {
        assignId: perticularAssignment._id,
        assignName: perticularAssignment.assignmentName,
        question: evt.target.elements.question.value,
        img: img.dataURL,
        type: selectedType.value,
        level: selectedLevel.value,
        option1: {
          option: evt.target.elements.option1.value,
          correct: option1Correct ? true : false,
        },
        option2: {
          option: evt.target.elements.option2.value,
          correct: option2Correct ? true : false,
        },
        option3: {
          option: evt.target.elements.option3.value,
          correct: option3Correct ? true : false,
        },
        option4: {
          option: evt.target.elements.option4.value,
          correct: option4Correct ? true : false,
        },
      };
      try {
        const res = await axios.post(
          '/assignments/addAssignmentQuestion',
          data
        );
        if (res.status === 200) {
          createNotification(
            'success',
            'filled',
            'Question added successfully',
            'Saved'
          );

          const newQuestion = {
            assignId: perticularAssignment._id,
            assignName: perticularAssignment.assignmentName,
            question: evt.target.question.value,
            imgUrl: '',
            type: 'MCQ',
            level: selectedLevel.value,
            option1: {
              correct: option1Correct ? true : false,
              option: evt.target.elements.option1.value,
            },
            option2: {
              correct: option2Correct ? true : false,
              option: evt.target.elements.option2.value,
            },
            option3: {
              correct: option3Correct ? true : false,
              option: evt.target.elements.option3.value,
            },
            option4: {
              correct: option4Correct ? true : false,
              option: evt.target.elements.option4.value,
            },
          };

          const temp = questions;
          temp.push(newQuestion);
          setQuestions(temp);

          setOption1Correct(false);
          setOption2Correct(false);
          setOption3Correct(false);
          setOption4Correct(false);

          document.getElementsByName('question')[0].value = '';
          document.getElementsByName('option1')[0].value = '';
          document.getElementsByName('option2')[0].value = '';
          document.getElementsByName('option3')[0].value = '';
          document.getElementsByName('option4')[0].value = '';
          setImg('');
          setSelectedLevel('');

          document.getElementsByName('option1Correct')[0].checked = false;
          document.getElementsByName('option2Correct')[0].checked = false;
          document.getElementsByName('option3Correct')[0].checked = false;
          document.getElementsByName('option4Correct')[0].checked = false;
        }
      } catch (err) {
        createNotification(
          'error',
          'filled',
          'Something went wrong! Please try again.',
          'Error'
        );
      }
    }

    if (selectedType.value === 'Fill in the blanks') {
      if (selectedLevel === '') {
        createNotification(
          'error',
          'filled',
          'Please select a difficulty level!',
          'Error'
        );
        return;
      }
      const count = (evt.target.elements.statement.value.match(/#/g) || [])
        .length;
      if (count % 2 !== 0) {
        createNotification(
          'error',
          'filled',
          "It seems you haven't inserted the placeholders properly. There should be an even number of placeholders.",
          'Error'
        );
        return;
      }
      if (count === 0) {
        createNotification(
          'error',
          'filled',
          "It seems you haven't inserted the placeholders",
          'Error'
        );

        return;
      }
      const res = await axios.post('/assignments/addAssignmentQuestion', {
        assignId: perticularAssignment._id,
        assignName: perticularAssignment.assignmentName,
        statement: evt.target.elements.statement.value,
        type: selectedType.value,
        level: selectedLevel.value,
      });
      if (res.status === 200) {
        createNotification(
          'success',
          'filled',
          'Question added successfully',
          'Saved'
        );

        const newQuestion = {
          assignId: perticularAssignment._id,
          assignName: perticularAssignment.assignmentName,
          statement: evt.target.elements.statement.value,
          type: selectedType.value,
          level: selectedLevel.value,
        };

        const temp = questions;
        temp.push(newQuestion);
        setQuestions(temp);

        document.getElementsByName('statement')[0].value = '';
        setSelectedLevel('');
      }
    }

    // if (questionType === "Rearrange") {
    //   let data = {
    //     assignId: perticularAssignment._id,
    //     assignName: perticularAssignment.assignmentName,
    //     statement: evt.target.elements.statement.value,
    //     type: questionType,
    //     level: level,
    //     item1: evt.target.elements.item1.value,
    //     item2: evt.target.elements.item2.value,
    //     item3: evt.target.elements.item3.value,
    //     item4: evt.target.elements.item4.value,
    //   };

    //   try {
    //     let res = await axios.post("/assignments/addAssignmentQuestion", data);
    //     if (res.status === 200) {
    //       swal("Question added successfully!", "", "success");
    //     }
    //   } catch (err) {
    //     swal("Something went wrong!", err.message, "error");
    //   }
    // }
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
    console.log(temp);

    const arr = reactStringReplace(
      currentQuestion.statement,
      /#/gi,
      (match, idx) => (
        <Input id={`input${idx}`} type="text" className="d-inline mx-2 blank" />
      )
    );

    return arr;
  };

  const checkAnswer = () => {
    if (currentQuestion.type === 'MCQ') {
      if (!selectedAnswer) {
        createNotification('warning', 'filled', 'Please select an option!');
        return;
      }
      if (currentQuestion[`option${selectedAnswer}`].correct) {
        createNotification('success', 'filled', 'Correct answer!');
      } else {
        createNotification('error', 'filled', 'Wrong answer!');
      }
    }

    if (currentQuestion.type === 'Fill in the blanks') {
      const answers = [];
      const blanks = document.querySelectorAll('.blank');

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

      for (let i = 0; i < temp.length; i += 1) {
        answers.push(blanks[i].value);
      }

      for (let i = 0; i < temp.length; i += 1) {
        if (temp[i].toLowerCase() !== answers[i].toLowerCase()) {
          createNotification(
            'error',
            'filled',
            'Please check your answer again.'
          );
          return;
        }
      }
      createNotification('success', 'filled', 'Correct Answer!');
    }
  };

  const next = () => {
    if (questionNumber + 1 < questions.length) {
      setCurrentQuestion(questions[questionNumber + 1]);
      setQuestionNumber(questionNumber + 1);
    }
  };

  const previous = () => {
    if (questionNumber > 0) {
      setCurrentQuestion(questions[questionNumber - 1]);
      setQuestionNumber(questionNumber - 1);
    }
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h1>Preview</h1>
            <Button
              onClick={() => setModalRight(!modalRight)}
              outline
              color="primary"
              className="mb-2"
            >
              <div className="glyph-icon simple-icon-info" />
            </Button>
          </div>

          <Nav tabs className="separator-tabs ml-0 mb-5">
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'View',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('View')}
              >
                <IntlMessages id="VIEW" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'Add questions',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('Add questions')}
              >
                <IntlMessages id="ADD QUESTIONS" />
              </NavLink>
            </NavItem>
          </Nav>
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12">
          {activeTab === 'View' ? (
            <Card>
              <CardBody>
                <div style={{ textAlign: 'center' }} className="">
                  {questions.length ? (
                    <div className="">
                      <LinearProgress
                        variant="determinate"
                        value={(questionNumber / (questions.length - 1)) * 100}
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
                        QUESTION {questionNumber + 1}/{questions.length}
                      </h6>

                      <div id="question-box" />

                      {currentQuestion.type === 'MCQ' ? (
                        <div>
                          {currentQuestion.img ? (
                            <img
                              className="mt-1 mb-1"
                              alt="img"
                              style={{
                                height: '250px',
                                padding: '5px',
                                border: '1px solid #eee',
                                borderRadius: '8px',
                              }}
                              src={currentQuestion.img}
                            />
                          ) : null}
                          <h2 className="mt-4">{currentQuestion.question}</h2>

                          <div
                            style={{ marginLeft: 'auto', marginRight: 'auto' }}
                            className="mx-5 d-flex flex-wrap w-100 text-align-center"
                          >
                            {selectedAnswer === 1 ? (
                              <Button
                                onClick={() => setSelectedAnswer(1)}
                                color="info"
                                className="w-40 mt-3 mx-3 py-2"
                              >
                                {currentQuestion.option1.option}
                              </Button>
                            ) : (
                              <Button
                                onClick={() => setSelectedAnswer(1)}
                                outline
                                color="info"
                                className="w-40 mt-3 mx-3 py-2"
                              >
                                {currentQuestion.option1.option}
                              </Button>
                            )}

                            {selectedAnswer === 2 ? (
                              <Button
                                onClick={() => setSelectedAnswer(2)}
                                color="info"
                                className="w-40 mt-3 mx-3 py-2"
                              >
                                {currentQuestion.option2.option}
                              </Button>
                            ) : (
                              <Button
                                onClick={() => setSelectedAnswer(2)}
                                outline
                                color="info"
                                className="w-40 mt-3 mx-3 py-2"
                              >
                                {currentQuestion.option2.option}
                              </Button>
                            )}

                            {selectedAnswer === 3 ? (
                              <Button
                                onClick={() => setSelectedAnswer(3)}
                                color="info"
                                className="w-40 mt-3 mx-3 py-2"
                              >
                                {currentQuestion.option3.option}
                              </Button>
                            ) : (
                              <Button
                                onClick={() => setSelectedAnswer(3)}
                                outline
                                color="info"
                                className="w-40 mt-3 mx-3 py-2"
                              >
                                {currentQuestion.option3.option}
                              </Button>
                            )}

                            {selectedAnswer === 4 ? (
                              <Button
                                onClick={() => setSelectedAnswer(4)}
                                color="info"
                                className="w-40 mt-3 mx-3 py-2"
                              >
                                {currentQuestion.option4.option}
                              </Button>
                            ) : (
                              <Button
                                onClick={() => setSelectedAnswer(4)}
                                outline
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
                            <h2 key={i}>{item}</h2>
                          ))}
                        </div>
                      ) : null}

                      <div className="d-flex justify-content-around align-items-center mt-4">
                        <Button outline color="dark" onClick={() => previous()}>
                          <div className="glyph-icon simple-icon-arrow-left" />
                        </Button>
                        <Button
                          color="primary"
                          onClick={checkAnswer}
                          className="mt-3"
                        >
                          Check
                        </Button>
                        <Button outline color="dark" onClick={() => next()}>
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
                        className="mb-1"
                      />
                      <h3 className="mt-4">No questions added yet!</h3>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          ) : (
            <Row>
              <Colxx xxs="12" lg="9">
                <Card>
                  <CardBody>
                    <div className="d-flex justify-content-end align-items-start">
                      <Label for="switch">
                        <h6 className="mx-3">
                          <IntlMessages id="Automatic questions" />
                        </h6>
                      </Label>
                      <Switch
                        className="custom-switch custom-switch-primary custom-switch-small"
                        checked={auto}
                        onChange={() => setAuto(!auto)}
                      />
                    </div>
                    {auto ? (
                      <h3>Automatic questions</h3>
                    ) : (
                      <div className="mt-4">
                        <FormGroup row>
                          <Label for="type" sm={2}>
                            <IntlMessages id="Question type" />
                          </Label>
                          <Colxx sm={10}>
                            <Select
                              components={{ Input: CustomSelectInput }}
                              className="react-select"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              value={selectedType}
                              onChange={setSelectedType}
                              options={selectData}
                            />
                          </Colxx>
                        </FormGroup>

                        {selectedType.value === 'MCQ' ? (
                          <Form
                            onSubmit={handleCustomSubmit}
                            encType="multipart/form-data"
                            className="mt-3"
                          >
                            <FormGroup row>
                              <Label for="question" sm={2}>
                                <IntlMessages id="Question" />
                              </Label>
                              <Colxx sm={10}>
                                <Input
                                  type="text"
                                  name="question"
                                  id="question"
                                  placeholder=""
                                  required
                                />
                              </Colxx>
                            </FormGroup>

                            <FormGroup>
                              <FormGroup row>
                                <Label for="option1" sm={2} className="pt-0">
                                  <IntlMessages id="Option 1" />
                                </Label>
                                <Colxx sm={6}>
                                  <Input
                                    required
                                    type="text"
                                    name="option1"
                                    id="option1"
                                    placeholder=""
                                  />
                                </Colxx>
                                <Colxx sm={4}>
                                  <Label check>
                                    <Input
                                      onChange={() => setOption1Correct(true)}
                                      type="radio"
                                      name="option1Correct"
                                    />
                                    <IntlMessages id="Correct ?" />
                                  </Label>
                                </Colxx>
                              </FormGroup>

                              <FormGroup row>
                                <Label for="option2" sm={2} className="pt-0">
                                  <IntlMessages id="Option 2" />
                                </Label>
                                <Colxx sm={6}>
                                  <Input
                                    required
                                    type="text"
                                    name="option2"
                                    id="option2"
                                    placeholder=""
                                  />
                                </Colxx>
                                <Colxx sm={4}>
                                  <Label check>
                                    <Input
                                      onChange={() => setOption2Correct(true)}
                                      type="radio"
                                      name="option2Correct"
                                    />
                                    <IntlMessages id="Correct ?" />
                                  </Label>
                                </Colxx>
                              </FormGroup>

                              <FormGroup row>
                                <Label for="option3" sm={2} className="pt-0">
                                  <IntlMessages id="Option 3" />
                                </Label>
                                <Colxx sm={6}>
                                  <Input
                                    required
                                    type="text"
                                    name="option3"
                                    id="option3"
                                    placeholder=""
                                  />
                                </Colxx>
                                <Colxx sm={4}>
                                  <Label check>
                                    <Input
                                      onChange={() => setOption3Correct(true)}
                                      type="radio"
                                      name="option3Correct"
                                    />
                                    <IntlMessages id="Correct ?" />
                                  </Label>
                                </Colxx>
                              </FormGroup>

                              <FormGroup row>
                                <Label for="option4" sm={2} className="pt-0">
                                  <IntlMessages id="Option 4" />
                                </Label>
                                <Colxx sm={6}>
                                  <Input
                                    required
                                    type="text"
                                    name="option4"
                                    id="option4"
                                    placeholder=""
                                  />
                                </Colxx>
                                <Colxx sm={4}>
                                  <Label check>
                                    <Input
                                      onChange={() => setOption4Correct(true)}
                                      type="radio"
                                      name="option4Correct"
                                    />
                                    <IntlMessages id="Correct ?" />
                                  </Label>
                                </Colxx>
                              </FormGroup>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="image" sm={2} className="pt-0">
                                <IntlMessages id="Question image" />
                              </Label>
                              <Colxx sm={6}>
                                <DropzoneComponent
                                  config={dropzoneComponentConfig}
                                  djsConfig={dropzoneConfig}
                                  eventHandlers={{
                                    addedfile: (file) => {
                                      setImg(file);
                                    },
                                  }}
                                />
                              </Colxx>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="level" sm={2} className="pt-0">
                                <IntlMessages id="Level" />
                              </Label>
                              <Colxx sm={6}>
                                <Select
                                  components={{ Input: CustomSelectInput }}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  name="form-field-name"
                                  value={selectedLevel}
                                  onChange={setSelectedLevel}
                                  options={levelData}
                                />
                              </Colxx>
                            </FormGroup>

                            <div className="w-100 d-flex justify-content-center">
                              <Button
                                type="submit"
                                className="mt-4"
                                color="primary"
                              >
                                <IntlMessages id="Save" />
                              </Button>
                            </div>
                          </Form>
                        ) : null}

                        {selectedType.value === 'Fill in the blanks' ? (
                          <Form onSubmit={handleCustomSubmit}>
                            <FormGroup row>
                              <Label for="statement" sm={2} className="pt-0">
                                <IntlMessages id="Statement" />
                              </Label>
                              <Colxx sm={10}>
                                <Input
                                  id="statement"
                                  name="statement"
                                  type="text"
                                  placeholder="Ex. #Mitochondria# is the powerhouse of the cell"
                                />
                                <Alert color="info" className="rounded mt-4">
                                  <IntlMessages id="Enclose the words within #...# which you want to be replaced with a blank." />
                                </Alert>
                              </Colxx>

                              <Label for="level" sm={2} className="pt-0">
                                <IntlMessages id="Level" />
                              </Label>
                              <Colxx sm={6}>
                                <Select
                                  components={{ Input: CustomSelectInput }}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  name="form-field-name"
                                  value={selectedLevel}
                                  onChange={setSelectedLevel}
                                  options={levelData}
                                />
                              </Colxx>

                              <div className="w-100 d-flex justify-content-center">
                                <Button
                                  type="submit"
                                  className="mt-4"
                                  color="primary"
                                >
                                  <IntlMessages id="Save" />
                                </Button>
                              </div>
                            </FormGroup>
                          </Form>
                        ) : null}

                        {selectedType.value === 'Rearrange' ? (
                          <div>
                            <FormGroup row>
                              <Label for="statement" sm={2} className="pt-0">
                                <IntlMessages id="Statement" />
                              </Label>
                              <Colxx sm={10}>
                                <Input
                                  id="statement"
                                  type="text"
                                  name="statement"
                                />
                              </Colxx>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="item1" sm={2} className="pt-0">
                                <IntlMessages id="Item 1" />
                              </Label>
                              <Colxx sm={6}>
                                <Input id="item1" type="text" name="item1" />
                              </Colxx>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="item2" sm={2} className="pt-0">
                                <IntlMessages id="Item 2" />
                              </Label>
                              <Colxx sm={6}>
                                <Input id="item2" type="text" name="item2" />
                              </Colxx>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="item3" sm={2} className="pt-0">
                                <IntlMessages id="Item 3" />
                              </Label>
                              <Colxx sm={6}>
                                <Input id="item3" type="text" name="item3" />
                              </Colxx>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="item4" sm={2} className="pt-0">
                                <IntlMessages id="Item 4" />
                              </Label>
                              <Colxx sm={6}>
                                <Input id="item4" type="text" name="item4" />
                              </Colxx>
                            </FormGroup>

                            <FormGroup row>
                              <Colxx sm={10}>
                                <Alert color="info" className="rounded mt-4">
                                  <IntlMessages id="Enter the items in correct order. Students' responses will be compared to the order you enter." />
                                </Alert>
                              </Colxx>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="level" sm={2} className="pt-0">
                                <IntlMessages id="Level" />
                              </Label>
                              <Colxx sm={6}>
                                <Select
                                  components={{ Input: CustomSelectInput }}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  name="form-field-name"
                                  value={selectedLevel}
                                  onChange={setSelectedLevel}
                                  options={levelData}
                                />
                              </Colxx>
                            </FormGroup>

                            <div className="w-100 d-flex justify-content-center">
                              <Button
                                type="submit"
                                className="mt-4"
                                color="primary"
                              >
                                <IntlMessages id="Save" />
                              </Button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </CardBody>
                </Card>
              </Colxx>
              <Colxx xxs="12" lg="3">
                <Row>
                  <Colxx xxs="12">
                    <Row className="icon-cards-row mb-2">
                      <Colxx xxs="12">
                        <IconCard
                          icon="simple-icon-question"
                          title="Questions"
                          value={perticularAssignment.questions.length}
                          className="mb-4"
                        />
                        <IconCard
                          icon="iconsminds-timer"
                          title="Time limit"
                          value={
                            perticularAssignment.mins ||
                            perticularAssignment.sec
                              ? `${perticularAssignment.mins} mins ${perticularAssignment.sec} sec`
                              : 'N/A'
                          }
                          className="mb-4"
                        />
                      </Colxx>
                    </Row>
                  </Colxx>
                </Row>
              </Colxx>
            </Row>
          )}
        </Colxx>

        <Modal
          isOpen={modalRight}
          toggle={() => setModalRight(!modalRight)}
          wrapClassName="modal-right"
        >
          <ModalHeader>Preview & Adding questions</ModalHeader>
          <ModalBody>
            <h6 style={{ fontWeight: 'bold' }}>Previewing</h6>
            <p>
              Under the &quot;Preview&quot; section you can have a look at how
              your assignment will be viewed by your students.
            </p>
            <p>
              You will be having an additional &quot;Check&quot; button to see
              if your questions are working fine.
            </p>
            <p>
              To delete a question just click on the trash icon on the upper
              right corner.
            </p>

            <h6 style={{ fontWeight: 'bold' }}>Adding questions</h6>
            <p>
              There are 3 types of custom questions you can add - MCQ, Fill in
              the blanks & Rearrange.
            </p>
            <p>
              &quot;MCQ&quot; questions require you to input a question and 4
              options with only one correct answer.
            </p>
            <p>
              In &quot;Fill in the blank&quot; type questions, students will be
              required to type in their answers in an input box. The input boxes
              will be placed where you insert the placeholders (#).
            </p>
            <p>
              Rearrange type of questions require students to drag and drop
              items in their correct order. You must enter the items in correct
              order as it will be compared to your students&apos; responses.
            </p>
            <p>
              Additionally, you could also opt for adding automatic questions by
              toggling the Automatic Questions switch. In that case you can
              choose a chapter and number of questions and pre-existing
              questions from our database willbe assigned.
            </p>
          </ModalBody>
        </Modal>
      </Row>
    </>
  );
};

export default Preview;
