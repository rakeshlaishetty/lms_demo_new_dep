import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import admin from '../../images/admin.jpg';
import student from '../../images/student.jpg';
import teacher from '../../images/teacher.jpg';
import "../../styles/styles.css";

const LoginAs = () => {

    const history = useHistory();

    return(
        <div>

            <div className="login-as-card">
                <div>
                    <h1 style={{textAlign: 'center'}}>Login As</h1>
                </div>
                <div className="d-flex justify-content-evenly align-items-center">
                    <div onClick={() => history.push('/login')} className='px-3 admin d-flex flex-column'>
                        <img style={{height: '200px', padding: '5px', borderRadius: '100px', border: '1px solid #aaa'}} className="login-as-img" src={admin}/>
                        <h3 className="mt-3" style={{textAlign: 'center'}}>Admin</h3>
                    </div>
                    <div onClick={() => history.push('/login')} className='px-3 admin d-flex flex-column'>
                        <img style={{height: '200px', padding: '5px', borderRadius: '100px', border: '1px solid #aaa'}} className="login-as-img" src={student}/>
                        <h3 className="mt-3" style={{textAlign: 'center'}}>Student</h3>
                    </div>
                    <div onClick={() => history.push('/login')} className='px-3 admin d-flex flex-column'>
                        <img style={{height: '200px', padding: '5px', borderRadius: '100px', border: '1px solid #aaa'}} className="login-as-img" src={teacher}/>
                        <h3 className="mt-3" style={{textAlign: 'center'}}>Teacher</h3>
                    </div>
                </div>
            </div>  

        </div>
    )
}

export default LoginAs;