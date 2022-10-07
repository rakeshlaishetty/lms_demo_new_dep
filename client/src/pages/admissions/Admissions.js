import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import TopMenu from "../../components/TopMenu/TopMenu";
import { FaFileCsv, FaDownload } from "react-icons/fa";

import "../../styles/styles.css";

const Admissions = () => {
  const [toggle, setToggle] = useState("fetch");
  const [recentAdditions, setRecentAdditions] = useState([]);
  const [recentAdmissions, setRecentAdmissions] = useState([]);
  const [admissionData, setAdmissionData] = useState([]);
  const [admissionClass, setAdmissionClass] = useState("");
  const [classes, setClasses] = useState([]);

  const history = useHistory();

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

  const getRecentAdmissions = async () => {
    let res = await axios.get("/admission/getRecentAdmissions");
    if (res.status === 200) {
      setRecentAdmissions(res.data);
    }
  };

  const getAdmission = async () => {
    let res = await axios.get(`/admission/getAdmission?classId=${admissionClass}`);
    if (res.status === 200) {
      setAdmissionData(res.data);
    }
  };

  const toggleToFetch = () => {
    setToggle("fetch");
  };

  const toggleToRecent = () => {
    setToggle("recent");
  };

  useEffect(() => {
    getRecentAdmissions();
  }, []);

  const items = [
    { name: "Fetch students", click: toggleToFetch },
    { name: "Recent Admissions", click: toggleToRecent }
  ];

  return (
    <div className="body">
      <h1 className='title'>Admissions</h1>
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
        {toggle === "fetch" ? (
          <div>
            <div className="mt-4 d-flex justify-content-start align-items-center">
              <label htmlFor="admissionClass">Class</label>
              <select
                id="admissionClass"
                style={{ width: "200px" }}
                className="form-control mx-3"
                onChange={(evt) => setAdmissionClass(evt.target.value)}
              >
                {
                  classes.map((item, index) => <option key={index} value={item._id}>{item.class} {item.division}</option>)
                }
              </select>
              <button
                className="btn-rounded attendance-button mx-5"
                onClick={() => getAdmission()}
              >
                Fetch
              </button>
              {admissionData.length ? (
                <button
                  className="btn mx-5"
                  style={{
                    backgroundColor: "#00363b",
                    color: "white",
                    marginLeft: "10%",
                  }}
                  onClick={() => getAdmission()}
                >
                  Export to CSV <FaFileCsv />
                </button>
              ) : null}
            </div>

            <table className="table table-striped mt-5">
              <thead>
                <tr className="schedule-heading">
                  <th scope="col">Sr No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Class</th>
                  <th scope="col">Division</th>
                  <th scope="col">Email</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {admissionData.map((item, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.class}</td>
                    <td>{item.division.toUpperCase()}</td>
                    <td>{item.email}</td>
                    <td>
                      <button
                        className="btn-rounded mx-1 py-2"
                        style={{ backgroundColor: "#eeb316", color: "white" }}
                        onClick={() =>
                          history.push({
                            pathname: `/app/admission-document/${item.name}`,
                            state: {
                              id: item._id,
                              name: item.name,
                              email: item.email,
                              mother: item.mother_name,
                              age: item.age,
                              father: item.father_name,
                              phone: item.phone,
                              division: item.division,
                              class: item.class,
                              address: item.address,
                            },
                          })
                        }
                        color="secondary"
                      >
                        <FaDownload/> PDF
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn-rounded mx-1 py-2"
                        style={{ backgroundColor: "#eeb316", color: "white" }}
                        onClick={() =>
                          history.push({
                            pathname: `/app/id-card/${item.name}`,
                            state: {
                              name: item.name,
                              father: item.father_name,
                              phone: item.phone,
                              division: item.division,
                              class: item.class,
                              address: item.address,
                            },
                          })
                        }
                        color="secondary"
                      >
                        <FaDownload/> ID Card
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        {toggle === "recent" ? (
          <div>
            <table className="table table-striped mt-4">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Division</th>
                  <th scope="col">Class</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {recentAdmissions.map((item, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.class.division}</td>
                    <td>{item.class.class}</td>
                    <td>
                      <button
                        className="btn-rounded mx-1 py-2"
                        style={{ backgroundColor: "#eeb316", color: "white" }}
                        variant="contained"
                        onClick={() =>
                          history.push({
                            pathname: `/app/admission-document/${item.name}`,
                            state: {
                              id: item._id,
                              name: item.name,
                              email: item.email,
                              mother: item.mother_name,
                              age: item.age,
                              father: item.father_name,
                              phone: item.phone,
                              division: item.class.division,
                              class: item.class.class,
                              address: item.address,
                            },
                          })
                        }
                        color="secondary"
                      >
                        <FaDownload/> PDF
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn-rounded mx-1 py-2"
                        style={{ backgroundColor: "#eeb316", color: "white" }}
                        variant="contained"
                        onClick={() =>
                          history.push({
                            pathname: `/app/id-card/${item.name}`,
                            state: {
                              name: item.name,
                              father: item.father_name,
                              phone: item.phone,
                              division: item.class.division,
                              class: item.class.class,
                              address: item.address,
                            },
                          })
                        }
                        color="secondary"
                      >
                      <FaDownload/> ID Card
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn-rounded mx-1 py-2"
                        style={{ backgroundColor: "#eeb316", color: "white" }}
                        variant="contained"
                        onClick={() =>
                          history.push({
                            pathname: `/app/parent-pass/${item.name}`,
                            state: {
                              name: item.name,
                              father: item.father_name,
                              mother: item.mother_name,
                              phone: item.phone,
                              division: item.class.division,
                              class: item.class.class,
                              address: item.address,
                            },
                          })
                        }
                        color="secondary"
                      >
                      <FaDownload/> Parent pass
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Admissions;
