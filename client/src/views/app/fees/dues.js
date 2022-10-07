/* eslint no-underscore-dangle: 0 */
/* eslint-disable react/no-array-index-key */
/* eslint no-nested-ternary: 0 */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Alert,
  Row,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Card,
  CardBody,
  CardTitle,
  Button
} from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IconCard from 'components/cards/IconCard';
import CustomSelectInput from 'components/common/CustomSelectInput';
import IntlMessages from 'helpers/IntlMessages';
import Select from 'react-select';
import axios from 'axios';
import uuid from 'react-uuid';

const Dues = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [duesData, setDuesData] = useState([]);
  const [totalPaid, setTotalPaid] = useState('');

  const history = useHistory();

  const getClasses = async () => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));
    const res = await axios.get(`/classes/getClasses?schoolId=${adm.schoolId}`);
    if (res.status === 200) {
      setClasses(res.data);
    }
  };

  const getStudents = async () => {
    const res = await axios.get(
      `/getStudentsList?classId=${selectedClass._id}`
    );
    if (res.status === 200) {
      setStudents(res.data);
    }
  };

  const getDues = async () => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));
    const res = await axios.get(
      `/fees/getDues?studentId=${selectedStudent.value}&schoolId=${adm.schoolId}`
    );
    if (res.status === 200) {
      setDuesData(res.data);
      let total = 0;
      for (let i = 0; i < res.data.installmentData.length; i += 1) {
        total += res.data.installmentData[i].amount;
      }
      setTotalPaid(total);
    }
  };

  const generateReceipt = async (item, index) => {
    const data = {};
    const adm = JSON.parse(window.localStorage.getItem('userdata'));

    let res = await axios.post(`getStudent`, { id: item.studentId });
    if (res.status === 200) {
      data.student = res.data;
    }

    data.admin = adm;

    res = await axios.get(`/getSchool?id=${adm.schoolId}`);
    if (res.status === 200) {
      data.school = res.data;
    }

    data.feeData = item;
    data.installmentNumber = index;

    history.push({
      pathname: `/app/fee-receipt/${item._id}`,
      state: { data: data },
    });
  };

  useEffect(() => {
    getClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      getStudents();
    }
  }, [selectedClass]);

  useEffect(() => {
    if (selectedStudent) {
      getDues();
    }
  }, [selectedStudent]);

  useEffect(() => {
    if (students.length) {
      const temp = [];
      for (let i = 0; i < students.length; i += 1) {
        temp.push({ label: students[i].name, value: students[i]._id, key: i });
      }
      setStudentsData(temp);
    }
  }, [students]);

  return (
    <>
      <Row>
        <Colxx sm="12">
          <div className="">
            <h1>Transactions & Dues</h1>
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

            <div className='mx-4' style={{ width: '45%' }}>
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select mb-2"
                classNamePrefix="react-select"
                name="teacher"
                value={selectedStudent}
                onChange={setSelectedStudent}
                options={studentsData}
                placeholder="Select Student..."
              />
            </div>
          </div>
        </Colxx>
      </Row>
      <Separator className="mb-5" />
      {duesData && selectedStudent.value && selectedClass ? (
        <>
          <Row>
            <Colxx xxs="12">
              <Row className="icon-cards-row mb-2">
                <Colxx xxs="6" sm="4" md="3" lg="2">
                  <IconCard
                    title="Total Paid"
                    icon="simple-icon-check"
                    value={`₹ ${totalPaid}`}
                    className="mb-4"
                  />
                </Colxx>
                <Colxx xxs="6" sm="4" md="3" lg="2">
                  <IconCard
                    title="Total Due"
                    icon="iconsminds-sand-watch-2"
                    value={`₹ ${duesData.totalPayable - totalPaid}`}
                    className="mb-4"
                  />
                </Colxx>
                <Colxx xxs="6" sm="4" md="3" lg="2">
                  <IconCard
                    title="Payment Type"
                    icon="iconsminds-financial"
                    value={duesData.paymentType}
                    className="mb-4"
                  />
                </Colxx>
              </Row>
            </Colxx>
          </Row>
          {typeof duesData.installmentData !== 'undefined' &&
          duesData.installmentData.length ? (
            <Card className="mb-4">
              <CardBody>
                <CardTitle>
                  <IntlMessages id="Transactions" />
                </CardTitle>
                <table className="mt-5 mb-4 table table-striped">
                  <thead>
                    <tr className="schedule-heading">
                      <th scope="col">Transaction ID</th>
                      <th scope="col">Date</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Installment</th>
                      <th />
                    </tr>
                  </thead>

                  <tbody>
                    {duesData.installmentData.map((item, index) => (
                      <tr key={index}>
                        <td>{item._id}</td>
                        <td>{new Date(item.date).toDateString()}</td>
                        <td>₹ {item.amount}</td>
                        <td>
                          {index + 1}/{duesData.totalInstallments}
                        </td>
                        <td>
                          <Button
                            onClick={() => generateReceipt(item, index + 1)}
                            color="primary"
                          >
                            <IntlMessages id="Download receipt" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {duesData.defaulter ? (
                  <Alert color="danger" className="rounded">
                    <IntlMessages
                      id={`Due date elapsed on ${new Date(
                        duesData.nextDue
                      ).toDateString()}`}
                    />
                  </Alert>
                ) : duesData.nextDue ? (
                  <Alert color="warning" className="rounded">
                    <IntlMessages
                      id={`Next Due Date: ${new Date(
                        duesData.nextDue
                      ).toDateString()}`}
                    />
                  </Alert>
                ) : null}
              </CardBody>
            </Card>
          ) : (
            <Alert color="info" className="rounded">
              <IntlMessages id="No transactions yet!" />
            </Alert>
          )}
        </>
      ) : null}
    </>
  );
};

export default Dues;
