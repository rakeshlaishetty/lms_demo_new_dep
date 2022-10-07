/* eslint no-underscore-dangle: 0 */
import React, { useState, useEffect, forwardRef } from 'react';
import {
  Row,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Card,
  CardBody,
  Table,
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import GradientWithRadialProgressCard from 'components/cards/GradientWithRadialProgressCard';
import IntlMessages from 'helpers/IntlMessages';
import 'react-datepicker/dist/react-datepicker.css';
import uuid from 'react-uuid';
import axios from 'axios';

const StudentAttendance = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);
  const [total, setTotal] = useState('');
  const [totalPresent, setTotalPresent] = useState(0);
  const [averageData, setAverageData] = useState('');

  const CustomDatepicker = forwardRef(({ value, onClick }, ref) => (
    <button
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'transparent',
        border: '1px solid black',
        height: '37px',
        padding: '0',
        width: '150px',
        textAlign: 'center',
        borderRadius: '20px',
      }}
      className="mr-1 float-md-left mx-3 btn-group mb-1"
      value={value}
      type="button"
      onClick={onClick}
      ref={ref}
    >
      Date: {selectedDate.toLocaleDateString()} &#9662;
    </button>
  ));

  CustomDatepicker.displayName = 'CustomeDatepicker';

  const getClasses = async () => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));
    const res = await axios.get(`/classes/getClasses?schoolId=${adm.schoolId}`);
    if (res.status === 200) {
      setClasses(res.data);
    }
  };

  const getAttendance = async () => {
    const res = await axios.get(
      `/attendance/getAttendance?classId=${selectedClass._id}&date=${selectedDate}`
    );
    if (res.status === 200) {
      setAttendanceData(res.data.data);
      setAverageData(res.data.average);
      setTotal(res.data.total);
      let present = 0;
      for(let i=0; i<res.data.data.length; i+=1){
        console.log(res.data.data[i].present)
        if(res.data.data[i].present){
            present += 1;
        }
      }
      setTotalPresent(present);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  useEffect(() => {
    if (selectedClass && selectedDate) {
      getAttendance();
    }
  }, [selectedClass, selectedDate]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>Student Attendance</h1>
          </div>

          <div className="d-flex justify-content-start align-items-start pt-1">
            <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
              <DropdownToggle caret color="outline-dark" size="l">
                <IntlMessages id="Class: " />
                {selectedClass
                  ? `${selectedClass.class} ${selectedClass.division}`
                  : null}
              </DropdownToggle>
              <DropdownMenu>
                {classes.map((item) => {
                  return (
                    <DropdownItem
                      key={uuid()}
                      onClick={() => setSelectedClass(item)}
                    >
                      {item.class} {item.division}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>

            <DatePicker
              shouldCloseOnSelect
              selected={selectedDate}
              customInput={<CustomDatepicker />}
              onChange={(val) => setSelectedDate(val)}
            />
          </div>
        </Colxx>
      </Row>
      <Separator className="mb-5" />

      <Row>
        <Colxx sm="12" lg='8'>
          <Card className="mb-4">
            <CardBody>
              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Overall</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((item, index) => (
                    <tr key={uuid()}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td
                        className={
                          item.present ? 'text-success' : 'text-danger'
                        }
                      >
                        {item.present ? 'Present' : 'Absent'}
                      </td>
                      <td
                        className={
                          (averageData[item._id] / total) * 100 < 75
                            ? 'text-danger'
                            : null
                        }
                      >
                        {Number((averageData[item._id] / total) * 100)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx lg='4'>
            {
                attendanceData.length ?
                <GradientWithRadialProgressCard
                icon="iconsminds-blackboard"
                title="Attendance"
                detail={selectedDate.toDateString()}
                percent={(totalPresent * 100) / 12}
                progressText={`${totalPresent}/${attendanceData.length}`}
              />
              :
              null
            }
        </Colxx>
      </Row>
    </>
  );
};

export default StudentAttendance;
