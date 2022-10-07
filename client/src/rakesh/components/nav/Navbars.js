import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { IconContext } from "react-icons";

const Navbars = () => {
  const [showNav, setShowNav] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset);
    };
  }, []);

  const history = useHistory();

  return (
    <>
      <nav className="Navbars-navbar fixed-top ">
        {/* Logo */}
        <div className="Navbars-logo">
          <h2>Logo</h2>
        </div>
        {/* Nav menu */}
        <div
          className={
            showNav
              ? "Navbars-navbar-menu Navbars-mobile-menu-link dropdown"
              : "Navbars-navbar-menu dropdown"
          }
        >
          <ul>
            <div className="mobile-items-nav">
              <span>Logo</span>
              <IconContext.Provider
                value={{ color: "black", className: "global-class-name" }}
              >
                <span className="fabeer" onClick={() => setShowNav(!showNav)}>
                  <GrClose />
                </span>
              </IconContext.Provider>
            </div>
            <div>
              <div class="navigation">
                <a href="#">Softwares</a>
                <div class="navigation-content">
                  <a href="#">School management Software</a>
                  <a href="#">E-Learning Application</a>
                </div>
              </div>
              <div class="navigation">
                <a href="#">solutions</a>
                <div class="navigation-content">
                  <a href="#">STEM Lbas for School</a>
                  <a href="#">Digital Classroom solutions</a>
                </div>
              </div>
              <div class="navigation">
                <a href="#">Services</a>
                <div class="navigation-content">
                  <a href="#">Atal tinkering lab</a>
                  <a href="#">personalized Learning</a>
                </div>
              </div>
              <div class="navigation">
                <a href="#">Home</a>
              </div>
            </div>
          </ul>
        </div>
        <div className="Navbars-book-btn">
          <IconContext.Provider
            value={{ color: "#000", className: "global-class-name" }}
          >
            <div
              className="hamburger-menu"
              onClick={() => setShowNav(!showNav)}
            >
              {/* <a href="##" onClick={(value) => setShowNav(!value)}> */}
              <GiHamburgerMenu size={25} />
              {/* </a> */}
            </div>
          </IconContext.Provider>
          <button className="Navbars-book-btn">
            <a
              className="Navbars-nav-link"
              onClick={() => history.push("/login")}
            >
              Login
            </a>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbars;
