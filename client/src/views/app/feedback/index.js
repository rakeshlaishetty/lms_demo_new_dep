import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Feedback = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './feedback')
);
const Reports = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './reports')
);

const Rating = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/give-feedback`}
        render={(props) => <Feedback {...props} />}
      />
      <Route
        path={`${match.url}/reports`}
        render={(props) => <Reports {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Rating;
