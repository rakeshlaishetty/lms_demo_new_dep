/* eslint no-underscore-dangle: 0 */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardBody, CardTitle } from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import axios from 'axios';
import empty from '../../assets/img/empty-folder.png';
// import { adminRoot } from 'constants/defaultValues';

const Tickets = () => {
    const [data, setData] = useState([]);

    const getAssignments = async () => {
        const adm = JSON.parse(window.localStorage.getItem('userdata'));
        const res = await axios.get(`/assignments/getDashboardAssignmentsTeacher?facultyId=${adm._id}`);
        if(res.status === 200){
            setData(res.data);
        }
    }

    useEffect(() => {
        getAssignments();
    }, []);

  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Latest assignments" />
        </CardTitle>
        <div className="dashboard-list-with-user">
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            {/* {data.map((ticket, index) => {
              return (
                <div
                  key={index}
                  className="d-flex flex-row mb-3 pb-3 border-bottom"
                >
                  <NavLink to={`${adminRoot}/pages/product/details`}>
                    <img
                      src={ticket.thumb}
                      alt={ticket.title}
                      className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                    />
                  </NavLink>

                  <div className="pl-3 pr-2">
                    <NavLink to={`${adminRoot}/pages/product/details`}>
                      <p className="font-weight-medium mb-0 ">{ticket.title}</p>
                      <p className="text-muted mb-0 text-small">
                        {ticket.detail}
                      </p>
                    </NavLink>
                  </div>
                </div>
              );
            })} */}
            {
                data.length ?
                <div>
                    {
                      data.map((item, index) => 
                      <div
                      key={index}
                      className="d-flex flex-row mb-3 pb-3 border-bottom"
                    >
                      <div className="pl-3 pr-2">
                      <p className="font-weight-medium mb-0 ">{item.assignmentName}</p>
                      <p className="text-muted mb-0 text-small">
                        {(new Date(item.deadline)).toDateString()}
                      </p>
                      </div>

                    </div>
                      )
                    }
                </div>
                :
                <div style={{textAlign: 'center'}}>
                    <img className='mt-3' alt='empty-folder' src={empty} style={{height: '100px'}}/>
                    <p className='text-muted mt-5'>No new assignments.</p>
                </div>
            }
          </PerfectScrollbar>
        </div>
      </CardBody>
    </Card>
  );
};
export default Tickets;
