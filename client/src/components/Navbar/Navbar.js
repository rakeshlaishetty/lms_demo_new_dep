import React from "react";
import { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { useUserDispatch, signOut } from "../../context/UserContext";

import { FaSignOutAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import './Navbar.css';

const Navbar = (props) => {

    var userDispatch = useUserDispatch();
    const clearUser = () => {
        window.localStorage.clear();
    };
    
  return (
    <div>
      <nav role="navigation" class="primary-navigation">
        <ul>
          <li>
            <p>
              <FaUser style={{fontSize: '1.6em'}}/>
            </p>
            <ul class="dropdown mt-1">
              <li>
                <a href="#">Profile</a>
              </li>
              <hr />
              <li>
                <a onClick={() => {
                signOut(userDispatch, props.history);
                clearUser();
              }}>
                  Sign out <FaSignOutAlt className="mx-2" />
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
