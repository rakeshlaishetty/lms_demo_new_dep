import React, { useState, useEffect } from "react";
import axios from "axios";
import TopMenu from "../../components/TopMenu/TopMenu";
import Multiselect from "multiselect-react-dropdown";
import { Button } from "@material-ui/core";
import "../../styles/Announcement.css";
import "../../styles/styles.css";
export default function StudentAnnouncements({ shareDocument }) {
  const [DropdownData, setDropdownData] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [message, setMessage] = useState("");
  // const multiselectRef = React.createRef();
  const classOptions = React.createRef();
  // const SelectedTeacher = React.createRef();
  const [classes, setClasses] = useState([]);
  const [shareWith, setShareWith] = useState("");
  const [toggle, setToggle] = useState("");
  const [teacherLoading, setTeacherLoading] = useState(false);
  const [classLoading, setClassLoading] = useState(false);

  const toggleToShareWithTeachers = () => {
    setToggle("shareWithTeachers");
    getTeachers();
  };
  const toggleToShareWithStudents = () => {
    setToggle("shareWithStudents");
    setTeacherLoading(false);
    getClasses()

  };

  const items = [
    { name: "Teachers", click: toggleToShareWithTeachers },
    { name: "Students", click: toggleToShareWithStudents },
  ];

  const getClasses = async () => {
    const adm = JSON.parse(window.localStorage.getItem("userdata"));
    setClassLoading(true)
    try {
      let res = await axios.get(
        `/getAssignedClassToTeachersClass?schoolId=${adm.schoolId}&TeacherId=${adm._id}`
      );
      setClassLoading(false)
      if (res.status === 200) {
        
        console.log("here data", res.data);
        let resData = res.data
        let shareStudent = shareDocument.shareWithClass
        resData = resData.map((x) => {
          console.log(x)
          if (shareStudent.includes(x._id)) {
            return { ...x, checked: true };
          } else {
            return { ...x, checked: false };
          }
        });
        setClasses(resData);
  
      }
    } catch (error) {
      setClassLoading(false)
      console.log( error )
    }
    
  };
  const getTeachers = async () => {
    setTeacherLoading(true);

    try {
      let res = await axios.get("/allTeachersName");
      setTeacherLoading(false);
      if (res.status == 200) {
        let resData = res.data.teachers;
        // resData.map(x=>console.log(x))
        let sharedTeacher = shareDocument.sharedWithTeachers;
        resData = resData.map((x) => {
          if (sharedTeacher.includes(x._id)) {
            return { ...x, checked: true };
          } else {
            return { ...x, checked: false };
          }
        });
        setDropdownData(resData);
        console.log("res data from function", resData);
      }
    } catch (error) {
      setTeacherLoading(false);
      console.log(error);
    }
  };
  const submitTeacherHandle = () => {
    let intermediat = [];
    DropdownData.forEach((y) => {
      if (y.checked == true) {
        intermediat.push(y._id);
      }
    });
    return intermediat;
  };
  const submitClassHandle = () => {
    let intermediat = [];
    classes.forEach((y) => {
      if (y.checked == true) {
        intermediat.push(y._id);
      }
    });
    return intermediat;
  };
  // getTeachers()
  return (
    <div className="bg-white  mx-5 p-5 mt-5">
      <h1 className="fw-bolder display-5 mb-3">Share Docuement</h1>
      <h1 className="text-success">{message}</h1>

      <TopMenu items={items} />

      {toggle == "shareWithTeachers" ? (
        <>
          <div className="form-check form-check-inline  ">
            <input
              className="form-check-input h4 Announcement-radioInput"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              onClick={() => {
                setShareWith("teachers");
                getTeachers();
               
              }}
            />
            <label className="form-check-label  h4" htmlFor="flexRadioDefault1">
              Teachers
            </label>
          </div>
          {teacherLoading ? (
            <div>loading ....</div>
          ) : DropdownData && DropdownData.length ? (
            DropdownData.map((x, i) => (
              <div className="form-check ms-5 mt-1 ps-3" key={i}>
                <input
                  type="checkbox"
                  className="form-check-input h6"
                  defaultChecked={x.checked}
                  style={{ position: "static" }}
                  name={x.name}
                  value={x.name}
                  id={x.name}
                  onClick={(e) => {
                    // DropdownData.map
                    let w = DropdownData.map((y) => {
                      if (y._id == x._id) {
                        return { ...y, checked: !y.checked };
                      }
                      return y;
                    });
                    setDropdownData(w);
                  }}
                />
                <label className="form-check-label h5 ms-2 " htmlFor={x.name}>
                  {x.name}
                </label>
              </div>
            ))
          ) : (
            ""
          )}
          <div>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          className="ms-5"
          // onClick={handleSubmit}
          onClick={() => {
            let teachersId = submitTeacherHandle()
              if( teachersId && teachersId.length ){
                axios
                .post("/document/shareWith", {
                  teachers: teachersId,
                  shareDocumentId: shareDocument._id,
                  shareWith: "teachers",
                })
                .then((res) => console.log(res.data));
              }
            
          }}
        >
          Share Document
        </Button>
      </div>
        </>
      ) : (
        ""
      )}
      {toggle == "shareWithStudents" ? (
        <div>
          {classLoading ? (
            <div>loading ....</div>
          ) : classes && classes.length ? (
            classes.map((x, i) => (
              <div className="form-check ms-5 mt-1 ps-3" key={i}>
                <input
                  type="checkbox"
                  className="form-check-input h6"
                  defaultChecked={x.checked}
                  style={{ position: "static" }}
                  name={x.name}
                  value={x.name}
                  id={x._id}
                  onClick={(e) => {
                    // DropdownData.map
                    let w = classes.map((y) => {
                      if (y._id == x._id) {
                        return { ...y, checked: !y.checked };
                      }
                      return y;
                    });
                    setClasses(w);
                  }}
                />
                <label className="form-check-label h5 ms-2 " htmlFor={x._id}>
                  {`${x.class} , "${x.division}"`}
                </label>
              </div>
            ))
          ) : (
            ""
          )}
          {/* <div className="form-check form-check-inline">
            <input
              className="form-check-input h4 Announcement-radioInput"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              ref={classOptions}
              onClick={getClasses}
            />
            <label className="form-check-label h4" htmlFor="flexRadioDefault2">
              Students
            </label>
          </div> */}
          {/* <div className="d-flex mb-3 mt-4 align-item-center">
            <div className="me-2">
              <select
                style={{
                  minWidth: "25rem",
                }}
                className="form-select form-select "
                onClick={() => {
                  setShareWith("students");
                }}
                onChange={(e) => {
                  if (e.target.value) {
                    if (e.target.value != "no") {
                      setSelectedClassId(e.target.value);
                    }
                  }
                }}
              >
                <option value={"no"}>please select class</option>
                {classes
                  ? classes.map((x, i) => (
                      <option
                        key={i}
                        value={x._id}
                        // onClick={()=>setSelectedClassId(x._id)}
                      >{`${x.class} , "${x.division}"`}</option>
                    ))
                  : ""}
              </select>
            </div>
            
          </div> */}
          <div>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          className="ms-5"
          onClick={() => {
           console.log(selectedClassId)
          //  console.log(submitClassHandle())
           let classes = submitClassHandle()
           if(classes){
            axios
            .post("/document/shareWith", {
              shareDocumentId: shareDocument._id,
              shareWith: "students",
              selectedClassId: classes,
            })
            .then((res) => console.log(res.data));
        }
      }
           }
             
        >
          Share Document
        </Button>
      </div>
        </div>
      ) : (
        ""
      )}

      
    </div>
  );
}
