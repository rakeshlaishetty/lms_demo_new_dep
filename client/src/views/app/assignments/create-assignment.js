/* eslint no-underscore-dangle: 0 */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import {
  Form,
  Label,
  Row,
  FormGroup,
  Input,
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import { NotificationManager } from 'components/common/react-notifications';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
import IntlMessages from 'helpers/IntlMessages';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const Create = () => {
  const [classes, setClasses] = useState([]);
  const [classesData, setClassesData] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [deadline, setDeadline] = useState('');
  const [time, setTime] = useState(false);
  const [mins, setMins] = useState(0);
  const [sec, setSec] = useState(0);
  const [modalRight, setModalRight] = useState(false);

  const createNotification = (type, className, msg) => {
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
        NotificationManager.success(msg, 'Success', 5000, null, null, cName);
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
          'Error',
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

  const getClasses = async () => {
    const teacher = JSON.parse(window.localStorage.getItem('userdata'));
    const res = await axios.get(
      `/classes/getClasses?schoolId=${teacher.schoolId}`
    );
    if (res.status === 200) {
      setClasses(res.data);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  useEffect(() => {
    if (classes.length) {
      const temp = [];
      for (let i = 0; i < classes.length; i += 1) {
        temp.push({
          label: `${classes[i].class} ${classes[i].division}`,
          value: classes[i]._id,
          key: i,
        });
      }
      setClassesData(temp);
    }
  }, [classes]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const teacher = JSON.parse(window.localStorage.getItem('userdata'));

    let subjectId = null;
    for (let x = 0; x < classes.length; x += 1) {
      if (classes[x]._id === evt.target.elements.class.value) {
        if (!classes[x].subjects.length) {
          createNotification(
            'error',
            'filled',
            'The chosen class does not seem to have been assigned any subjects. Please contact the administrator to assign subjects'
          );
          return;
        }
        for (let i = 0; i < classes[x].subjects.length; i += 1) {
          if (classes[x].subjects[i].faculty === teacher._id) {
            subjectId = classes[x].subjects[i].subjectId;
          }
        }
      }
    }

    if (!subjectId) {
      createNotification(
        'error',
        'filled',
        'You do not seem to be teaching any subject to the chosen class. Please ensure you have selected the right class and division'
      );
      return;
    }

    const res = await axios.post('/assignments/createAssignment', {
      facultyId: teacher._id,
      name: evt.target.elements.name.value,
      class: selectedClass.value,
      deadline: deadline,
      subjectId: subjectId,
      mins: mins,
      sec: sec,
    });
    if (res.status === 200) {
      createNotification(
        'success',
        'filled',
        'Assignment created! Make sure you assign questions to this assignment'
      );
    }
  };

  return (
    <>
      <Row>
        <Colxx sm="12">
          <div className="d-flex justify-content-between align-items-center">
            <h1>Create Assignment</h1>
            <Button
              onClick={() => setModalRight(!modalRight)}
              outline
              color="primary"
              className="mb-2"
            >
              <div className="glyph-icon simple-icon-info" />
            </Button>
          </div>
        </Colxx>
      </Row>
      <Separator className="mb-5" />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Colxx xxs="12" lg="9">
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <CardTitle>Assignment details</CardTitle>
                </div>

                <FormGroup>
                  <Label for="name">
                    <IntlMessages id="Assignment Name" />
                  </Label>
                  <Input
                    required
                    type="text"
                    name="assignmentName"
                    id="name"
                    placeholder="Ex. Nervous System"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="class">
                    <IntlMessages id="Class" />
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="class"
                    value={selectedClass}
                    onChange={(val) => setSelectedClass(val)}
                    options={classesData}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="comment">
                    <IntlMessages id="Comments (optional)" />
                  </Label>
                  <Input type="textarea" name="comment" id="comment" />
                </FormGroup>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="12" lg="3">
            <Card>
              <CardBody>
                <CardTitle>Configurations</CardTitle>
                <FormGroup>
                  <Label for="deadline">Deadline</Label>
                  <DatePicker
                    required
                    selected={deadline}
                    onChange={setDeadline}
                    placeholder="Select date"
                  />
                </FormGroup>
                <FormGroup>
                  <div className="w-100 d-flex mt-4">
                    <Label for="timmer" className="mr-3">
                      Time limit
                    </Label>
                    <Switch
                      id="timer"
                      className="custom-switch custom-switch-primary custom-switch-small"
                      checked={time}
                      onChange={() => setTime(!time)}
                    />
                  </div>
                  {time ? (
                    <div className="d-flex justify-content-start">
                      <Colxx xxs="6">
                        <Input
                          onChange={(evt) => setMins(evt.target.value)}
                          type="number"
                          name="mins"
                          placeholder="Mins"
                        />
                      </Colxx>
                      <Colxx xxs="6">
                        <Input
                          onChange={(evt) => setSec(evt.target.value)}
                          type="number"
                          name="sec"
                          placeholder="Sec"
                        />
                      </Colxx>
                    </div>
                  ) : null}
                </FormGroup>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        <div className="w-100 d-flex justify-content-center mt-4">
          <Button type="submit">Create</Button>
        </div>
      </Form>

      <Modal
        isOpen={modalRight}
        toggle={() => setModalRight(!modalRight)}
        wrapClassName="modal-right"
      >
        <ModalHeader>Creating an assignment</ModalHeader>
        <ModalBody>
          <p>Teachers can create assignments for their students to solve.</p>
          <p>
            To create an assignment you have to follow 2 simple steps. First,
            fill up all the details like assignment name, corresponding subject
            etc.
          </p>
          <p>
            You can also set the deadline from the datepicker and set a time
            limit by toggling the time limit switch.
          </p>
          <p>
            Once all details are filled click on the &quot;Create&quot; button
            to create your assignment.
          </p>
          <p>
            You will then be redirected to the &quot;Your assignments&quot; page
            where you can view all your created assignments. You then have to
            click on the &quot;Assign questions&quot; button to start adding
            questions.
          </p>
          <p>
            Make sure you don&apos;t skip the second step. If you do so, your
            students will not be able to see any questions.
          </p>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Create;
