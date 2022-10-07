/* eslint no-underscore-dangle: 0 */
/* eslint-disable react/no-array-index-key */
/* eslint no-nested-ternary: 0 */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Row, Button, Card, CardBody } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import CustomSelectInput from 'components/common/CustomSelectInput';
import Select from 'react-select';
import axios from 'axios';

import jobs from '../../../data/jobs';

const EmployeeList = () => {
  const [staff, setStaff] = useState([]);
  const [staffType, setStaffType] = useState({ value: '' });

  const history = useHistory();

  const getTeachers = async () => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));
    const res = await axios.get(`/getTeachers?schoolId=${adm.schoolId}`);
    if (res.status === 200) {
      //   if (!res.data.length) {
      //     swal(
      //       'No data available',
      //       'It seems there is no staff data availalble',
      //       'warning'
      //     );
      //     return;
      //   }
      setStaff(res.data);
    }
  };

  const getStaff = async () => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));
    const res = await axios.get(
      `/staff/getStaff?staffType=${staffType.value}&schoolId=${adm.schoolId}`
    );
    if (res.status === 200) {
      //   if (!res.data.length) {
      //     swal(
      //       'No data available',
      //       'It seems there is no staff data availalble',
      //       'warning'
      //     );
      //     return;
      //   }
      setStaff(res.data);
      console.log(staff);
    }
  };

  useEffect(() => {
    if (staffType.value === 'Teacher') {
      getTeachers();
    } else if (staffType.value !== 'Teachers' && staffType.value !== '') {
      getStaff();
    }
  }, [staffType.value]);

  return (
    <>
      <Row>
        <Colxx sm="12">
          <div className="">
            <h1>Employee List</h1>
          </div>

          <div className="d-flex justify-content-start align-items-start pt-1">
            <div style={{ width: '45%' }}>
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select mb-2"
                classNamePrefix="react-select"
                name="teacher"
                value={staffType}
                onChange={setStaffType}
                options={jobs}
                placeholder="Select Profession..."
              />
            </div>
          </div>
        </Colxx>
      </Row>
      <Separator className="mb-5" />
      <Row>
        <Colxx xxs="12">
          {staff.length && staffType.value ? (
            <Card className="mb-4">
              <CardBody>
                <table className="table table-striped mt-5">
                  <thead>
                    <tr className="schedule-heading">
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Contact</th>
                      {/* <th scope="col">Salary</th> */}
                      <th scope="col" />
                      <th scope="col" />
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                          <Button onClick={() =>
                            history.push({
                              pathname: `/app/staff-id-card/${item.name}`,
                              state: { data: item },
                            })} color="primary">
                    <IntlMessages id="ID Card" />
                  </Button>
                        </td>
                        <td>
                          {/* <button
                          style={{ border: "none", background: "inherit" }}
                        >
                          <img style={{ height: "20px" }} src={pencil} />
                        </button> */}
                          Edit
                        </td>
                        <td>
                          {/* <button
                          style={{ border: "none", background: "inherit" }}
                        >
                          <img style={{ height: "20px" }} src={trash} />
                        </button> */}
                          Delete
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          ) : staffType.value && !staff.length ? (
            <Card className="mb-4">
              <CardBody>
                <Alert color="warning" className="rounded">
                  <IntlMessages id={`No ${staffType.value} recruited yet`} />
                </Alert>
              </CardBody>
            </Card>
          ) : null}
        </Colxx>
      </Row>
    </>
  );
};

export default EmployeeList;
