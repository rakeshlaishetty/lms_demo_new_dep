import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import TopMenu from "../../components/TopMenu/TopMenu";
import empty from "../../images/empty-folder.png";

import "../../styles/styles.css";

const Performance = () => {
  const [toggle, setToggle] = useState("view");
  const [student, setStudent] = useState(
    JSON.parse(window.localStorage.getItem("userdata"))
  );
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [avgRank, setAvgRank] = useState("");
  const [avgScore, setAvgScore] = useState("");
  const [count, setCount] = useState("");

  const history = useHistory();

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
  
  const marks = (arr) => {
    for (let sub of arr) {
      if (sub._id === student._id) {
        return sub.marks;
      }
    }
    return "-";
  };

  useEffect(() => {
    getSubjects();
    getAssignments();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      if (selectedSubject in assignments) {
        let score = 0;
        let rank = 0;
        let count = 0;
        for (let assignment of assignments[selectedSubject]) {
          for (let [i, submission] of assignment.submission.entries()) {
            if (submission._id === student._id) {
              score += submission.marks;
              rank += i + 1;
              count += 1;
            }
          }
        }
        setAvgRank(rank / count);
        setAvgScore(score / count);
        setCount(assignments[selectedSubject].length);
      }
    }
  }, [selectedSubject]);

  const toggleToView = () => {
    setToggle("view");
  };

  const items = [{ name: "View", click: toggleToView }];

  return (
    <div className="body">
      <h1 className="title">YOUR PERFORMANCE</h1>
      <TopMenu items={items} />

      <div
        className="mt-3"
        style={{
          width: "98%",
          padding: "5%",
          background: "white",
          borderRadius: "12px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {toggle === "view" ? (
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
                {typeof assignments[selectedSubject] !== "undefined" ? (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mt-5">
                      <div style={{ width: "30%" }} className="attendance-card">
                        <h1>{avgScore}</h1>
                        <p className="mt-4">Average Score</p>
                      </div>
                      <div style={{ width: "30%" }} className="attendance-card">
                        <h1>{avgRank}</h1>
                        <p className="mt-4">Average Ranking</p>
                      </div>
                      <div style={{ width: "30%" }} className="attendance-card">
                        <h1>{count}</h1>
                        <p className="mt-4">Total Assignments</p>
                      </div>
                    </div>
                    <table className="mt-5 table table-striped">
                      <thead>
                        <tr className="schedule-heading">
                          <th scope="col">Sr No.</th>
                          <th scope="col">Assignment Name</th>
                          <th scope="col">Status</th>
                          <th scope="col">Marks</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      {assignments[selectedSubject].map((item, index) => (
                        <tr
                          style={{ height: "100px" }}
                          className="py-3"
                          key={index}
                        >
                          <th scope="row">{index + 1}</th>
                          <td>{item.assignmentName}</td>
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
                          <td>{marks(item.submission)}</td>
                          <td>
                            {item.submission.some(
                              (data) => data._id === student._id
                            ) ? (
                              <a
                                onClick={() =>
                                  history.push(
                                    `/app/your-performance/rank/${item._id}`
                                  )
                                }
                              >
                                View rankings
                              </a>
                            ) : (
                              <a
                                onClick={() =>
                                  history.push(
                                    `/app/assignment/solve/${item._id}`
                                  )
                                }
                              >
                                Solve
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </table>
                  </div>
                ) : (
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <img src={empty} style={{ height: "150px" }} />
                    <h4 className="mt-3">No Assignments created</h4>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Performance;
