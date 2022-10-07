/* eslint no-underscore-dangle: 0 */
/* eslint-disable react/no-array-index-key */
/* eslint no-nested-ternary: 0 */
import React, { useState, useEffect } from 'react';

import { Alert, Card, CardBody, Row, Button } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import axios from 'axios';
import IconCard from 'components/cards/IconCard';
import noData from '../../../assets/img/no-data.png';

const YourAttendance = () => {
  const [data, setData] = useState([]);
  const [numAbsent, setNumAbsent] = useState(0);

  
  const getAttendance = async () => {
    const student = JSON.parse(window.localStorage.getItem('userdata'));
    const studentClass = JSON.parse(
      window.localStorage.getItem('classDetails')
    );

    const res = await axios.get(
      `/attendance/getStudentAttendance?classId=${studentClass._id}&studentId=${student._id}`
    );
    if (res.status === 200) {
      setData(res.data);
      let absent = 0;
      for (let i = 0; i < res.data.length; i += 1) {
        if (!res.data[i].present) {
          absent += 1;
        }
      }
      setNumAbsent(absent);
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>Your Attendance</h1>
          </div>
        </Colxx>
      </Row>
      <Separator className="mb-2" />

      <Row className='mt-4'>
        <Colxx xxs="12" lg="8">
          <Card>
            <CardBody>
            <Alert color="info" className="rounded">
                <IntlMessages id="Maintain an overall attendance of 75% to avoid being in the defaulter list" />
              </Alert>
              {data.length ? (
                <table className="mt-5 table table-striped">
                  <thead>
                    <tr className="schedule-heading">
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.date}</td>
                        <td
                          className={
                            item.present ? 'text-success' : 'text-danger'
                          }
                        >
                          {item.present ? 'Present' : 'Absent'}
                        </td>
                        <td>
                          {!item.present ? (
                            <Button outline color="info" className="mb-2">
                            <IntlMessages id="Cite reason" />
                          </Button>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                  <img alt="no-data" style={{ height: '150px' }} src={noData} />
                  <h3 className="mt-3">No data available</h3>
                  <p className="text-muted mt-2">
                    Please ask your concerned faculty to enter the attendance
                    data.
                  </p>
                </div>
              )}
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="12" lg="4">
          <div className="icon-cards-row">
            <IconCard
              icon="iconsminds-male-female"
              title="Overall Attendance"
              value={`${parseInt(((data.length-numAbsent)/data.length)*100, 10)}%`}
              className="mb-4"
            />
            <IconCard
              icon="iconsminds-air-balloon-1"
              title="Total leaves"
              value={numAbsent}
              className="mb-4"
            />
          </div>
        </Colxx>
      </Row>
    </>
  );
};

export default YourAttendance;
