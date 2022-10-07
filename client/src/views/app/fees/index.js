import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const FeeStructure = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './view-structure')
);
const EditFeeStructure = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './edit-structure')
);
const Dues = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './dues')
);
const AddTransaction = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './add-transaction')
);

const Admissions = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/fee-structure`}
        render={(props) => <FeeStructure {...props} />}
      />
      <Route
        path={`${match.url}/edit-fee-structure`}
        render={(props) => <EditFeeStructure {...props} />}
      />
      <Route
        path={`${match.url}/dues`}
        render={(props) => <Dues {...props} />}
      />
      <Route
        path={`${match.url}/add-transaction`}
        render={(props) => <AddTransaction {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Admissions;
