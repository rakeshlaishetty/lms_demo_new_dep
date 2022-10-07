import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import IDCard from "../PDF Documents/IDCard";
import SalarySlip from "../PDF Documents/SalarySlip";
import FeeReceipt from "../PDF Documents/FeeReceipt";
import ParentPass from "../PDF Documents/ParentPass";
import StaffIDCard from "../PDF Documents/StaffIDCard";
import AdmissionDoc from "../PDF Documents/AdmissionPDF";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";
import LoginAs from "../pages/login-as/LoginAs";
import Profile from "../pages/profile/Profile";
import index from "../rakesh/login";
import Temp from "../pages/temp/Temp";
import Home1 from "../pages/Home1/Home";
// context
import { useUserState } from "../context/UserContext";
import AnotherRedirect from "../pages/dashboard/components/Table/AnotherRedirect";
import Features from "../rakesh/Features";
import Plans from "../rakesh/components/plans/Plans";

import "../rakesh/NewPages/assets/scss/style.css";

export default function App() {
  // global
  var { isAuthenticated } = useUserState();
  // console.log(isAuthenticated)
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Home1 />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        />
        {/* <Route exact path={"/aa"} component={Login}/> */}

        <Route exact path="/login" component={Login} />
        <Route exact path="/login-as" component={LoginAs} />
        <Route exact path="/temp" render={(routeProps) => <Temp />} />
        <Route
          exact
          path="/app/profile/admin"
          render={(routeProps) => <Profile />}
        />
        <Route
          exact
          path="/app/id-card/:name"
          render={(routeProps) => (
            <IDCard name={routeProps.match.params.name} />
          )}
        />
        <Route
          exact
          path="/app/parent-pass/:name"
          render={(routeProps) => (
            <ParentPass name={routeProps.match.params.name} />
          )}
        />
        <Route
          exact
          path="/app/admission-document/:name"
          render={(routeProps) => (
            <AdmissionDoc name={routeProps.match.params.name} />
          )}
        />
        <Route
          exact
          path="/app/staff-id-card/:name"
          render={(routeProps) => (
            <StaffIDCard name={routeProps.match.params.name} />
          )}
        />
        <Route
          exact
          path="/app/salary-slip/:id"
          render={(routeProps) => (
            <SalarySlip id={routeProps.match.params.id} />
          )}
        />
        <Route
          exact
          path="/app/fee-receipt/:id"
          render={(routeProps) => (
            <FeeReceipt transactionId={routeProps.match.params.id} />
          )}
        />
        <PrivateRoute path="/app" component={Layout} />
        <Route path="/rakesh/login" component={index} />
        <Route path="/rakesh/login" component={index} />
        <Route path="/features" component={Features} />
        <Route path="/plans" component={Plans} />
        <Route path="/student/:id" component={AnotherRedirect} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    // console.log(isAuthenticated,"from here")
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
