import React, { useState, useEffect } from "react";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import { Button } from "@material-ui/core";
import "../../styles/Announcement.css";
export default function StudentAnnouncements() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [DropdownData, setDropdownData] = useState([]);
  const [textAreaError, setTextAreaError] = useState("");
  const [noSelecteStudentError, setNoSelecteStudentError] = useState("");
  const [announcement, setAnnouncement] = useState({
    students: [],
    message: "",
  });
  const [message, setMessage] = useState("");
  const multiselectRef = React.createRef();
  const textAreaRef = React.createRef();
  const classOptions = React.createRef();
  const [classNameDropdown, setClassNameDropdown] = useState([]);
  const fetchStudentData = () => {};

  useEffect(() => {
    const schoolId = JSON.parse(window.localStorage.getItem("userdata"));
    axios
      .get("/getClasse/name/section", { params: { schoolId } })
      .then((res) => {
        if (res.status === 200) {
          let options = res.data.map((x, i) => (
            <option
              key={i}
              value={`${x.class},${x.division}`}
            >{`${x.class}th "${x.division}"`}</option>
          ));
          setClassNameDropdown(options);
        } else
          console.log("something went wrong while fetching the class name");
      })
      .catch((e) => console.log(e));

    // setClassNameDropdown(dropDownClass)
    // console.log(dropDownClass)
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!announcement.message) {
      setTextAreaError("Message can't be empty");
    } else if (!announcement.students.length) {
      setNoSelecteStudentError("please select the Students");
    } else {
      // const adm = JSON.parse(window.localStorage.getItem('userdata'))
      // textAreaRef.current.value=""
      // multiselectRef.current.resetSelectedValues()
      // setTextAreaError("")
      // setAnnouncement({students:[],message:"", schoolId: adm.schoolId})
      // setNoSelecteStudentError('')
      textAreaRef.current.value=""
      classOptions.current.value=""

      setNoSelecteStudentError('')
      multiselectRef.current.resetSelectedValues()
      setTextAreaError("")
      const {schoolId} = JSON.parse(window.localStorage.getItem('userdata'))
      console.log({...announcement,schoolId})
      axios.post("/students/Announcement",{...announcement, schoolId: schoolId})
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
  };

  return (
    <div className="bg-white  mx-5 p-5 mt-5">
      <h1 className="fw-bolder display-5 mb-3">Student Announcement</h1>
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
              setAnnouncement({
                ...announcement,
                message: e.target.value.trim(),
              });
            } else setTextAreaError("message can't be empty");
          }}
          rows="8"
        ></textarea>
        <p className="text-danger h5 ps-2 py-2 mb-5 ">{textAreaError}</p>
      </div>
      <div>
        <div className="form-check form-check-inline  ">
          <input
            className="form-check-input h4 Announcement-radioInput"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            onClick={() => {
              setShowDropdown(false);
              setNoSelecteStudentError("");
              setAnnouncement({ ...announcement, students: ["all"] });
              multiselectRef.current.resetSelectedValues();
            }}
          />
          <label className="form-check-label  h4" htmlFor="flexRadioDefault1">
            All Students
          </label>
        </div>
        <div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input h4 Announcement-radioInput"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              ref={classOptions}
              onClick={()=>{
                setShowDropdown(true);
                if(announcement.students){
                  console.log('came here')
                  setAnnouncement({...announcement,students:[]})
                }
                else console.log('nothing')
              }
              }
            />
            <label className="form-check-label h4" htmlFor="flexRadioDefault2">
              Select Students
            </label>
          </div>
          <div className="d-flex mb-3 mt-4 align-item-center">
            <div className="me-2">
              <select
                style={{
                  cursor: !showDropdown ? "not-allowed" : "",
                  minWidth: "25rem",
                }}
                
                onChange={(e)=>{
                 if (e.target.value!="no") {
                   const {schoolId}= JSON.parse(window.localStorage.getItem('userdata'))
                  const [className,division]=e.target.value.split(",")
                  axios.get("/students/name",{params:{className,division,schoolId}}) 
                  .then(res=>{
                    if ( res.status===200 ){
                      console.log(res.data)
                      setDropdownData(res.data.students)
                    }
                    else console.log( ' something went wron =g' )
                  })
                  .catch(e=> console.log(e))}
                }}
                className="form-select form-select "
                disabled={!showDropdown}
                

              >
                <option value={"no"}>please select class</option>
                {classNameDropdown}
              </select>
              {/* <p className="text-danger">{noSelecteStudentError}</p> */}
            </div>
            <div
              style={{
                cursor: !showDropdown ? "not-allowed" : "",
                minWidth: "25rem",
              }}
              className="me-2 "
            >
              <Multiselect
                showCheckbox
                disablePreSelectedValues
                displayValue="name"
                disable={!DropdownData.length}
                onRemove={(students, removeStudent) =>
                  setAnnouncement({ ...announcement, students })
                }
                onSelect={(students, selectedStudent) =>
                  setAnnouncement({ ...announcement, students })
                }
                options={DropdownData}
                ref={multiselectRef}
                placeholder="select students"
              />
              <p className="text-danger">{noSelecteStudentError}</p>
            </div>
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
    </div>
  );
}
