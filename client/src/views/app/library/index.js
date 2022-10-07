import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const TeacherLibrary = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './teacher-library')
);
const StudentLibrary = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './student-library')
);

const Rating = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/teacher-library`}
        render={(props) => <TeacherLibrary {...props} />}
      />
      <Route
        path={`${match.url}/student-library`}
        render={(props) => <StudentLibrary {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Rating;
