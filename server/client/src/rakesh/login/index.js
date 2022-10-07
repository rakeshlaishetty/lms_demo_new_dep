import React from "react";
import "./style.css";
import { styled } from "@mui/system";
const DivHeadr = styled("div")({
  maxWidth: "100vw",
  width: "100vw",
  fontFamily: "QuickSand",
});
const index = () => {
  return (
    <DivHeadr>
      <div className="row m-auto login-index-main">
        <div className="container center d-flex justify-content-around h-50 align-content-center">
          <div className="col-12 login-index-fixed-row d-flex justify-content-around">
            <div className="row h-100 login-index-row">
              <div className="col-6 col-sm-12 col-md-6 text-center text-bg">
                <p>Nice to See you Again</p>
                <h2>Welcome back</h2>
                <hr />
                <p>Lorem10 Lorem10 Lorem10 vLorem10Lorem10 </p>
              </div>

              <div className="col-6 col-sm-12 col-md-6 text-center login-index-login-page">
                <div className="col login-index-login-page signin-form">
                  <h2>Login</h2>
                  <form action="#" class="signin-form">
                    <div class="form-group mb-3">
                      <label class="label" for="name">
                        Username
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Username"
                        required
                      />
                    </div>
                    <div class="form-group mb-3">
                      <label class="label" for="password">
                        Password
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <button
                        type="submit"
                        class="form-control btn btn-primary rounded submit px-5"
                      >
                        Sign In
                      </button>
                    </div>
                    <div class="form-group d-md-flex form-group-check-text">
                      <div class="text-left">
                        <label class="checkbox-wrap checkbox-primary mb-0">
                          Remember Me
                          <input type="checkbox" checked />
                          <span class="checkmark"></span>
                        </label>
                      </div>
                      <div class="text-md-right">
                        <a href="#">Forgot Password</a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DivHeadr>
  );
};

export default index;
