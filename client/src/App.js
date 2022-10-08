import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import './helpers/Firebase';
import AppLocale from './lang';
import ColorSwitcher from './components/common/ColorSwitcher';
import { NotificationContainer } from './components/common/react-notifications';
import {
  isMultiColorActive,
  adminRoot,
  UserRole,
} from './constants/defaultValues';
import { getDirection } from './helpers/Utils';
import { ProtectedRoute } from './helpers/authHelper';

const ViewHome = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views/home/Pages/Splash')
);

// const School = React.lazy(() =>
//   import(/* webpackChunkName: "views" */ './views/home/Pages/School')
// );

const Stemlabsolutions = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views/home/Pages/Stemlabsolutions')
);

const Ataltinkeringlab = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views/home/Pages/Ataltinkeringlab')
);

const ELearning = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views/home/Pages/ELearning')
);

const SchoolManagement = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views/home/Pages/SchoolManagement')
);

const Contactus = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views/home/Pages/ContactUs')
);

const Aboutus = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views/home/Pages/Aboutus')
);

const PrivacyPolicy = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views/home/Pages/PrivacyPolicy')
);

const RefundCancellation = React.lazy(() =>
  import(
    /* webpackChunkName: "views" */ './views/home/Pages/RefundCancellation'
  )
);

const Career = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views/home/Pages/Career')
);

const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app')
);
const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app/dashboards')
);
const Admissions = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app/admissions')
);
const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/user')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
);
const ViewUnauthorized = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/unauthorized')
);

const App = ({ locale }) => {
  const direction = getDirection();
  const currentAppLocale = AppLocale[locale];
  useEffect(() => {
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }, [direction]);

  return (
    <div className="h-100">
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <>
          <NotificationContainer />
          {isMultiColorActive && <ColorSwitcher />}
          <Suspense fallback={<div className="loading" />}>
            <Router>
              <Switch>
                <ProtectedRoute
                  path={adminRoot}
                  component={ViewApp}
                  roles={[UserRole.Admin, UserRole.Editor]}
                />
                <Route
                  path="/admissions"
                  render={(props) => <Admissions {...props} />}
                />
                <Route
                  path="/user"
                  render={(props) => <ViewUser {...props} />}
                />
                <Route
                  path="/error"
                  exact
                  render={(props) => <ViewError {...props} />}
                />
                <Route
                  path="/unauthorized"
                  exact
                  render={(props) => <ViewUnauthorized {...props} />}
                />
                <Route
                  path="/dashboard"
                  exact
                  render={(props) => <Dashboard {...props} />}
                />
                <Route
                  path="/"
                  exact
                  render={(props) => <ViewHome {...props} />}
                />

                {/* <Route
                  path="/Schoolmanagement"
                  exact
                  render={(props) => <School {...props} />}
                /> */}

                <Route
                  path="/Stemlabsolutions"
                  exact
                  render={(props) => <Stemlabsolutions {...props} />}
                />

                <Route
                  path="/contactus"
                  exact
                  render={(props) => <Contactus {...props} />}
                />

                <Route
                  path="/aboutus"
                  exact
                  render={(props) => <Aboutus {...props} />}
                />

                <Route
                  path="/privacypolicy"
                  exact
                  render={(props) => <PrivacyPolicy {...props} />}
                />

                <Route
                  path="/refundcancellation"
                  exact
                  render={(props) => <RefundCancellation {...props} />}
                />

                <Route
                  path="/career"
                  exact
                  render={(props) => <Career {...props} />}
                />

                <Route
                  path="/ataltinkeringlab"
                  exact
                  render={(props) => <Ataltinkeringlab {...props} />}
                />

                <Route
                  path="/elearning"
                  exact
                  render={(props) => <ELearning {...props} />}
                />

                <Route
                  path="/schoolmanagement"
                  exact
                  render={(props) => <SchoolManagement {...props} />}
                />
                {/*
                <Redirect exact from="/" to={adminRoot} />
                */}
                <Redirect to="/error" />
              </Switch>
            </Router>
          </Suspense>
        </>
      </IntlProvider>
    </div>
  );
};

const mapStateToProps = ({ authUser, settings }) => {
  const { currentUser } = authUser;
  const { locale } = settings;
  return { currentUser, locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
