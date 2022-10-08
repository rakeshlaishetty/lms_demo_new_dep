import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const EmployeeList = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './employee-list')
);
const Offer = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './offer-letter')
);

const Admissions = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/employee-list`}
        render={(props) => <EmployeeList {...props} />}
      />
      <Route
        path={`${match.url}/offer-letter`}
        render={(props) => <Offer {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Admissions;
