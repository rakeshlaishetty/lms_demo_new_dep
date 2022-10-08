import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const AdmitStudent = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './admit-student')
);
const ViewAdmissions = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './view-admissions')
);
const RecentAdmissions = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './recent-admissions')
);
const Analytics = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './analytics')
);

const Admissions = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/admit-student`}
        render={(props) => <AdmitStudent {...props} />}
      />
      <Route
        path={`${match.url}/view-admissions`}
        render={(props) => <ViewAdmissions {...props} />}
      />
      <Route
        path={`${match.url}/recent-admissions`}
        render={(props) => <RecentAdmissions {...props} />}
      />
      <Route
        path={`${match.url}/analytics`}
        render={(props) => <Analytics {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Admissions;
