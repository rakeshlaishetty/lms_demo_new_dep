/* eslint no-underscore-dangle: 0 */
import React, { useState, useEffect } from 'react';

import {
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

const ViewAdmissions = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [admissionData, setAdmissionData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [listSize, setListSize] = useState(4);

  const startIndex = (currentPage - 1) * listSize;
  const endIndex = currentPage * listSize;

  const pageSizes = [4, 8, 12, 20];

  const getClasses = async () => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));
    const res = await axios.get(`/classes/getClasses?schoolId=${adm.schoolId}`);
    if (res.status === 200) {
      setClasses(res.data);
    }
  };

  const getAdmissionData = async () => {
    if(selectedClass){
        const res = await axios.get(
            `/admission/getAdmission?classId=${selectedClass._id}`
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
            setAdmissionData(data);
            setTotalPages(data.length);
            setTotal(res.data.length);
          }
    }
  };

  useEffect(() => {
    getAdmissionData();
  }, [listSize])

  useEffect(() => {
    getClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      getAdmissionData();
    }
  }, [selectedClass]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>View Admissions</h1>

            <div className="text-zero top-right-button-container">
              <Button>
                <IntlMessages id="Admit New +" />{' '}
              </Button>
            </div>
          </div>

          <div className="d-block d-md-inline-block pt-1">
            <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
              <DropdownToggle caret color="outline-dark" size="l">
                <IntlMessages id="Choose Class: " />
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
          </div>
          {admissionData.length ? (
            <div className="float-md-right pt-1">
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
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      {admissionData.length ? (
        <Row>
          {admissionData[currentPage - 1].map((item) => (
            <Colxx key={uuid()} xxs="12" className="mb-3">
              <Card className="d-flex flex-row">
                <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                  <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                    <Colxx sm={4}>
                    <p className="list-item-heading mb-1 truncate">
                        {item.name}
                    </p>
                    </Colxx>
                    <Colxx sm={6}>
                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {(new Date(item.admissionDate)).toLocaleDateString()}
              </p>
              </Colxx>
              <Colxx sm={2}>
              <NavLink to='/profile' className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  View Profile
                </p>
              </NavLink>
              </Colxx>
                  </div>
                </div>
              </Card>
            </Colxx>
          ))}
        </Row>
      ) : null}
      {typeof admissionData[0] !== 'undefined' ? (
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

export default ViewAdmissions;
