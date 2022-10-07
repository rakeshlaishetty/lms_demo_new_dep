import React, {useEffect, useState} from 'react'
import './AnotherRedirect.css'

function AnotherRedirect() {
    const [profilePic, setProfilePic] = useState("-")
    const [name, setName] = useState("-")
    const [email, setEmail] = useState("-")
    const [phone, setPhone] = useState("-")
    const [address, setAddress] = useState("-")
    const [fatherName, setFatherName] = useState("-")
    const [inClass, setInClass] = useState("-")
    const [rollNo, setRollNo] = useState("-")
    const [division, setDivision] = useState("-")
    const [age, setAge] = useState("")
    const [fees, setFees] = useState("")
    const [attendance, setAttendance] = useState("-")
    const [submittedAss, setSubmittedAss] = useState("-")
    
    const getStu = ()=>{
        const stuData = localStorage.getItem('student')
        var json = JSON.parse(stuData)
        setName(json.name);
        setEmail(json.email);
        setPhone(json.phone);
        setAddress(json.address);
        setFatherName(json.father_name);
        setInClass(json.class)
        setRollNo(json.rollnumber)
        setDivision(json.division)
        setAge(json.age)
        setFees(json.fees)
        setAttendance(json.attendance)
        setSubmittedAss(json.submittedAssignment)
        setProfilePic(json.profile_pic)

    }



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
        getStu()
    }, [])
    
  


    return (
        <>
        <div className="fig-navbar">
            <button className="fig-btn">
              Sign Out
            </button>
        </div>
  
  
          <div className="body-container">
  
  
              <div className="header-sec">
  
  
                      <div className="profile-pic-sec">
  
                      </div>
  
  
                <div className="gray-sec">
  
                  <div className="gray-text-sec">
                    <span style={{fontWeight: "600", fontSize: "18px", color: "black"}}>{name}</span>
                    <span style={{fontSize: "12px"}}>Class: <strong>{inClass}</strong></span>
                    <span style={{fontSize: "12px"}}>Roll No: <strong>{rollNo}</strong></span>
                 </div>
  
                 </div>
  
  
  
                    <div className="white-sec">
  
                        <div className="white-btn-sec">
                          <button className="contact">CONTACT INFO</button>
                          <button className="edit">EDIT</button>
                        </div>
  
                          <div className="white-text-sec">
                            View Profile
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
  
  
  
  
  
  
            <div className="right-sec">
                <div className="one-sec"></div>
                <div className="two-sec"></div>
                <div className="three-sec"></div>
  
                <button>+</button>
            </div>
  
  
            <div className={viewer} onClick={dropDown}>
              <h2>Achievements</h2>
              <i className={`fa-solid fa-angle-${arrow}`}></i>
            </div>
  
  
          </div>
        </>
    )
}

export default AnotherRedirect