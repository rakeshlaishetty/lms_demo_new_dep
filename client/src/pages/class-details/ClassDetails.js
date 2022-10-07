import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import TopMenu from "../../components/TopMenu/TopMenu";
import { FaUserCircle, FaUserFriends, FaTrash } from "react-icons/fa";
import books from "../../images/books2.png";
import trash from "../../images/trash.png";

import "../../styles/styles.css";

const ClassDetails = (props) => {
  const search = useLocation().search;

  const [toggle, setToggle] = useState("students");
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [chosenSubject, setChosenSubject] = useState('');

  const history = useHistory();
  const location = useLocation();

  const getStudents = async () => {
    const adm = JSON.parse(window.localStorage.getItem("userdata"));
    let res = await axios.get(
      `/getStudentsList?schoolId=${adm.schoolId}&classId=${props.id}`
    );
    if (res.status === 200) {
      setStudents(res.data);
    }
  };

  const getSubjects = async () => {
    const adm = JSON.parse(window.localStorage.getItem("userdata"));
    let res = await axios.get(
      `/getClassSubjects?schoolId=${adm.schoolId}&classId=${props.id}`
    );
    if (res.status === 200) {
      setSubjects(res.data);
    }
  };

  const getTeachers = async () => {
    const adm = JSON.parse(window.localStorage.getItem("userdata"));
    let res = await axios.get(`/getTeachers?schoolId=${adm.schoolId}`);
    if (res.status === 200) {
      setTeachers(res.data);
    }
  };

  useEffect(() => {
    getStudents();
    getSubjects();
    getTeachers();
  }, []);

  const toggleToStudents = () => {
    setToggle("students");
  };

  const toggleToSubjects = () => {
    setToggle("subjects");
  };

  const items = [
    { name: "Students", click: toggleToStudents },
    { name: "Subjects", click: toggleToSubjects },
  ];

  const handleFacultySubmit = async (evt) => {
    evt.preventDefault();
    
    const data = {
      facultyId: evt.target.elements.facultyId.value,
      subjectId: chosenSubject,
      classId: props.id,
    };
    let res = await axios.post("/assignFaculty", data);
    if (res.status === 200) {
      window.location.reload();
    } else {
      swal("Something went wrong", "Please try again", "error");
    }
  };

  const handleSubjectDelete = async (id) => {
    swal({
        title: "Are you sure you want to delete this course from this class?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then(async (willDelete) => {
        if (willDelete) {
            let res = await axios.post('/deleteSubject', {classId: props.id, subjectId: id});
            if(res.status === 200){
                window.location.reload();
            }
        } else {
          return;
        }
      });
  }

  return (
    <div className="body">
      <h1 className="title">CLASS DETAILS</h1>
      <TopMenu items={items} />

      <div
        className="mt-3"
        style={{
          width: "95%",
          height: "auto",
          background: "white",
          borderRadius: "12px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <h3 className="mx-5 py-3" style={{ fontWeight: "bold" }}>
          {props.class} {props.division}
        </h3>

        {toggle === "students" ? (
          <div className="container" style={{ textAlign: "center" }}>
            <div
              className="row mb-3 d-flex align-items-center"
              style={{
                background: "rgba(238, 238, 238, 0.5)",
                borderTop: "1px solid #ddd",
                borderBottom: "1px solid #ddd",
                height: "50px",
              }}
            >
              <div className="col-3">
                <span className="table-heading">Roll No.</span>
              </div>
              <div className="col-3">
                <span className="table-heading">Name</span>
              </div>
              <div className="col-3">
                <span className="table-heading">Contact</span>
              </div>
            </div>

            {students.map((item, index) => (
              <div
                className="row mb-3 d-flex align-items-center"
                style={{ height: "40px" }}
              >
                <div className="col-3">
                  <span>{index + 1}</span>
                </div>
                <div className="col-3">
                  <span>{item.name}</span>
                </div>
                <div className="col-3">
                  <span>{item.phone}</span>
                </div>
                <div className="col-3">
                  <span>
                    <button
                      onClick={() =>
                        history.push({
                          pathname: `/app/student-profile/${item._id}`,
                          state: { id: item._id },
                        })
                      }
                      className="btn"
                      style={{ backgroundColor: "#eeb316", color: "white" }}
                    >
                      View profile
                    </button>
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {toggle === "subjects" ? (
          <div className="container" style={{ textAlign: "center" }}>
            <div
              className="row mb-3 d-flex align-items-center"
              style={{
                background: "rgba(238, 238, 238, 0.5)",
                borderTop: "1px solid #ddd",
                borderBottom: "1px solid #ddd",
                height: "50px",
              }}
            >
              <div className="col-2">
                <span className="table-heading">Sr No.</span>
              </div>
              <div className="col-3">
                <span className="table-heading">Subject</span>
              </div>
              <div className="col-3">
                <span className="table-heading">Faculty</span>
              </div>
              <div className="col-2"></div>
              <div className="col-2"></div>
            </div>

            {subjects.map((item, index) => (
              <div
                className="row mb-3 py-2 d-flex align-items-center"
                style={{ height: "70px" }}
              >
                <div className="col-2">
                  <span>{index + 1}</span>
                </div>
                <div className="col-3">
                  <span>{item.subject.name}</span>
                </div>
                <div className="col-3">
                  <span>
                    {item.faculty !== null ? (
                      item.faculty.name
                    ) : (
                      <span className="text-danger">Not Assigned</span>
                    )}
                  </span>
                </div>
                <div className="col-2">
                  <div>
                    <input
                      class="modal-btn"
                      type="checkbox"
                      id="modal-btn"
                      name="modal-btn"
                    />
                    <label onClick={() => setChosenSubject(item.subject._id)} htmlFor="modal-btn">Assign faculty</label>
                    <div class="modal">
                      <div class="modal-wrap">
                        <h3 className="mt-2">Assign faculty</h3>
                        <hr />
                        <form
                          onSubmit={(evt) =>
                            handleFacultySubmit(evt)
                          }
                        >
                          <p>Choose faculty from the list below</p>
                          <select
                            name="facultyId"
                            className="form-control"
                            style={{ width: "50%" }}
                          >
                            {teachers.map((item) => (
                              <option value={item._id}>{item.name}</option>
                            ))}
                          </select>

                          <button
                            type="submit"
                            className="btn mt-3"
                            style={{
                              backgroundColor: "#eeb316",
                              color: "white",
                            }}
                          >
                            Save
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-2">
                    <button onClick={() => handleSubjectDelete(item.subject._id)} className='trash'><img style={{height: '18px'}} src={trash}/></button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ClassDetails;
