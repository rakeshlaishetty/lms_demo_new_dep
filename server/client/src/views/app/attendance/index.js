import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const StudentAttendance = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './student-attendance')
);
const TeacherAttendance = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './teacher-attendance')
);
const ClassAttendance = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './class-attendance')
);
const YourAttendance = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './your-attendance')
);


const Admissions = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/student-attendance`}
        render={(props) => <StudentAttendance {...props} />}
      />
      <Route
        path={`${match.url}/teacher-attendance`}
        render={(props) => <TeacherAttendance {...props} />}
      />
      <Route
        path={`${match.url}/class-attendance`}
        render={(props) => <ClassAttendance {...props} />}
      />
      <Route
        path={`${match.url}/your-attendance`}
        render={(props) => <YourAttendance {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Admissions;
