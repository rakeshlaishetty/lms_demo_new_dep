/* eslint no-underscore-dangle: 0 */
/* eslint-disable react/no-array-index-key */
/* eslint no-nested-ternary: 0 */
import React, { useState, useEffect } from 'react';
import {
  Row,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CardBody,
  Card,Table,
  
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardTitle, Button
} from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import CustomSelectInput from 'components/common/CustomSelectInput';
import Select from 'react-select';
import IntlMessages from 'helpers/IntlMessages';
import axios from 'axios';

const AddTransaction = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({label: '', value: '', key: ''});
  const [feesData, setFeesData] = useState({admission: '', tuition: '', transport: '', sports: ''});
  const [modalBasic, setModalBasic] = useState(false);

 

  const getClasses = async () => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));
    const res = await axios.get(`/classes/getClasses?schoolId=${adm.schoolId}`);
    if (res.status === 200) {
      setClasses(res.data);
    }
  };

  const getFees = async () => {
    const res = await axios.get(`/fees/getFeesById?studentId=${selectedStudent.value}`);
    if (res.status === 200) {
      setFeesData(res.data);
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

  useEffect(() => {
    getClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      getStudents();
    }
  }, [selectedClass]);

  useEffect(() => {
    if(selectedStudent.value){
        getFees();
    }
  }, [selectedStudent.value])

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
        <Colxx xxs="12">
          <div className="">
            <h1>Update Transaction</h1>
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
                {classes.map((item, index) => {
                  return (
                    <DropdownItem
                      key={index}
                      onClick={() => setSelectedClass(item)}
                    >
                      {item.class} {item.division}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>

            <div className="mx-4" style={{ width: '45%' }}>
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

            {
                selectedStudent.value ?
                <div className='float-right'>
                <Button onClick={() => setModalBasic(true)}>Add transaction</Button>
            </div>
            :
            null
            }
          </div>
        </Colxx>
      </Row>

      <Separator className="mb-2" />

      <Row>
        <Colxx xxs="12">
            <Card>
                <CardBody>
                    <CardTitle>
                        <IntlMessages id="Fee structure"/>
                    </CardTitle>
                    <Table striped className='mt-4'>
                    <thead>
                  <tr className="schedule-heading">
                    <th scope="col">Payment</th>
                    <th scope="col">Tuition</th>
                    <th scope="col">Admission</th>
                    <th scope="col">Sports</th>
                    <th scope="col">Transport</th>
                    <th scope="col">Total</th>
                    {/* <th scope="col"></th>
                          <th scope="col"></th> */}
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>{feesData.payment}</td>
                      <td>{feesData.tuition}</td>
                      <td>{feesData.admission}</td>
                      <td>{feesData.sports}</td>
                      <td>{feesData.transport}</td>
                      <td>
                        {feesData.tuition +
                          feesData.transport +
                          feesData.sports +
                          feesData.admission}
                      </td>
                      {/* <td><button 
                                          onClick={() => getPayments(item._id)}
                                          className='btn-rounded attendance-button'
                                          style={{ backgroundColor: "#eeb316", color: "white" }}
                                          variant="contained"
                                          color="secondary">Details</button></td>
                              <td><button className='btn-rounded attendance-button'
                                          style={{ backgroundColor: "#eeb316", color: "white" }}
                                          variant="contained"
                                          color="secondary">Update</button></td> */}
                    </tr>
                 
                </tbody>
                    </Table>
                </CardBody>
            </Card>
        </Colxx>

        <Modal
                  isOpen={modalBasic}
                  toggle={() => setModalBasic(!modalBasic)}
                >
                  <ModalHeader>
                    <IntlMessages id="Confirmation" />
                  </ModalHeader>
                  <ModalBody>
                    {
                      feesData.payment === 'Monthly' ?
                      <p>
                        Payment type of {selectedStudent.label} is set as {feesData.payment}. Do you wish to update a 
                    payment transaction of ₹{(feesData.tuition + feesData.admission + feesData.transport + feesData.sports)}?
                      </p>
                      :
                      null
                    }
                    {
                      feesData.payment === 'Quarterly' ?
                      <p>
                        Payment type of {selectedStudent.label} is set as {feesData.payment}. Do you wish to update a 
                    payment transaction of ₹{(feesData.tuition + feesData.admission + feesData.transport + feesData.sports)*3}?
                      </p>
                      :
                      null
                    }
                    {
                      feesData.payment === 'Yearly' ?
                      <p>
                        Payment type of {selectedStudent.label} is set as {feesData.payment}. Do you wish to update a 
                    payment transaction of ₹{(feesData.tuition + feesData.admission + feesData.transport + feesData.sports)*12}?
                      </p>
                      :
                      null
                    }
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      onClick={() => setModalBasic(false)}
                    >
                      Update
                    </Button>{' '}
                    <Button
                      color="secondary"
                      onClick={() => setModalBasic(false)}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
      </Row>
    </>
  );
};

export default AddTransaction;
