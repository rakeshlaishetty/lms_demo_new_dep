import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import TopMenu from "../../components/TopMenu/TopMenu";

import jobs from "../../components/helpers/jobs";
import pencil from "../../images/pencil.png";
import trash from "../../images/trash.png";
import "../../styles/styles.css";

const EmployeeList = () => {
  const [toggle, setToggle] = useState("type");
  const [staff, setStaff] = useState([]);
  const [staffType, setStaffType] = useState("");

  const history = useHistory();

  useEffect(() => {
    setStaff([]);
  }, [toggle]);

  const toggleToType = () => {
    setToggle("type");
  };

  const toggleToName = () => {
    setToggle("name");
  };

  const getTeachers = async () => {
    const adm = JSON.parse(window.localStorage.getItem("userdata"));
    let res = await axios.get(`/getTeachers?schoolId=${adm.schoolId}`);
    if (res.status === 200) {
      if (!res.data.length) {
        swal(
          "No data available",
          "It seems there is no staff data availalble",
          "warning"
        );
        return;
      }
      setStaff(res.data);
    }
  };

  const getStaff = async () => {
    const adm = JSON.parse(window.localStorage.getItem("userdata"));
    let res = await axios.get(
      `/staff/getStaff?staffType=${staffType}&schoolId=${adm.schoolId}`
    );
    if (res.status === 200) {
      if (!res.data.length) {
        swal(
          "No data available",
          "It seems there is no staff data availalble",
          "warning"
        );
        return;
      }
      setStaff(res.data);
    }
  };

  const search = async (evt) => {
    evt.preventDefault();
    const adm = JSON.parse(window.localStorage.getItem("userdata"));
    let res = await axios.post(`/staff/findStaff`, {
      schoolId: adm.schoolId,
      name: evt.target.elements.name.value,
    });

    if (res.status === 200) {
      setStaff(res.data);
    }
  };

  useEffect(() => {
    if (staffType === "Teacher") {
      getTeachers();
    } else if (staffType !== "Teachers" && staffType !== "") {
      getStaff();
    }
  }, [staffType]);

  const items = [
    { name: "Fetch by type", click: toggleToType },
    { name: "Fetch by name", click: toggleToName },
  ];

  return (
    <div className="body">
      <h1 className="title">EMPLOYEE LIST</h1>
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
        {toggle === "type" ? (
          <div>
            <h5>Select Designation</h5>
            <select
              className="form-control mt-4"
              onChange={(evt) => setStaffType(evt.target.value)}
            >
              <option key={0} value=""></option>
              {jobs.map((item, index) => (
                <option key={index + 1} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {staff.length ? (
              <table class="table table-striped mt-5">
                <thead>
                  <tr className="schedule-heading">
                    <th scope="col">No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Address</th>
                    {/* <th scope="col">Salary</th> */}
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((item, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      {/* <td>{
                              item.salary?
                              item.salary.base+
                              item.salary.hra+
                              item.salary.da+
                              item.salary.incentives-
                              item.salary.tds-
                              item.salary.pf-
                              item.salary.other
                              :""
                              }</td> */}
                      <td>
                        <button
                          onClick={() =>
                            history.push({
                              pathname: `/app/staff-id-card/${item.name}`,
                              state: { data: item },
                            })
                          }
                          className="btn-rounded attendance-button py-2"
                        >
                          ID Card
                        </button>
                      </td>
                      <td>
                        <button
                          style={{ border: "none", background: "inherit" }}
                        >
                          <img style={{ height: "20px" }} src={pencil} />
                        </button>
                      </td>
                      <td>
                        <button
                          style={{ border: "none", background: "inherit" }}
                        >
                          <img style={{ height: "20px" }} src={trash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>
        ) : null}

        {toggle === "name" ? (
          <div>
            <form
              onSubmit={search}
              className="d-flex justify-content-between align-items-center"
            >
              <input
                className="form-control mx-5"
                type="text"
                placeholder="Search by name"
                name="name"
              />
              <button className="btn-rounded attendance-button">Search</button>
            </form>

            {staff.length ? (
              <table class="table table-striped mt-5">
                <thead>
                  <tr className="schedule-heading">
                    <th scope="col">No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Address</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((item, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          onClick={() =>
                            history.push({
                              pathname: `/app/staff-id-card/${item.name}`,
                              state: { data: item },
                            })
                          }
                          className="btn-rounded attendance-button py-2"
                        >
                          ID Card
                        </button>
                      </td>
                      <td>
                        <button
                          style={{ border: "none", background: "inherit" }}
                        >
                          <img style={{ height: "20px" }} src={pencil} />
                        </button>
                      </td>
                      <td>
                        <button
                          style={{ border: "none", background: "inherit" }}
                        >
                          <img style={{ height: "20px" }} src={trash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EmployeeList;
