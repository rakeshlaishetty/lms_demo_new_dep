import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const View = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './view-assignments')
);
const Create = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './create-assignment')
);
const Preview = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './preview')
);
const Solve = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './solve')
);
const Score = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './score')
);
const Rankings = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './rankings')
);
const YourAssignments = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './your-assignments')
);
const YourPerformance = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './your-performance')
);

const YourClass = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/view-assignments`}
        render={(props) => <View {...props} />}
      />
      <Route
        path={`${match.url}/create-assignment`}
        render={(props) => <Create {...props} />}
      />
      <Route
        path={`${match.url}/preview`}
        render={(props) => <Preview {...props} />}
      />
      <Route
        path={`${match.url}/solve`}
        render={(props) => <Solve {...props} />}
      />
      <Route
        path={`${match.url}/score`}
        render={(props) => <Score {...props} />}
      />
      <Route
        path={`${match.url}/rankings`}
        render={(props) => <Rankings {...props} />}
      />
      <Route
        path={`${match.url}/your-assignments`}
        render={(props) => <YourAssignments {...props} />}
      />
      <Route
        path={`${match.url}/your-performance`}
        render={(props) => <YourPerformance {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default YourClass;
