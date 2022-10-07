import React from 'react';
import {useState, useEffect} from 'react';
import { withRouter, useHistory, useLocation } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import {Button} from "@material-ui/core";

const YourProfile = () => {

  const [user, setUser] = useState(null)

    const history = useHistory();
    const location = useLocation();
    
    const [viewer, setViewer] = useState("achieve-sec-close")
    const [arrow, setArrow] = useState("down")
  
    const dropDown = ()=>{
      if (viewer==="achieve-sec-close"){
        setViewer('achieve-sec-open')
        setArrow('up')
      }
      else{
        setViewer('achieve-sec-close')
        setArrow('down')
      }
    }

    useEffect(() => {
      const student = JSON.parse(window.localStorage.getItem("userdata"));
      setUser(student);
    }, [])

    return(
        <>
        
          {
            user ?
            <div className="body-container">
  
  
              <div className="header-sec">
  
  
                      <div className="profile-pic-sec">
  
                      </div>
  
  
                <div className="gray-sec">
  
                  <div className="gray-text-sec">
                    {/* <span style={{fontWeight: "600", fontSize: "18px", color: "black"}}>{name}</span>
                    <span style={{fontSize: "12px"}}>Class: <strong>{inClass}</strong></span>
                    <span style={{fontSize: "12px"}}>Roll No: <strong>{rollNo}</strong></span> */}
                 </div>
  
                 </div>
  
  
  
                    <div style={{textAlign: 'left', paddingRight: '5%'}} className="white-sec">
  
                        <div className="white-btn-sec">
                          <h2>{user.name}</h2>
                          <h5 className='text-muted'>8 - B</h5>
                          {/* <button className="contact">CONTACT INFO</button>
                          <button className="edit">EDIT</button> */}
                        </div>
  
                          {/* <div className="white-text-sec">
                            View Profile
                          </div> */}
  
                    </div>
  
              </div>

              <div style={{textAlign: 'left'}} className='mt-4 profile-info'>
                <div style={{padding: '1%'}} className="body-up-sec">
                  <h4 className='mt-5 mx-3'>Personal Details</h4>
                </div>

                <div className='d-flex flex-column justify-content-start align-items-start' style={{textAlign: 'left', paddingBottom: '3%', paddingLeft: '4%', paddingRight: '4%', paddingTop: '3%'}}>
                  <div style={{borderBottom: '1px solid #eee', width: '100%', paddingBottom: '1%'}} className='d-flex flex-column justify-content-start align-items-start mt-3'>
                    <span style={{color: '#777', fontWeight: 'bold'}}>Gender</span>
                    <span style={{fontSize: '1.2rem'}}>Male</span>
                  </div>

                  <div style={{borderBottom: '1px solid #eee', width: '100%', paddingBottom: '1%'}} className='d-flex flex-column justify-content-start align-items-start mt-3'>
                    <span style={{color: '#777', fontWeight: 'bold'}}>Date of Birth</span>
                    <span style={{fontSize: '1.2rem'}}>12 Nov 2001</span>
                  </div>

                  <div style={{borderBottom: '1px solid #eee', width: '100%', paddingBottom: '1%'}} className='d-flex flex-column justify-content-start align-items-start mt-3'>
                    <span style={{color: '#777', fontWeight: 'bold'}}>Phone</span>
                    <span style={{fontSize: '1.2rem'}}>12345678</span>
                  </div>

                  <div style={{borderBottom: '1px solid #eee', width: '100%', paddingBottom: '1%'}} className='d-flex flex-column justify-content-start align-items-start mt-3'>
                    <span style={{color: '#777', fontWeight: 'bold'}}>Email</span>
                    <span style={{fontSize: '1.2rem'}}>archit@gmail.com</span>
                  </div>

                  <div style={{borderBottom: '1px solid #eee', width: '100%', paddingBottom: '1%'}} className='d-flex flex-column justify-content-start align-items-start mt-3'>
                    <span style={{color: '#777', fontWeight: 'bold'}}>Permanent Address</span>
                    <span style={{fontSize: '1.2rem'}}>Sai park dy patil collage road pune</span>
                  </div>
                </div>

              </div>


              <div style={{textAlign: 'left'}} className='mt-4 profile-info'>
                <div style={{padding: '1%'}} className="body-up-sec">
                  <h4 className='mt-5 mx-3'>Parent/Guardian Details</h4>
                </div>

                <div className='d-flex flex-column justify-content-start align-items-start' style={{textAlign: 'left', paddingBottom: '3%', paddingLeft: '4%', paddingRight: '4%', paddingTop: '3%'}}>
                  <div style={{borderBottom: '1px solid #eee', width: '100%', paddingBottom: '1%'}} className='d-flex flex-column justify-content-start align-items-start mt-3'>
                    <span style={{color: '#777', fontWeight: 'bold'}}>Father's name</span>
                    <span style={{fontSize: '1.2rem'}}>Ashish Chitre</span>
                  </div>

                  <div style={{borderBottom: '1px solid #eee', width: '100%', paddingBottom: '1%'}} className='d-flex flex-column justify-content-start align-items-start mt-3'>
                    <span style={{color: '#777', fontWeight: 'bold'}}>Father's contact</span>
                    <span style={{fontSize: '1.2rem'}}>12345678</span>
                  </div>

                  <div style={{borderBottom: '1px solid #eee', width: '100%', paddingBottom: '1%'}} className='d-flex flex-column justify-content-start align-items-start mt-3'>
                    <span style={{color: '#777', fontWeight: 'bold'}}>Father's email</span>
                    <span style={{fontSize: '1.2rem'}}>ashish@gmail.com</span>
                  </div>

                  <div style={{borderBottom: '1px solid #eee', width: '100%', paddingBottom: '1%'}} className='d-flex flex-column justify-content-start align-items-start mt-3'>
                    <span style={{color: '#777', fontWeight: 'bold'}}>Mother's name</span>
                    <span style={{fontSize: '1.2rem'}}>Rashmi Chitre</span>
                  </div>

                  <div style={{borderBottom: '1px solid #eee', width: '100%', paddingBottom: '1%'}} className='d-flex flex-column justify-content-start align-items-start mt-3'>
                    <span style={{color: '#777', fontWeight: 'bold'}}>Mother's contact</span>
                    <span style={{fontSize: '1.2rem'}}>12345678</span>
                  </div>

                  <div style={{borderBottom: '1px solid #eee', width: '100%', paddingBottom: '1%'}} className='d-flex flex-column justify-content-start align-items-start mt-3'>
                    <span style={{color: '#777', fontWeight: 'bold'}}>Mother's email</span>
                    <span style={{fontSize: '1.2rem'}}>rashmi@gmail.com</span>
                  </div>
                </div>

              </div>


              <div style={{textAlign: 'left'}} className='mt-4 profile-info'>
                <div style={{padding: '1%'}} className="body-up-sec">
                  <h4 className='mt-5 mx-3'>Admission Details</h4>
                </div>

                <div className='d-flex flex-column justify-content-start align-items-start' style={{textAlign: 'left', paddingBottom: '3%', paddingLeft: '4%', paddingRight: '4%', paddingTop: '3%'}}>
                  <div style={{borderBottom: '1px solid #eee', width: '100%', paddingBottom: '1%'}} className='d-flex flex-column justify-content-start align-items-start mt-3'>
                    <span style={{color: '#777', fontWeight: 'bold'}}>Student ID</span>
                    <span style={{fontSize: '1.2rem'}}>628f56e4dcc782328d3d74e0</span>
                  </div>

                  <div style={{borderBottom: '1px solid #eee', width: '100%', paddingBottom: '1%'}} className='d-flex flex-column justify-content-start align-items-start mt-3'>
                    <span style={{color: '#777', fontWeight: 'bold'}}>Admission Date</span>
                    <span style={{fontSize: '1.2rem'}}>2 Jun 2012</span>
                  </div>

                  <div style={{borderBottom: '1px solid #eee', width: '100%', paddingBottom: '1%'}} className='d-flex flex-column justify-content-start align-items-start mt-3'>
                    <span style={{color: '#777', fontWeight: 'bold'}}>Payment Subscription</span>
                    <span style={{fontSize: '1.2rem'}}>Quarterly</span>
                  </div>

                 
                </div>

              </div>
  
  
  
            <div className="body-sec">
  
  
  
              <div className="body-up-sec">
              <h4>Performance</h4>
              <div className="body-btn">
                <button className="btn btn1" style={{color: "#000", backgroundColor: "#fff"}}>SCIENCE</button>
                <button className="btn btn2">MATHS</button>
                <button className="btn btn3">S. SCIENCE</button>
                <button className="btn btn4">ENGLISH</button>
                <button className="btn btn5">COMPUTER</button>
              </div>
              </div>
              
              <div className="body-down-sec"></div>
  
            </div>
  
            {/* <div className="right-sec">
                <div className="one-sec"></div>
                <div className="two-sec"></div>
                <div className="three-sec"></div>
  
                <button>+</button>
            </div> */}
  
            {/* <div className={viewer} onClick={dropDown}>
              <h2>Achievements</h2>
              <i className={`fa-solid fa-angle-${arrow}`}></i>
            </div>
   */}
  
          </div>
          :
          null
          }
        </>
    )

}

export default YourProfile;