import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';

const Dashboards = React.lazy(() =>
  import('./dashboards')
);
const Pages = React.lazy(() =>
  import('./pages')
);
const Applications = React.lazy(() =>
  import('./applications')
);
const Admissions = React.lazy(() =>
  import('./admissions')
);
const Attendance = React.lazy(() =>
  import('./attendance')
);
const Fees = React.lazy(() =>
  import('./fees')
);
const Feedback = React.lazy(() =>
  import('./feedback')
);
const Staff = React.lazy(() =>
  import('./staff')
);
const YourClass = React.lazy(() =>
  import('./your-class')
);
const Assignments = React.lazy(() =>
  import('./assignments')
);
const Announcements = React.lazy(() =>
  import('./announcements')
);
const Library = React.lazy(() =>
  import('./library')
);
const Ui = React.lazy(() => import('./ui'));
const Menu = React.lazy(() => import('./menu'));
const BlankPage = React.lazy(() =>
  import('./blank-page')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboards`}
            />
            <Route
              path={`${match.url}/dashboards`}
              render={(props) => <Dashboards {...props} />}
            />
            <Route
              path={`${match.url}/applications`}
              render={(props) => <Applications {...props} />}
            />
            <Route
              path={`${match.url}/assignments`}
              render={(props) => <Assignments {...props} />}
            />
            <Route
              path={`${match.url}/admissions`}
              render={(props) => <Admissions {...props} />}
            />
            <Route
              path={`${match.url}/attendance`}
              render={(props) => <Attendance {...props} />}
            />
            <Route
              path={`${match.url}/announcements`}
              render={(props) => <Announcements {...props} />}
            />
            <Route
              path={`${match.url}/fees`}
              render={(props) => <Fees {...props} />}
            />
            <Route
              path={`${match.url}/feedback`}
              render={(props) => <Feedback {...props} />}
            />
            <Route
              path={`${match.url}/staff`}
              render={(props) => <Staff {...props} />}
            />
            <Route
              path={`${match.url}/library`}
              render={(props) => <Library {...props} />}
            />
            
            {/* <ProtectedRoute
                    path={`${match.url}/applications`}
                    component={Applications}
                    roles={[UserRole.Admin]}
            /> */}
            <Route
              path={`${match.url}/pages`}
              render={(props) => <Pages {...props} />}
            />
            <Route
              path={`${match.url}/ui`}
              render={(props) => <Ui {...props} />}
            />
            <Route
              path={`${match.url}/menu`}
              render={(props) => <Menu {...props} />}
            />
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Route
              path={`${match.url}/your-class`}
              render={(props) => <YourClass {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
