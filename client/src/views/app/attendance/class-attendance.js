/* eslint no-underscore-dangle: 0 */
/* eslint-disable react/no-array-index-key */
/* eslint no-nested-ternary: 0 */
/* eslint no-unneeded-ternary: 0 */
/* eslint camelcase: 0 */

import React, { useState, useEffect } from 'react';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Button,
  NavLink,
  Nav,
  NavItem,
  Form,
  Table,
  CustomInput,
} from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import { NotificationManager } from 'components/common/react-notifications';
import IntlMessages from 'helpers/IntlMessages';
import { LineChart } from 'components/charts';
import { ThemeColors } from 'helpers/ThemeColors';
import IconCard from 'components/cards/IconCard';
import classnames from 'classnames';
import axios from 'axios';

import checkmark from '../../../assets/img/checkmark.png';

const ClassAttendance = () => {
  const [activeTab, setActiveTab] = useState('Submit');
  const [className, setClassName] = useState('');
  const [students, setStudents] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [absentToday, setAbsentToday] = useState(0);
  const [attendanceOfWeek, setAttendanceOfWeek] = useState([]);
  //   const [attendance, setAttendance] = useState([]);
  const [average, setAverage] = useState('');
  //   const [total, setTotal] = useState(0);
  //   const [date, setDate] = useState(new Date());
  //   const [selectDate, setSelectedDate] = useState('');
  const colors = ThemeColors();

  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: '',
        data: attendanceOfWeek,
        borderColor: colors.themeColor1,
        pointBackgroundColor: colors.foregroundColor,
        pointBorderColor: colors.themeColor1,
        pointHoverBackgroundColor: colors.themeColor1,
        pointHoverBorderColor: colors.foregroundColor,
        pointRadius: 6,
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        fill: false,
      },
    ],
  };

  const createNotification = (type, class_name, msg, title) => {
    const cName = class_name || '';
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

  const getClassName = () => {
    const classroom = JSON.parse(window.localStorage.getItem('classDetails'));
    setClassName(`${classroom.class}-${classroom.division}`);
  };

  const getStudents = async () => {
    const classroom = JSON.parse(window.localStorage.getItem('classDetails'));
    const res = await axios.get(`/getStudentsList?classId=${classroom._id}`);
    if (res.status === 200) {
      setStudents(res.data);
    }
  };

  const checkSubmitted = async () => {
    const classroom = JSON.parse(window.localStorage.getItem('classDetails'));
    const res = await axios.get(
      `/attendance/checkStudentAttendanceSubmitted?classId=${classroom._id}`
    );
    if (res.status === 200 && res.data.submitted) {
      setSubmitted(true);
      setAbsentToday(res.data.absent);
    }
  };

  const getAttendanceOfWeek = async () => {
    const classroom = JSON.parse(window.localStorage.getItem('classDetails'));
    const res = await axios.get(
      `/attendance/getAttendanceOfWeek?classId=${classroom._id}`
    );
    if (res.status === 200) {
      const temp = [];
      let avg = 0;
      let days = 0;
      for (let i = 0; i < res.data.length; i += 1) {
        if (res.data[i].value != null) {
          temp.push(res.data[i].value);
          avg += res.data[i].value;
          days += 1;
        } else {
          temp.push(0);
        }
      }
      avg /= days;
      setAverage(avg);
      setAttendanceOfWeek(temp);
    }
  };

  useEffect(() => {
    getClassName();
    checkSubmitted();
    getStudents();
  }, []);

  useEffect(() => {
    if (activeTab === 'Reports') {
      getAttendanceOfWeek();
    }
  }, [activeTab]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const absent = document.getElementsByName('absent');
    const absentStudents = [];
    for (let i = 0; i < absent.length; i += 1) {
      if (!absent[i].checked) {
        absentStudents.push(absent[i].value);
      }
    }

    const classroom = JSON.parse(window.localStorage.getItem('classDetails'));

    const data = {
      classId: classroom._id,
      absent: absentStudents,
    };
    const res = await axios.post('/attendance/markStudentAttendance', data);
    if (res.status === 200) {
      createNotification(
        'success',
        'filled',
        'Attendance submitted successfully.',
        'Success'
      );
      setSubmitted(true);
    }
  };

  // const handleFetch = async (evt) => {
  //   evt.preventDefault();
  //   const classroom = JSON.parse(window.localStorage.getItem('classDetails'));

  //   const res = await axios.get(
  //     `/attendance/getAttendance?classId=${classroom._id}&date=${selectedDate}`
  //   );
  //   if (res.status === 200) {
  //     setAttendance(res.data.data);
  //     setAverage(res.data.average);
  //     setTotal(res.data.total);
  //   }
  // };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>Class Attendance</h1>
          </div>

          <Nav tabs className="separator-tabs ml-0 mb-5">
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'Submit',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('Submit')}
              >
                <IntlMessages id="SUBMIT" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'Reports',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('Reports')}
              >
                <IntlMessages id="REPORTS" />
              </NavLink>
            </NavItem>
          </Nav>
        </Colxx>
      </Row>

      {activeTab === 'Submit' ? (
        <Row>
          <Colxx xxs="12">
            <Card>
              <CardBody>
                {submitted ? (
                  <div className="px-5 mt-4 d-flex flex-column justify-content-center align-items-center">
                    <img
                      alt="submitted"
                      style={{ height: '80px' }}
                      src={checkmark}
                    />
                    <br />
                    <h5 className="mt-3 mb-3 text-muted">
                      You have submitted the attendance for today
                    </h5>
                  </div>
                ) : (
                  <Form onSubmit={handleSubmit}>
                    <CardTitle>
                      <IntlMessages id={`Attendance for class ${className}`} />
                    </CardTitle>

                    <Table className="mt-3" striped>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Present</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>
                              <CustomInput type="checkbox" defaultChecked />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>

                    <div className="mt-4 w-100 d-flex justify-content-center align-items-center">
                      <Button type="submit">Submit</Button>
                    </div>
                  </Form>
                )}
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      ) : null}

      {activeTab === 'Reports' ? (
        <div>
          <Row>
            <Colxx xxs="12" lg="8">
              <Card>
                <CardBody>
                  <CardTitle>
                    <IntlMessages id="Week wise attendance" />
                  </CardTitle>
                  <LineChart shadow data={lineChartData} />
                </CardBody>
              </Card>
            </Colxx>
            <Colxx xxs="12" lg="4">
              <div className="icon-cards-row">
                <IconCard
                  icon="iconsminds-student-hat"
                  title="Average week attendance"
                  value={average}
                  className="mb-4"
                />
                <IconCard
                  icon="
            iconsminds-male-female"
                  title="Absent today"
                  value={absentToday !== '' ? absentToday : 'N/A'}
                  className="mb-4"
                />
              </div>
            </Colxx>
          </Row>
        </div>
      ) : null}
    </>
  );
};

export default ClassAttendance;
