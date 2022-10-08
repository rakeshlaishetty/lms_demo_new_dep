import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import TopMenu from "../../components/TopMenu/TopMenu";
import Switch from "react-switch";
import empty from "../../images/empty-folder.png";

import "../../styles/styles.css";

const YourAssignments = () => {
  const [toggle, setToggle] = useState("subject");
  const [student, setStudent] = useState(
    JSON.parse(window.localStorage.getItem("userdata"))
  );
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showMissing, setShowMissing] = useState(false)

  const history = useHistory();

  const toggleToSubject = () => {
    setToggle("subject");
  };

  const items = [{ name: "Select by Subjects", click: toggleToSubject }];

  const getSubjects = async () => {
    const studentClass = JSON.parse(
      window.localStorage.getItem("classDetails")
    );

    let res = await axios.get(`/getClassSubjects?classId=${studentClass._id}`);
    if (res.status === 200) {
      setSubjects(res.data);
    }
  };

  const getAssignments = async () => {
    const studentClass = JSON.parse(
      window.localStorage.getItem("classDetails")
    );
    let res = await axios.get(
      `/assignments/getAssignmentsBySubjects?classId=${studentClass._id}`
    );
    if (res.status === 200) {
      setAssignments(res.data);
    }
  };

  useEffect(() => {
    getSubjects();
    getAssignments();
  }, []);

  return (
    <div className="body">
      <h1 className="title">YOUR ASSIGNMENTS</h1>
      <TopMenu items={items} />

      <div
        className="mt-3"
        style={{
          width: "95%",
          padding: "5%",
          background: "white",
          borderRadius: "12px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        {toggle === "subject" ? (
          <div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select
                onChange={(evt) => setSelectedSubject(evt.target.value)}
                style={{ width: "50%" }}
                className="form-control mt-2"
                id="subject"
              >
                <option value=""></option>
                {subjects.map((item, index) => (
                  <option value={item.subject._id} key={index}>
                    {item.subject.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedSubject ? (
              <div className="mt-5">
                
      {
          typeof assignments[selectedSubject] !== "undefined" && assignments[selectedSubject].length ?
          <div className="mb-5 d-flex align-items-center">
      <label>Missing only</label>
      <Switch className="mx-3" height={20} width={45} checkedIcon={false} uncheckedIcon={false} onColor="#eeb316" onChange={() => setShowMissing(!showMissing)} checked={showMissing} />
      </div>
      :
      null
      }
                {typeof assignments[selectedSubject] !== "undefined" && !showMissing ? (
                  
                  
                  <table className="table table-striped px-3">
                    <thead>
                      <tr className="schedule-heading">
                        <th scope="col">Assignment Name</th>
                        <th scope="col">Assigned</th>
                        <th scope="col">Deadline</th>
                        <th scope="col">Status</th>
                        <th scope="col">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                    {assignments[selectedSubject].map((item, index) => (
                      <tr
                        style={{ height: "100px" }}
                        className="py-3"
                        key={index}
                      >
                        <td><strong>{item.assignmentName}</strong></td>
                        <td>{new Date(item.date).toDateString()}</td>
                        <td>{new Date(item.deadline).toDateString()}</td>
                        <td
                          className={
                            item.submission.some(
                              (data) => data._id === student._id
                            )
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {item.submission.some(
                            (data) => data._id === student._id
                          )
                            ? "Submitted"
                            : "Missing"}
                        </td>
                        <td>
                          {typeof item.submission.find(
                            (data) => data._id === student._id
                          ) !== "undefined"
                            ? item.submission.find(
                                (data) => data._id === student._id
                              ).marks
                            :
                            <a
                                onClick={() =>
                                  history.push(
                                    `/app/assignment/solve/${item._id}`
                                  )
                                }
                              >
                                Solve
                              </a>
                          }
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                ) : 
                
                typeof assignments[selectedSubject] !== "undefined" && showMissing ?
                (
                  <table className="table table-striped px-3">
                    <thead>
                      <tr className="schedule-heading">
                        <th scope="col">Assignment Name</th>
                        <th scope="col">Assigned</th>
                        <th scope="col">Deadline</th>
                        <th scope="col">Status</th>
                        <th scope="col">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                    {assignments[selectedSubject].map((item, index) => 
                    {
                      return  !item.submission.some(
                        (data) => data._id === student._id
                      ) ?

                      <tr
                        style={{ height: "100px" }}
                        className="py-3"
                        key={index}
                      >
                        <td><strong>{item.assignmentName}</strong></td>
                        <td>{new Date(item.date).toDateString()}</td>
                        <td>{new Date(item.deadline).toDateString()}</td>
                        <td
                          className="text-danger"
                          
                        >
                          Missing
                        </td>
                        <td>
                            <a
                                onClick={() =>
                                  history.push(
                                    `/app/assignment/solve/${item._id}`
                                  )
                                }
                              >
                                Solve
                              </a>
                          
                        </td>
                      </tr>

                      :

                      null

                    })}
                    </tbody>
                  </table>
                )
                :
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img src={empty} style={{ height: "150px" }} />
                    <h4 className="mt-3">No Assignments created</h4>
                  </div>
              
              }

               
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default YourAssignments;
