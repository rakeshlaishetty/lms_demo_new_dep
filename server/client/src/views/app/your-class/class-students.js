/* eslint no-underscore-dangle: 0 */
/* eslint-disable react/no-array-index-key */
/* eslint no-nested-ternary: 0 */
import React, { useState, useEffect } from 'react';
import { Alert, Row, Card, CardBody } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import axios from 'axios';

import emptyFolder from '../../../assets/img/empty-folder.png';

const ClassStudents = () => {
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    const teacher = JSON.parse(window.localStorage.getItem('userdata'));
    const classDetails = JSON.parse(
      window.localStorage.getItem('classDetails')
    );
    const res = await axios.get(
      `/getStudentsList?schoolId=${teacher.schoolId}&classId=${classDetails._id}`
    );
    if (res.status === 200) {
      setStudents(res.data);
    }
  };

  useEffect(() => {
    getStudents();
  });
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Class Students</h1>
        </Colxx>
      </Row>
      <Separator className="mb-5" />
      <Row>
        <Colxx xxs="12">
          <Card>
            <CardBody>
              {students.length ? (
                <table className="table table-striped">
                  <thead>
                    <tr className="schedule-heading">
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Father&apos;s Name</th>
                      <th scope="col">Email Id</th>
                      <th scope="col">Contact</th>
                      <th scope="col">Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.father_name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <img
                    style={{ height: '100px' }}
                    className="mb-4"
                    alt="empty-folder"
                    src={emptyFolder}
                  />
                  <Alert color="warning" className="rounded">
                    <IntlMessages id="This class hasn't been assigned students yet. Please contact the administrator to do the same." />
                  </Alert>
                </div>
              )}
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default ClassStudents;
