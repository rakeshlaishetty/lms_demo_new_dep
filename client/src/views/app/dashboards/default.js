/* eslint no-underscore-dangle: 0 */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { CardBody, Row, Card, CardTitle, Button } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import Greeting from 'containers/navs/Greeting';
import IconCardsCarousel from 'containers/dashboards/IconCardsCarousel';
// import RecentOrders from 'containers/dashboards/RecentOrders';
// import Logs from 'containers/dashboards/Logs';
import RecentTransactions from 'containers/dashboards/RecentTransactions';
// import Tickets from 'containers/dashboards/Tickets';
import Defaulters from 'containers/dashboards/Defaulters';
import Assignments from 'containers/dashboards/Assignments';
import Calendar from 'containers/dashboards/Calendar';
// import BestSellers from 'containers/dashboards/BestSellers';
// import ProfileStatuses from 'containers/dashboards/ProfileStatuses';
// import GradientCardContainer from 'containers/dashboards/GradientCardContainer';
// import Cakes from 'containers/dashboards/Cakes';
import GradientWithRadialProgressCard from 'components/cards/GradientWithRadialProgressCard';
import SortableStaticticsRow from 'containers/dashboards/SortableStaticticsRow';
import AdvancedSearch from 'containers/dashboards/AdvancedSearch';
import SmallLineCharts from 'containers/dashboards/SmallLineCharts';
// import SalesChartCard from 'containers/dashboards/SalesChartCard';
// import ProductCategoriesPolarArea from 'containers/dashboards/ProductCategoriesPolarArea';
// import WebsiteVisitsChartCard from 'containers/dashboards/WebsiteVisitsChartCard';
import ClassDistribution from 'containers/dashboards/ClassDistribution';
// import ConversionRatesChartCard from 'containers/dashboards/ConversionRatesChartCard';
import GenderDistribution from 'containers/dashboards/GenderDistribution';
// import TopRatedItems from 'containers/dashboards/TopRatedItems';

import axios from 'axios';
import IntlMessages from 'helpers/IntlMessages';

import formatNumber from '../../../helpers/formatNumber';

import speaker from '../../../assets/img/speaker.png';

import './styles.css';

const DefaultDashboard = ({ intl }) => {
  const { messages } = intl;

  const user = window.localStorage.getItem('user');
  const history = useHistory();

  const date = new Date();
  
  const [school, setSchool] = useState('');
  const [teachersCount, setTeachersCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [schedule, setSchedule] = useState([]);
  const [defaulterList, setDefaulterList] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [genderDistribution, setGenderDistribution] = useState();
  const [quote, setQuote] = useState('');
  const [pending, setPending] = useState([]);
  const [studentAttendanceData, setStudentAttendanceData] = useState([]);
  const [numAbsent, setNumAbsent] = useState('');

  const times = {
    0: '8:00 am',
    1: '9:00 am',
    2: '10:00 am',
    3: '11:00 am',
    4: '12:00 pm',
    5: '1:00 pm',
    6: '2:00 pm',
    7: '3:00 pm',
    8: '4:00 pm',
  };

  const getSchool = async () => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));
    const res = await axios.get(`/getSchool?id=${adm.schoolId}`);
    if (res.status === 200) {
      setSchool(res.data);
    }
  };

  const getTeachersCount = () => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));
    axios
      .get('/allTeachers', { params: { schoolId: adm.schoolId } })

      .then((res) => {
        if (res.status === 200) {
          console.log('inside');
          setTeachersCount(res.data.teachers.length);
          console.log(res.data);
          console.log('res.data.teachers.length', res.data.teachers.length);
        } else {
          console.log('something went wrong while fetching teachers count');
        }
      })
      .catch((e) => console.log(e, 'something went wrong in getTeachercount'));
  };
  const getStudentsCount = () => {
    const { schoolId } = JSON.parse(window.localStorage.getItem('userdata'));
    axios
      .get('/allStudents', { params: { schoolId } })
      .then((res) => {
        setStudentsCount(res.data.students.length);
      })
      .catch((e) => console.log(e));
  };

  const getTeacherDashboard = async () => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));
    const res = await axios.get(
      `/getTeacherDashboardDetails?schoolId=${adm.schoolId}&facultyId=${adm._id}`
    );
    if (res.status === 200) {
      setSchedule(res.data.schedule);
      // setAnnouncements(res.data.announcements);
    }
  };

  const getDefaulterList = async () => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));
    const res = await axios.get(
      `/fees/getDefaulterList?schoolId=${adm.schoolId}`
    );
    if (res.status === 200) {
      setDefaulterList(res.data);
    }
  };

  const getRecentTransactions = async () => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));
    const res = await axios.get(
      `/fees/getRecentFeePayments?schoolId=${adm.schoolId}`
    );
    if (res.status === 200) {
      setRecentTransactions(res.data);
    }
  };

  const getGenderDistribution = async () => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));
    const res = await axios.get(
      `/admission/getGenderDistribution?schoolId=${adm.schoolId}`
    );
    if (res.status === 200) {
      setGenderDistribution(res.data);
    }
  };

  const getQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const { statusCode, statusMessage, ...data } = await response.json();
      if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
      setQuote(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getStudentSchedule = async () => {
    const studentClass = JSON.parse(
      window.localStorage.getItem('classDetails')
    );

    const res = await axios.get(
      `/timetable/getStudentSchedule?classId=${studentClass._id}`
    );
    if (res.status === 200) {
      setSchedule(res.data);
    }
  };

  const getPendingAssignments = async () => {
    const studentClass = JSON.parse(
      window.localStorage.getItem('classDetails')
    );
    const student = JSON.parse(window.localStorage.getItem('userdata'));

    const res = await axios.get(
      `/assignments/getPendingAssignments?studentId=${student._id}&classId=${studentClass._id}`
    );
    if (res.status === 200) {
      setPending(res.data);
    }
  };

  const getStudentAttendance = async () => {
    const student = JSON.parse(window.localStorage.getItem("userdata"));
    const studentClass = JSON.parse(window.localStorage.getItem("classDetails"));

    const res = await axios.get(`/attendance/getStudentAttendance?classId=${studentClass._id}&studentId=${student._id}`);
    if(res.status === 200){
        setStudentAttendanceData(res.data);
        let absent = 0;
        for(let i=0; i<res.data.length; i+=1){
            if(res.data[i].present){
                absent += 1;
            }
        }
        setNumAbsent(absent);
    }
}

  useEffect(() => {
    if (user === 'admin') {
      getSchool();
      getQuote();
      getTeachersCount();
      getStudentsCount();
      getDefaulterList();
      getRecentTransactions();
      getGenderDistribution();
    }
    if (user === 'teacher') {
      getQuote();
      getTeacherDashboard();
    }
    // getClassCount();
    // getDefaulterList();
    // getStudentAttendanceCount();
    if (user === 'student') {
      getQuote();
      getStudentSchedule();
      getPendingAssignments();
      getStudentAttendance();
    }
  }, [user]);

  return (
    <>
      {user === 'admin' ? (
        <div>
          <Row className="w-100">
            <Card style={{ padding: '0' }} className="progress-banner w-100">
              <CardBody style={{ padding: '0' }}>
                <div
                  style={{ height: '100%' }}
                  className="dashboard-greeting-teacher w-100"
                >
                  <h1 className="mt-4 mx-4 text-white">
                    <Greeting />
                  </h1>
                  <h6 className="quote mt-1 mx-4 text-white w-60">
                    {quote.content}
                  </h6>
                  <p className="quote-author mt-4 mx-4 text-white">
                    ~ {quote.author}
                  </p>
                </div>
              </CardBody>
            </Card>
          </Row>
          <Row className='mt-4'>
            <Colxx lg="12" xl="6">
              <IconCardsCarousel
                user={user}
                studentsCount={studentsCount}
                teachersCount={teachersCount}
              />
            </Colxx>
            <Colxx xxs="12" xl="6">
              <Card className="progress-banner mb-2 text-right">
                <CardBody>
                  <div className="text-right">
                    <div>
                      <h1 className="lead text-white mt-4">{school.name}</h1>
                      <p className="w-70 float-right text-white">
                        {school.address}
                      </p>
                      <p className="w-70 float-right text-white">
                        {school.city} - {school.pincode}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Colxx>
          </Row>
          <Row>
            <Colxx lg="4" md="12" className="mb-4">
              <Card className="progress-banner mb-2">
                <CardBody className="justify-content-between d-flex flex-row align-items-center">
                  <div>
                    <i className="iconsminds-coins mr-2 text-white align-text-bottom d-inline-block" />
                    <div>
                      <p className="lead text-white">{formatNumber(1250000)}</p>
                      <p className="text-small text-white">
                        Revenue this month
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card className="progress-banner">
                <CardBody className="justify-content-between d-flex flex-row align-items-center">
                  <div>
                    <i className="iconsminds-fax mr-2 text-white align-text-bottom d-inline-block" />
                    <div>
                      <p className="lead text-white">{formatNumber(45000)}</p>
                      <p className="text-small text-white">
                        Expenditures this month
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Colxx>
            <Colxx lg="4" md="6" className="mb-4">
              <RecentTransactions data={recentTransactions} />
            </Colxx>
            <Colxx lg="4" md="6" className="mb-4">
              <Defaulters data={defaulterList} />
            </Colxx>
          </Row>
          <Row>
            <Colxx xl="6" lg="12" className="mb-4">
              <Calendar />
            </Colxx>
            <Colxx xl="6" lg="12" className="mb-4">
              <Card>
                <CardBody>
                  <CardTitle>
                    <IntlMessages id="Upcoming Events" />
                  </CardTitle>
                </CardBody>
              </Card>
            </Colxx>
          </Row>
          {/* <Row>
            <Colxx sm="12" lg="4" className="mb-4">
              <ProfileStatuses />
            </Colxx>
            <Colxx md="6" lg="4" className="mb-4">
              <GradientCardContainer />
            </Colxx>
            <Colxx md="6" lg="4" className="mb-4">
              <Cakes />
            </Colxx>
          </Row> */}
          <SortableStaticticsRow />
          <Row>
            <Colxx sm="12" md="6" className="mb-4">
              <ClassDistribution />
            </Colxx>
            <Colxx sm="12" md="6" className="mb-4">
              <GenderDistribution data={genderDistribution} />
            </Colxx>
          </Row>
          <Row>
            <Colxx lg="12" md="6" xl="4">
              <Row>
                <Colxx lg="4" xl="12" className="mb-4">
                  <Card className="progress-banner mb-2">
                    <CardBody className="justify-content-between d-flex flex-row align-items-center">
                      <div>
                        <i className="simple-icon-exclamation mr-2 text-white align-text-bottom d-inline-block" />
                        <div>
                          <p className="lead text-white">{`${5} Tickets`}</p>
                          <p className="text-small text-white">
                            Pending for notice
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Colxx>
                <Colxx lg="4" xl="12" className="mb-4">
                  <Card className="progress-banner mb-2">
                    <CardBody className="justify-content-between d-flex flex-row align-items-center">
                      <div>
                        <i className="iconsminds-envelope-2 mr-2 text-white align-text-bottom d-inline-block" />
                        <div>
                          <p className="lead text-white">{`${5} Applications`}</p>
                          <p className="text-small text-white">
                            Pending for review
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Colxx>
                <Colxx lg="4" xl="12" className="mb-4">
                  <Card className="progress-banner mb-2">
                    <CardBody className="justify-content-between d-flex flex-row align-items-center">
                      <div>
                        <i className="iconsminds-coins mr-2 text-white align-text-bottom d-inline-block" />
                        <div>
                          <p className="lead text-white">
                            {formatNumber(1250000)}
                          </p>
                          <p className="text-small text-white">
                            Revenue this month
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Colxx>
              </Row>
            </Colxx>
            <Colxx lg="6" md="6" xl="4" sm="12" className="mb-4">
              <AdvancedSearch messages={messages} />
            </Colxx>
            <Colxx lg="6" xl="4" className="mb-4">
              <SmallLineCharts />
            </Colxx>
          </Row>
        </div>
      ) : null}

      {user === 'teacher' ? (
        <div>
          <Row className="w-100">
            <Card style={{ padding: '0' }} className="progress-banner w-100">
              <CardBody style={{ padding: '0' }}>
                <div
                  style={{ height: '100%' }}
                  className="dashboard-greeting-teacher w-100"
                >
                  <h1 className="mt-4 mx-4 text-white">
                    <Greeting />
                  </h1>
                  <h6 className="quote mt-1 mx-4 text-white w-60">
                    {quote.content}
                  </h6>
                  <p className="quote-author mt-4 mx-4 text-white">
                    ~ {quote.author}
                  </p>
                </div>
              </CardBody>
            </Card>
          </Row>
          <Row className='mt-4'>
            <Colxx xxs="12" lg="8">
              <Card>
              <CardBody>
                  <CardTitle>
                    <IntlMessages id="Announcements" />
                    <div className="w-100 d-flex justify-center align-items-center flex-column">
                      <img
                        style={{ height: '100px' }}
                        alt="speaker"
                        src={speaker}
                      />
                      <h5 className="text-muted mt-3">No new announcements</h5>
                    </div>
                  </CardTitle>
                </CardBody>
              </Card>
            </Colxx>
            <Colxx xxs="12" lg="4">
              <Card>
                <CardBody>
                  <CardTitle>
                    <IntlMessages id="Today's Schedule" />
                  </CardTitle>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <p className="">{new Date().toDateString()}</p>
                    <p>{schedule.length} periods</p>
                  </div>
                  <div className="timeline container mt-5">
                    <div className="wrapper">
                      <ul className="sessions">
                        {schedule.map((item, index) => (
                          <li key={index}>
                            <div className="time">{times[item.timeSlot]}</div>
                            <p>
                              <strong>{item.subjectId.name}</strong>
                            </p>
                            <p className="text-muted">
                              {item.classId.class}-{item.classId.division}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Colxx>
          </Row>

          <Row className="mt-3">
            <Colxx xxs="12" lg="8">
              <Card>
                <CardBody>Hii</CardBody>
              </Card>
            </Colxx>
            <Colxx xxs="12" lg="4">
              <Assignments />
            </Colxx>
          </Row>
        </div>
      ) : null}

      {user === 'student' ? (
        <div>
          <Row className="w-100">
            <Card style={{ padding: '0' }} className="progress-banner w-100">
              <CardBody style={{ padding: '0' }}>
                <div
                  style={{ height: '100%' }}
                  className="dashboard-greeting-student w-100"
                >
                  <h1 className="mt-4 mx-4 text-white">
                    <Greeting />
                  </h1>
                  <h6 className="quote mt-1 mx-4 text-white w-60">
                    {quote.content}
                  </h6>
                  <p className="quote-author mt-4 mx-4 text-white">
                    ~ {quote.author}
                  </p>
                </div>
              </CardBody>
            </Card>
          </Row>
          <Row className="mt-4">
            <Colxx xxs="12" lg="8">
              <Card>
                <CardBody>
                  <CardTitle>
                    <IntlMessages id="Announcements" />
                    <div className="w-100 d-flex justify-center align-items-center flex-column">
                      <img
                        style={{ height: '100px' }}
                        alt="speaker"
                        src={speaker}
                      />
                      <h5 className="text-muted mt-3">No new announcements</h5>
                    </div>
                  </CardTitle>
                </CardBody>
              </Card>
            </Colxx>
            <Colxx xxs="12" lg="4">
              <Card>
                <CardBody>
                  <CardTitle>
                    <IntlMessages id="Today's Schedule" />
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <p className="text-muted">{new Date().toDateString()}</p>
                      {/* <h6>{schedule.length} periods</h6> */}
                    </div>

                    {schedule.length ? (
                      <div className="timeline container mt-5">
                        <div className="wrapper">
                          <ul className="sessions">
                            {schedule.map((item, index) => (
                              <li key={index}>
                                <div className="time">
                                  {times[item.timeSlot]}
                                </div>
                                <p>
                                  <strong>{item.subjectId.name}</strong>
                                </p>
                                <p className="text-muted">
                                  {item.classId.class}-{item.classId.division}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <h5
                        className="mt-5"
                        style={{
                          width: '60%',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                        }}
                      >
                        No periods today
                      </h5>
                    )}
                  </CardTitle>
                </CardBody>
              </Card>
            </Colxx>
          </Row>
          <Row className="mt-4">
            <Colxx xxs="12" lg="8">
              <Card>
                <CardBody>
                  <CardTitle>
                    <IntlMessages id="Pending Assignments" />
                  </CardTitle>
                  {pending.length ? (
                    <div className="mt-4">
                      {pending.map((item, index) => (
                        <div
                          key={index}
                          style={{ borderBottom: '1px solid #eee' }}
                          className="row py-4"
                        >
                          <div className="col-6">{item.assignmentName}</div>
                          <div className={new Date(item.deadline) < date ? 'col-3 text-danger' : 'col-3'}>
                            {new Date(item.deadline).toDateString()}
                          </div>
                          <div className="col-3">
                            <Button
                              onClick={() =>
                                history.push(
                                  {
                                    pathname: `/app/assignments/solve`,
                                    state: {
                                      assignmentId: item._id
                                    }
                                  }
                                )
                              }
                              className="btn-rounded attendance-button py-1"
                            >
                              Solve
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No pending assignments!</p>
                  )}
                </CardBody>
              </Card>
            </Colxx>
            <Colxx xxs="12" lg="4" className="mb-4">
              <GradientWithRadialProgressCard
                icon="iconsminds-male"
                title='Attendance'
                detail=''
                percent={parseInt((numAbsent/studentAttendanceData.length)*100, 10)}
                progressText={`${parseInt((numAbsent/studentAttendanceData.length)*100, 10)}%`}
              />
            </Colxx>
          </Row>
        </div>
      ) : null}
    </>
  );
};
export default injectIntl(DefaultDashboard);
