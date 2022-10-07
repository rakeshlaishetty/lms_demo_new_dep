/* eslint no-underscore-dangle: 0 */
/* eslint-disable react/no-array-index-key */
/* eslint no-nested-ternary: 0 */
/* eslint prefer-template: 0 */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Row,
  NavLink,
  Button,
  Badge,
  Card,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Label,
} from 'reactstrap';

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import CustomSelectInput from 'components/common/CustomSelectInput';
import Select from 'react-select';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
import axios from 'axios';

import empty from '../../../assets/img/empty-folder.png';

const YourAssignments = () => {
  const student = JSON.parse(window.localStorage.getItem('userdata'));
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState({
    label: '',
    value: '',
    key: '',
  });
  const [showMissing, setShowMissing] = useState(false);
  const [orderBy, setOrderBy] = useState('');

  const history = useHistory();

  const getSubjects = async () => {
    const studentClass = JSON.parse(
      window.localStorage.getItem('classDetails')
    );

    const res = await axios.get(
      `/getClassSubjects?classId=${studentClass._id}`
    );
    if (res.status === 200) {
      //   setSubjects(res.data);
      const temp = [];
      for (let i = 0; i < res.data.length; i += 1) {
        temp.push({
          label: res.data[i].subject.name,
          value: res.data[i].subject._id,
          key: i,
        });
      }
      setSubjects(temp);
    }
  };

  const getAssignments = async () => {
    const studentClass = JSON.parse(
      window.localStorage.getItem('classDetails')
    );
    const res = await axios.get(
      `/assignments/getAssignmentsBySubjects?classId=${studentClass._id}`
    );
    if (res.status === 200) {
      setAssignments(res.data);
    }
  };

  useEffect(() => {
    getSubjects();
    getAssignments();
  }, []);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>Your Assignments</h1>
          </div>

          <div className="d-flex align-items-center w-100">
            <UncontrolledDropdown className="mr-3 float-md-left btn-group mb-1">
              <DropdownToggle caret color="outline-dark" size="xs">
                <IntlMessages id="pages.orderby" />
                {orderBy}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => setOrderBy('Name')}>
                  Name
                </DropdownItem>
                <DropdownItem onClick={() => setOrderBy('Date Created')}>
                  Date Created
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <div style={{ width: '20%' }}>
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select mb-2"
                classNamePrefix="react-select"
                name="subject"
                value={selectedSubject}
                onChange={setSelectedSubject}
                options={subjects}
                placeholder="Select Subject..."
              />
            </div>

            <div className="float-right d-flex justify-content-center align-items-center">
              {typeof assignments[selectedSubject.value] !== 'undefined' &&
              assignments[selectedSubject.value].length ? (
                <div className="mb-5 d-flex justify-content-center align-items-center">
                  <Label for="switch">
                    <h6 className="mx-3">
                      <IntlMessages id="Missing only" />
                    </h6>
                  </Label>
                  <Switch
                    id="switch"
                    className="custom-switch custom-switch-primary custom-switch-small"
                    checked={showMissing}
                    onChange={() => setShowMissing(!showMissing)}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </Colxx>
      </Row>
      <Separator className="mb-3" />
      <Row>
        <Colxx xxs="12">
          {typeof assignments[selectedSubject.value] !== 'undefined' &&
          !showMissing ? (
            <div>
              {assignments[selectedSubject.value].map((item, index) => (
                <Card key={index} className="d-flex flex-row mb-3">
                  <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between align-items-center">
                    <p
                      style={{ width: '50%' }}
                      className="list-item-heading mb-1 truncate"
                    >
                      {item.assignmentName}
                    </p>
                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                      {item.subjectId.name}
                    </p>
                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                      Due: {new Date(item.deadline).toLocaleDateString()}
                    </p>
                    <div style={{ width: '15%' }}>
                      {item.date >=
                      new Date().setDate(new Date().getDate() - 5) ? (
                        <Badge color="success" pill className="mb-1">
                          <IntlMessages id="New" />
                        </Badge>
                      ) : null}
                    </div>
                    <div style={{ width: '15%' }}>
                    {typeof item.submission.find(
                      (data) => data._id === student._id
                    ) !== 'undefined' ? (
                      item.submission.find((data) => data._id === student._id)
                        .marks + '%'
                    ) : (
                      'N/A'
                    )}
                    </div>
                    <div style={{ width: '15%' }}>
                    {typeof item.submission.find(
                      (data) => data._id === student._id
                    ) !== 'undefined' ? (
                      <Button onClick={() => history.push({pathname: '/app/assignments/rankings', state: {id: item._id}})}>Performance</Button>
                    ) : (
                      <NavLink
                        type="button"
                        onClick={() =>
                          history.push(`/app/assignment/solve/${item._id}`)
                        }
                      >
                        <Button>Solve</Button>
                      </NavLink>
                    )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : typeof assignments[selectedSubject.value] !== 'undefined' &&
            showMissing ? (
            <table className="table table-striped px-3">
              <thead>
                <tr className="schedule-heading">
                  <th scope="col">Assignment Name</th>
                  <th scope="col">Assigned</th>
                  <th scope="col">Deadline</th>
                  <th scope="col">Status</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {assignments[selectedSubject.value].map((item, index) => {
                  return !item.submission.some(
                    (data) => data._id === student._id
                  ) ? (
                    <tr
                      style={{ height: '100px' }}
                      className="py-3"
                      key={index}
                    >
                      <td>
                        <strong>{item.assignmentName}</strong>
                      </td>
                      <td>{new Date(item.date).toDateString()}</td>
                      <td>{new Date(item.deadline).toDateString()}</td>
                      <td className="text-danger">Missing</td>
                      <td>
                        <button
                          type="button"
                          onClick={() =>
                            history.push(`/app/assignment/solve/${item._id}`)
                          }
                        >
                          Solve
                        </button>
                      </td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <img alt="empty-folder" src={empty} style={{ height: '150px' }} />
              <h4 className="mt-3">No Assignments created</h4>
            </div>
          )}
        </Colxx>
      </Row>
    </>
  );
};

export default YourAssignments;
