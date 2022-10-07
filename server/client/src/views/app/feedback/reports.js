/* eslint no-underscore-dangle: 0 */
import React, { useState, useEffect } from 'react';
import { Row, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Separator, Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import CustomSelectInput from 'components/common/CustomSelectInput';
import RadialProgressCard from 'components/cards/RadialProgressCard';
import Select from 'react-select';
import { BarChart } from 'components/charts';
import axios from 'axios';
import { ThemeColors } from 'helpers/ThemeColors';

const colors = ThemeColors();

const Reports = () => {
  const [teachers, setTeachers] = useState([]);
  const [teachersData, setTeachersData] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState({label: '', value: '', key: ''});
  const [avgPreparedness, setAvgPreparedness] = useState(0);
  const [avgAttitude, setAvgAttitude] = useState(0);
  const [avgTiming, setAvgTiming] = useState(0);
  const [preparedness, setPreparedness] = useState([]);
  const [attitude, setAttitude] = useState([]);
  const [timing, setTiming] = useState([]);

const prepData = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        label: '',
        borderColor: colors.themeColor1,
        backgroundColor: colors.themeColor1_10,
        data: preparedness,
        borderWidth: 2,
      }
    ],
  }

  const attData = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        label: '',
        borderColor: colors.themeColor1,
        backgroundColor: colors.themeColor1_10,
        data: attitude,
        borderWidth: 2,
      }
    ],
  }

  const timData = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        label: '',
        borderColor: colors.themeColor1,
        backgroundColor: colors.themeColor1_10,
        data: timing,
        borderWidth: 2,
      }
    ],
  }


  useEffect(() => {
    if(preparedness.length){
        prepData.datasets[0].data = preparedness;
    }
  }, [preparedness])

  useEffect(() => {
    if(attitude.length){
        attData.datasets[0].data = attitude;
    }
  }, [attitude])

  useEffect(() => {
    if(timing.length){
        timData.datasets[0].data = timing;
    }
  }, [timing])

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

  const getFeedbackReport = async () => {
    const res = await axios.get(
      `/feedback/getFeedbackReport?teacherId=${selectedTeacher.value}`
    );
    if (res.status === 200) {
      let prepared = 0;
      let timings = 0;
      let attitudes = 0;
      for (let i = 0; i < res.data.ratings.length; i += 1) {
        prepared += res.data.ratings[i].preparedness;
        timings += res.data.ratings[i].timing;
        attitudes += res.data.ratings[i].attitude;
      }
      prepared /= res.data.ratings.length;
      timings /= res.data.ratings.length;
      attitudes /= res.data.ratings.length;
      setAvgPreparedness(prepared);
      setAvgTiming(timings);
      setAvgAttitude(attitudes);

      const prep = [0, 0, 0, 0, 0];
      const atti = [0, 0, 0, 0, 0];
      const timi = [0, 0, 0, 0, 0];
      for (let i = 0; i < res.data.ratings.length; i += 1){
        prep[parseInt(res.data.ratings[i].preparedness, 10)-1] += 1
        atti[parseInt(res.data.ratings[i].attitude, 10)-1] += 1
        timi[parseInt(res.data.ratings[i].timing, 10)-1] += 1
      }
      setPreparedness(prep);
      setAttitude(atti);
      setTiming(timi);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  useEffect(() => {
    if (selectedTeacher.value !== '') {
      getFeedbackReport();
    }
  }, [selectedTeacher]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>Teacher Feedback Reports</h1>
          </div>

          <div className="d-flex justify-content-start align-items-start pt-1">
            <div style={{ width: '45%' }}>
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
            </div>
          </div>
        </Colxx>
      </Row>
      <Separator className="mb-4" />

      {
        selectedTeacher.value ?
        <Row>
        <Colxx xxs="12" lg="9">
          <Row>
            <Colxx xxs="4" className="mb-4">
              <RadialProgressCard
                title="Preparedness"
                percent={parseInt((avgPreparedness / 5) * 100, 10)}
                isSortable
              />
            </Colxx>
            <Colxx xxs="4" className="mb-4">
              <RadialProgressCard
                title="Attitude"
                percent={parseInt((avgAttitude / 5) * 100, 10)}
                isSortable
              />
            </Colxx>
            <Colxx xxs="4" className="mb-4">
              <RadialProgressCard
                title="Syllabus completion"
                percent={parseInt((avgTiming / 5) * 100, 10)}
                isSortable
              />
            </Colxx>
          </Row>
          <Row className='mb-3'>
            <Colxx xxs='12'>
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="Preparedness Data Distribution" />
                </CardTitle>
                <div className="chart-container">
                  <BarChart shadow data={prepData} />
                </div>
              </CardBody>
            </Card>
            </Colxx>
          </Row>
          <Row className='mb-3'>
            <Colxx xxs='12'>
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="Attitude Data Distribution" />
                </CardTitle>
                <div className="chart-container">
                  <BarChart shadow data={attData} />
                </div>
              </CardBody>
            </Card>
            </Colxx>
          </Row>
          <Row className='mb-3'>
            <Colxx xxs='12'>
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="On-time Syllabus Completion Data Distribution" />
                </CardTitle>
                <div className="chart-container">
                  <BarChart shadow data={timData} />
                </div>
              </CardBody>
            </Card>
            </Colxx>
          </Row>
        </Colxx>
        <Colxx xxs="12" lg="3">
          <Card>
            <CardBody>
                <Row className="mt-4">
                  <Colxx xxs="10">
                    <p className="text-muted">Grievances</p>
                  </Colxx>
                  <Colxx xxs="2">
                    <p className="text-muted">0</p>
                  </Colxx>
                </Row>
                <Row className="mt-3">
                  <Colxx xxs="10">
                    <p className="text-muted">Warnings</p>
                  </Colxx>
                  <Colxx xxs="2">
                    <p className="text-muted">0</p>
                  </Colxx>
                </Row>
                <Row className="mt-3">
                  <Colxx xxs="10">
                    <p className="text-muted">Suspensions</p>
                  </Colxx>
                  <Colxx xxs="2">
                    <p className="text-muted">0</p>
                  </Colxx>
                </Row>
                <div className='w-100 d-flex justify-content-center'><Button outline color="warning" className="mt-3">
                <IntlMessages id="Send warning" />
              </Button></div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      :
      null
      }
    </>
  );
};

export default Reports;
