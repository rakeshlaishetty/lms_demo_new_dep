/* eslint no-underscore-dangle: 0 */
import React, { useState, useEffect } from 'react';

import {
  Badge,
  Row,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Card,
} from 'reactstrap';

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { NavLink } from 'react-router-dom';
import IntlMessages from 'helpers/IntlMessages';
import axios from 'axios';
import uuid from 'react-uuid';
import Pagination from '../../../containers/pages/Pagination';

const ViewAssignment = () => {
  const [assignmentData, setAssignmentData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [listSize, setListSize] = useState(4);
  const [orderBy, setOrderBy] = useState('');

  const startIndex = (currentPage - 1) * listSize;
  const endIndex = currentPage * listSize;

  const pageSizes = [1, 4, 8, 12, 20];

  const getAssignments = async () => {
    const teacher = JSON.parse(window.localStorage.getItem('userdata'));

    const res = await axios.get(
      `/assignments/getAssignments?facultyId=${teacher._id}`
    );
    if (res.status === 200) {
      const data = [];
      let temp = [];
      for (let i = 0; i < res.data.length; i += 1) {
        temp.push(res.data[i]);
        if (temp.length === listSize) {
          data.push(temp);
          temp = [];
        }
      }
      if (temp.length) data.push(temp);
      setAssignmentData(data);
      setTotalPages(data.length);
      setTotal(res.data.length);
    }
  };

  useEffect(() => {
    getAssignments();
  }, [listSize]);

  useEffect(() => {
    if (orderBy === 'Name') {
      const temp = assignmentData;
      const arr = temp[currentPage - 1];

      arr.sort((a, b) => {
        const fa = a.assignmentName.toLowerCase();
        const fb = b.assignmentName.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      
      const data = assignmentData
      data[currentPage - 1] = arr;
      setAssignmentData(data);
    }
  }, [orderBy]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>Your Assignments</h1>

            <div className="text-zero top-right-button-container">
              <Button>
                <IntlMessages id="Create New" />
              </Button>
            </div>
          </div>

          <div className="d-block d-md-inline-block pt-1 mx-4">
            <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
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
          </div>

          {assignmentData.length ? (
            <div className="float-md-right pt-1 mb-1">
              <IntlMessages id="pages.viewing" />
              {startIndex + 1}-{total >= endIndex ? endIndex : total}
              {` | `}
              <IntlMessages id="Total: " />
              {total}
              <UncontrolledDropdown className="d-inline-block mx-3">
                <DropdownToggle caret color="outline-dark" size="xs">
                  {listSize}
                </DropdownToggle>
                <DropdownMenu right>
                  {pageSizes.map((size) => {
                    return (
                      <DropdownItem
                        key={uuid()}
                        onClick={() => setListSize(size)}
                      >
                        {size}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          ) : null}
        </Colxx>
      </Row>
      <Separator className="mb-5" />
      {assignmentData.length ? (
        <Row>
          {assignmentData[currentPage - 1].map((item) => (
            <Colxx key={uuid()} xxs="12" className="mb-3">
              <Card className="d-flex flex-row">
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
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                  <p className="mb-1 text-muted text-small w-15 w-sm-100">
                    {new Date(item.deadline).toLocaleDateString()}
                  </p>
                  <div style={{ width: '15%' }}>
                    {item.date >=
                    new Date().setDate(new Date().getDate() - 5) ? (
                      <Badge color="success" pill className="mb-1">
                        <IntlMessages id="New" />
                      </Badge>
                    ) : null}
                  </div>
                  <NavLink to={{pathname: '/app/assignments/preview', state: {id: item._id}}} className="mx-2">
                    <Button>Preview</Button>
                  </NavLink>
                  <NavLink to="/profile" className="mx-2">
                    <Button>Submissions</Button>
                  </NavLink>
                </div>
               
              </Card>
            </Colxx>
          ))}
        </Row>
      ) : null}

      {assignmentData.length ? (
        <Row>
          <Pagination
            currentPage={currentPage}
            totalPage={totalPages}
            onChangePage={(i) => setCurrentPage(i)}
          />
        </Row>
      ) : null}
    </>
  );
};

export default ViewAssignment;
