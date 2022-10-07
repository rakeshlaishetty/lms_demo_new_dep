import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import "./style.css";
import useStyles from "./styles";
import { styled } from "@mui/system";

// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";
import axios from "axios";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";

const DivHeadr = styled("div")({
  maxWidth: "100vw",
  width: "100vw",
  fontFamily: "QuickSand",
});
function Login(props) {
  const chechUserLogin = () => {
    axios
      .post("/login", {
        email: loginValue,
        password: passwordValue,
      })
      .then((res) => {
        if (res.data.status == true) {
          // window.location.href = "http://localhost:3000/#/app/dashboard";
          // props.history.push("/app/dashboard");
          // console.log("logged in success");
          localStorage.setItem("userdata", JSON.stringify(res.data.userdata));
          localStorage.setItem("user", res.data.user);
          loginUser(
            userDispatch,
            loginValue,
            passwordValue,
            props.history,
            setIsLoading,
            setError
          );
          if (res.data.user === "teacher" || res.data.user === "student") {
            localStorage.setItem(
              "classDetails",
              JSON.stringify(res.data.classDetails)
            );
          }
        }
      })
      .catch((e) => {
        console.log("errooe while login withj user");
      });
  };
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  return (
    <DivHeadr>
      <div className="row m-auto login-index-main">
        <div className="container center d-flex justify-content-around h-100 align-content-center">
          <div className="col-12 login-index-fixed-row d-flex justify-content-around">
            <div className="row h-100 login-index-rows">
              <div className="d-none d-lg-flex d-md-flex col-lg-6 col-md-6 text-center text-bg Login-first-column-Page">
                <p>Nice to See you Again</p>
                <h2>Welcome back</h2>
                <hr />
                <p>Lorem10 Lorem10 Lorem10 vLorem10Lorem10 </p>
              </div>

              <div className="col-12 col-sm-12 col-md-6 h-100 col-lg-6 text-center login-index-login-page">
                <div className="col signin-form">
                  <div className="Login-tabs-style p-2">
                    <Tabs
                      value={activeTabId}
                      onChange={(e, id) => setActiveTabId(id)}
                      indicatorColor="primary"
                      textColor="primary"
                      centered
                    >
                      <Tab label="Login" classes={{ root: classes.tab }} />
                      <Tab label="New User" classes={{ root: classes.tab }} />
                    </Tabs>
                    {activeTabId === 0 && (
                      <React.Fragment>
                        <div className="Login-greeting-Buttons">
                          <span className="Login-js-greeting">
                            Welcome, User
                          </span>
                          {/* <button className="Login-googleButton">
                            <img
                              src={google}
                              alt="google"
                              className={classes.googleIcon}
                            />
                            &nbsp;Sign in with Google
                          </button> */}
                        </div>
                        {/* <span className="Login-OR">Or</span> */}
                        <Fade in={error}>
                          <Typography
                            color="secondary"
                            className={classes.errorMessage}
                          >
                            Something is wrong with your login or password :(
                          </Typography>
                        </Fade>
                        <div className="Login-login-index-main-textfields">
                          <TextField
                            id="email"
                            InputProps={{
                              classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                              },
                            }}
                            value={loginValue}
                            onChange={(e) => setLoginValue(e.target.value)}
                            margin="normal"
                            placeholder="Email Adress"
                            type="email"
                            variant="filled"
                          />
                          <TextField
                            id="password"
                            InputProps={{
                              classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                              },
                            }}
                            variant="filled"
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                            margin="normal"
                            placeholder="Password"
                            type="password"
                          />
                          <div className={classes.formButtons}>
                            {isLoading ? (
                              <CircularProgress
                                size={26}
                                className={classes.loginLoader}
                              />
                            ) : (
                              <Button
                                disabled={
                                  loginValue.length === 0 ||
                                  passwordValue.length === 0
                                }
                                onClick={() =>
                                  // loginUser(
                                  //   userDispatch,
                                  //   loginValue,
                                  //   passwordValue,
                                  //   props.history,
                                  //   setIsLoading,
                                  //   setError,
                                  // )
                                  chechUserLogin()
                                }
                                variant="contained"
                                color="primary"
                                size="large"
                              >
                                Login
                              </Button>
                            )}
                            <Button
                              color="primary"
                              size="large"
                              className={classes.forgetButton}
                            >
                              Forget Password
                            </Button>
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                    {activeTabId === 1 && (
                      <React.Fragment>
                        <div className="Login-signup-tab">
                          <div className="Login-create-Account-text">
                            <span className="Login-js-greeting">Welcome!</span>
                            <span className="Login-js-greeting">
                              Create your account
                            </span>
                          </div>
                          <Fade in={error}>
                            <Typography
                              color="secondary"
                              className={classes.errorMessage}
                            >
                              Something is wrong with your login or password :(
                            </Typography>
                          </Fade>
                          <div className="Login-login-index-main-textfields">
                            <TextField
                              id="name"
                              InputProps={{
                                classes: {
                                  underline: classes.textFieldUnderline,
                                  input: classes.textField,
                                },
                              }}
                              value={nameValue}
                              onChange={(e) => setNameValue(e.target.value)}
                              margin="normal"
                              placeholder="Full Name"
                              type="email"
                              fullWidth
                              variant="filled"
                            />
                            <TextField
                              id="email"
                              InputProps={{
                                classes: {
                                  underline: classes.textFieldUnderline,
                                  input: classes.textField,
                                },
                              }}
                              value={loginValue}
                              onChange={(e) => setLoginValue(e.target.value)}
                              margin="normal"
                              placeholder="Email Adress"
                              type="email"
                              fullWidth
                              variant="filled"
                            />
                            <TextField
                              id="password"
                              InputProps={{
                                classes: {
                                  underline: classes.textFieldUnderline,
                                  input: classes.textField,
                                },
                              }}
                              value={passwordValue}
                              onChange={(e) => setPasswordValue(e.target.value)}
                              margin="normal"
                              placeholder="Password"
                              type="password"
                              fullWidth
                              variant="filled"
                            />
                            <div className={classes.creatingButtonContainer}>
                              {isLoading ? (
                                <CircularProgress size={26} />
                              ) : (
                                <Button
                                  onClick={() =>
                                    loginUser(
                                      userDispatch,
                                      loginValue,
                                      passwordValue,
                                      props.history,
                                      setIsLoading,
                                      setError
                                    )
                                  }
                                  disabled={
                                    loginValue.length === 0 ||
                                    passwordValue.length === 0 ||
                                    nameValue.length === 0
                                  }
                                  size="large"
                                  variant="contained"
                                  color="primary"
                                  className={classes.createAccountButton}
                                >
                                  Create your account
                                </Button>
                              )}
                            </div>
                          </div>

                          {/* <div className="Login-greeting-Buttons">
                            <span className="Login-js-greeting">or</span>
                            <button className="Login-googleButton">
                              <img
                                src={google}
                                alt="google"
                                className={classes.googleIcon}
                              />
                              &nbsp;Sign in with Google
                            </button>
                          </div> */}
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DivHeadr>
  );
}

export default withRouter(Login);
