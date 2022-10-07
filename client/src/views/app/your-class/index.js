import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ClassSubjects = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './class-subjects')
);
const ClassStudents = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './class-students')
);
const ClassSchedule = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './class-schedule')
);

const YourClass = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/class-subjects`}
        render={(props) => <ClassSubjects {...props} />}
      />
      <Route
        path={`${match.url}/class-students`}
        render={(props) => <ClassStudents {...props} />}
      />
      <Route
        path={`${match.url}/class-schedule`}
        render={(props) => <ClassSchedule {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default YourClass;
