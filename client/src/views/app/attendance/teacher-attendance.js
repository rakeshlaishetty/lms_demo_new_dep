/* eslint no-underscore-dangle: 0 */
import React, { useState, useEffect } from 'react';
import { Row, Card, CardBody, Table } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import CustomSelectInput from 'components/common/CustomSelectInput';
import Select from 'react-select';
import axios from 'axios';
import uuid from 'react-uuid';
import 'react-datepicker/dist/react-datepicker.css';

const TeacherAttendance = () => {
  const [teachers, setTeachers] = useState([]);
  const [teachersData, setTeachersData] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState({});
  const [attendance, setAttendance] = useState([]);

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

  useEffect(() => {
    getTeachers();
  }, []);

  const getAttendance = async () => {
    const res = await axios.get(
      `/attendance/getTeacherAttendanceData?teacherId=${selectedTeacher.value}`
    );
    if (res.status === 200) {
      setAttendance(res.data);
    }
  };

  useEffect(() => {
    if (typeof selectedTeacher.value !== 'undefined') {
      getAttendance();
    }
  }, [selectedTeacher]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>Teacher Attendance</h1>
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
      <Separator className="mb-5" />
      {attendance.length ? (
        <Row>
          <Colxx xxs="12">
            <Card className="mb-4">
              <CardBody>
                <Table striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map((item, index) => (
                      <tr key={uuid()}>
                        <th scope="row">{index + 1}</th>
                        <td>{item}</td>
                        <td>Marked present</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      ) : null}
    </>
  );
};

export default TeacherAttendance;
