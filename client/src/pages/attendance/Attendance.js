import React, { useState, useEffect, useRef, createRef } from "react";
import axios from "axios";

import TopMenu from "../../components/TopMenu/TopMenu";

import "../../styles/styles.css";

const Attendance = () => {
  const [toggle, setToggle] = useState("fetch");
  const [classes, setClasses] = useState([]);
  const [attendanceClass, setAttendanceClass] = useState("");
  const [attendanceDivision, setAttendanceDivision] = useState("");
  const [attendenceData, setAttendanceData] = useState([]);
  const [averageData, setAverageData] = useState([]);
  const [total, setTotal] = useState(null);

  const getClasses = async () => {
    const adm = JSON.parse(window.localStorage.getItem("userdata"));
    let res = await axios.get(`/classes/getClasses?schoolId=${adm.schoolId}`);
    if (res.status === 200) {
      setClasses(res.data);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  const getAttendance = async (evt) => {
    evt.preventDefault();

    let res = await axios.get(
      `/attendance/getAttendance?classId=${evt.target.elements.class.value}&date=${evt.target.elements.date.value}`
    );
    if (res.status === 200) {
      setAttendanceData(res.data.data);
      setAverageData(res.data.average);
      setTotal(res.data.total);
      // console.log
    }
  };

  const items = [{ name: "Fetch Attendance", click: "" }];

  return (
    <div className="body">
      <h1 className="title">STUDENT ATTENDANCE</h1>
      <TopMenu items={items} />

      {toggle === "fetch" ? (
        <div>
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
            <form
              onSubmit={getAttendance}
              className="d-flex justify-content-between align-items-center"
            >
              <input
                style={{ width: "40%" }}
                name="date"
                type="date"
                className="form-control mx-4"
                required
              />
              <select
                style={{ width: "40%" }}
                className="form-control mx-4"
                name="class"
                required
              >
                {classes.map((item, index) => (
                  <option value={item._id}>
                    {item.class} {item.division}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="btn-rounded"
                style={{ backgroundColor: "#eeb316", color: "white" }}
                variant="contained"
                color="secondary"
              >
                Fetch
              </button>
            </form>
            {attendenceData.length ? (
              <div>
                <table className="table table-striped mt-5">
                  <thead className="schedule-heading">
                    <tr>
                      <th scope="col">Roll Number</th>
                      <th scope="col">Name</th>
                      <th scope="col">Status</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendenceData.map((item, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td
                          className={
                            item.present ? "text-success" : "text-danger"
                          }
                        >
                          {item.present ? "Present" : "Absent"}
                        </td>
                        <td className={(averageData[item._id]/total)*100 <75 ? 'text-danger' : null}>{parseInt((averageData[item._id]/total)*100)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Attendance;
