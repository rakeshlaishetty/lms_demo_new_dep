/* eslint no-underscore-dangle: 0 */
/* eslint-disable react/no-array-index-key */
/* eslint no-nested-ternary: 0 */
import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  CardText,
  CardSubtitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import CustomSelectInput from 'components/common/CustomSelectInput';
import Select from 'react-select';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { NotificationManager } from 'components/common/react-notifications';
import ThumbnailLetters from 'components/cards/ThumbnailLetters';
import axios from 'axios';

const ClassSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [modalBasic, setModalBasic] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [teachersData, setTeachersData] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

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
        NotificationManager.success(
          msg,
          'Success',
          3000,
          null,
          null,
          cName
        );
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

  useEffect(() => {
    if (teachers.length) {
      const temp = [];
      for (let i = 0; i < teachers.length; i += 1) {
        temp.push({ label: teachers[i].name, value: teachers[i]._id, key: i });
      }
      setTeachersData(temp);
    }
  }, [teachers]);

  const getTeachers = async () => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));
    const res = await axios.get(`/getTeachers?schoolId=${adm.schoolId}`);
    if (res.status === 200) {
      setTeachers(res.data);
    }
  };

  const getSubjects = async () => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));
    const classDetails = JSON.parse(
      window.localStorage.getItem('classDetails')
    );
    const res = await axios.get(
      `/getClassSubjects?schoolId=${adm.schoolId}&classId=${classDetails._id}`
    );
    if (res.status === 200) {
      setSubjects(res.data);
    }
  };

  useEffect(() => {
    getSubjects();
    getTeachers();
  }, []);

  const handleEdit = (subjectId) => {
    setSelectedSubject(subjectId);
    setModalBasic(true);
  };

  const handleSubmit = async () => {
    const classDetails = JSON.parse(
        window.localStorage.getItem('classDetails')
      );
    const data = {
        facultyId: selectedTeacher.value,
        subjectId: selectedSubject,
        classId: classDetails._id,
      };
      const res = await axios.post("/assignFaculty", data);
      if (res.status === 200) {
        const temp = subjects;
        const elementIndex = temp.findIndex((obj => obj.subject._id === selectedSubject));
        temp[elementIndex].faculty.name = selectedTeacher.label;
        temp[elementIndex].faculty._id = selectedTeacher.value;
        setSubjects(temp);
        setModalBasic(false)
        createNotification('success', 'filled', 'Faculty updated successfully!')
      } else {
        setModalBasic(false)
        createNotification('error', 'filled', 'Something went wrong, please try again.')
      }
  }


  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Class Subjects</h1>
        </Colxx>
      </Row>
      <Separator className="mb-5" />
      {subjects.length ? (
        <Row>
          <Colxx xxs="12">
            <div className="d-flex flex-row justify-content-start align-items-center flex-wrap">
              {subjects.map((item, index) => (
                <Card key={index} className="d-flex flex-row mb-4 mx-4">
                  <ThumbnailLetters
                    rounded
                    text={item.subject.name}
                    className="m-4"
                  />
                  <div className=" d-flex flex-grow-1 min-width-zero">
                    <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                      <div className="min-width-zero">
                        <CardSubtitle className="truncate mb-1">
                          {item.subject.name}
                        </CardSubtitle>
                        <CardText className="text-muted text-small mb-2">
                          {item.faculty !== null ? (
                            item.faculty.name
                          ) : (
                            <span className="text-danger">Not Assigned</span>
                          )}
                        </CardText>
                        <Button
                          onClick={() => handleEdit(item.subject._id)}
                          outline
                          size="xs"
                          color="primary"
                        >
                          Edit
                        </Button>
                      </div>
                    </CardBody>

                    <Modal
                      isOpen={modalBasic}
                      toggle={() => setModalBasic(!modalBasic)}
                    >
                      <ModalHeader>
                        <IntlMessages id="Assign faculty" />
                      </ModalHeader>
                      <ModalBody>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select mb-2"
                          classNamePrefix="react-select"
                          name="teacher"
                          value={selectedTeacher}
                          onChange={setSelectedTeacher}
                          options={teachersData}
                          placeholder="Select Faculty..."
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="primary"
                          onClick={() => handleSubmit()}
                        >
                          Assign
                        </Button>{' '}
                        <Button
                          color="secondary"
                          onClick={() => setModalBasic(false)}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                </Card>
              ))}
            </div>
          </Colxx>
        </Row>
      ) : null}
    </>
  );
};

export default ClassSubjects;
