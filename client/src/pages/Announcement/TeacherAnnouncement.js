import React, { useState, useEffect } from "react";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import { Button } from "@material-ui/core";
import "../../styles/Announcement.css";
export default function TeacherAnnouncement() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [DropdownData, setDropdownData] = useState([]);
  const [textAreaError, setTextAreaError] = useState("");
  const [noSelecteTeacherError, setNoSelecteTeacherError] = useState("");
  const [announcement, setAnnouncement] = useState({teachers:[],message:""});
  const [message,setMessage]=useState("")
  const multiselectRef =React.createRef()
  const textAreaRef =React.createRef()
  useEffect(() => {
    axios.get("/allTeachersName").then((x) => {
      if (x.status == 200) {
        setDropdownData(x.data.teachers);
      }
    });
  }, []);

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!announcement.message){
      setTextAreaError("Message can't be empty")
    }
    else if(!announcement.teachers.length){
      setNoSelecteTeacherError("please select the teachers")
    }
    else{
      // console.log(announcement)
      textAreaRef.current.value=""
      setNoSelecteTeacherError('')
      multiselectRef.current.resetSelectedValues()
      setTextAreaError("")
      const {schoolId} = JSON.parse(window.localStorage.getItem('userdata'))
      axios.post("/teachers/Announcement",{...announcement, schoolId: schoolId})
      .then(res=>{
        if(res.status===200){
          console.log("came inside this")
          setMessage("Announcement created")
          setTimeout(()=>setMessage(""),3500)
          setAnnouncement({teachers:[],message:""})
        }
      })
      .catch(e=>console.log('error while posting the announcement'))
    }
  }

  return (
    <div className="bg-white  mx-5 p-5 my-5">
      <h1 className="text-success">{message}</h1>
      <div className="mb-3">
        <label htmlFor="message" className="form-label h4 fw-bold">
          Write your message:
        </label>
        <textarea
          className="form-control"
          id="message"
          ref={textAreaRef}
          onBlur={(e) => {
            
            if (e.target.value.trim()) {
              setTextAreaError("");
              e.target.value = e.target.value.trim();
              setAnnouncement({...announcement,message:e.target.value.trim()})
            } else setTextAreaError("message can't be empty");
          }}
          rows="8"
        ></textarea>
        <p className="text-danger h5 ps-2 py-2 mb-5 ">{textAreaError}</p>
      </div>
      {
        DropdownData.length?(<div>
          <div className="form-check form-check-inline  ">
            <input
              className="form-check-input h4 Announcement-radioInput"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              onClick={() => {
                setShowDropdown(false)
                setNoSelecteTeacherError("")
                setAnnouncement({...announcement,teachers:DropdownData})
                multiselectRef.current.resetSelectedValues()
              }}
            />
            <label className="form-check-label  h4" htmlFor="flexRadioDefault1" >
              All Teachers
            </label>
          </div>
          <div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input h4 Announcement-radioInput"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              onClick={() => setShowDropdown(true)}
            />
            <label className="form-check-label h4" htmlFor="flexRadioDefault2">
              Select Teachers
            </label>
          </div>
          <div className="d-flex mb-3 mt-4 align-item-center">
            <div
              style={{
                cursor: !showDropdown ? "not-allowed" : "",
                minWidth: "25rem",
              }}
              className="me-2"
            >
              <Multiselect
                showCheckbox
                disablePreSelectedValues
                displayValue="name"
                disable={!showDropdown}
                onRemove={(teachers,removeTeacher)=>setAnnouncement({...announcement,teachers})}
                onSelect={(teachers,selectedTeacher)=>setAnnouncement({...announcement,teachers})}
                options={DropdownData}
                ref={multiselectRef}
              /> 
              <p className="text-danger">{noSelecteTeacherError}</p>
            </div>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              className="ms-5"
              onClick={handleSubmit}
            >
              Create Announcement
            </Button>
          </div>
        </div>
        </div>):""
      }
      
    </div>
  );
}
