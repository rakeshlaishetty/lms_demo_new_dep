/* eslint-disable react/no-array-index-key */
import React from 'react';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardBody, CardTitle } from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
// import data from 'data/tickets';
import { adminRoot } from 'constants/defaultValues';
import defaultUser from '../../assets/img/profiles/default-user.png';

const Defaulters = ({data}) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Defaulters" />
        </CardTitle>
        <div className="dashboard-list-with-user">
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="d-flex flex-row mb-3 pb-3 border-bottom"
                >
                  <NavLink to={`${adminRoot}/pages/product/details`}>
                    <img
                      src={defaultUser}
                      alt='profile-pic'
                      className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                    />
                  </NavLink>

                  <div className="pl-3 pr-2">
                    <NavLink to={`${adminRoot}/pages/product/details`}>
                      <p className="font-weight-medium mb-0 ">{item.name}</p>
                      <p className="text-muted mb-0 text-small">
                        {item.class}
                      </p>
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </PerfectScrollbar>
        </div>
      </CardBody>
    </Card>
  );
};
export default Defaulters;
