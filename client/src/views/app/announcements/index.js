import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const YourAnnouncements = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './your-announcements')
);

const Admissions = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/your-announcements`}
        render={(props) => <YourAnnouncements {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Admissions;
