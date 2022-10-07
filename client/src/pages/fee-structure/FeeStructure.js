import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import TopMenu from "../../components/TopMenu/TopMenu";

import "../../styles/styles.css";

const FeeStructure = () => {
  const [toggle, setToggle] = useState("fetch");
  const [feeStructureData, setFeeStructureData] = useState([]);
  const [editFeeStructureClass, setEditFeeStructureClass] = useState(null);
  const [tuition, setTuition] = useState("");
  const [admission, setAdmission] = useState("");
  const [sports, setSports] = useState("");
  const [transport, setTransport] = useState("");

  const history = useHistory();

  const handleViewFeeStructure = async () => {
    const adm = JSON.parse(window.localStorage.getItem("userdata"));
    let res = await axios.get(`/getFeeStructure?schoolId=${adm.schoolId}`);
    if (res.status === 200) {
      setFeeStructureData(res.data);
    }
  };

  useEffect(() => {
    let temp = feeStructureData.filter(
      (item) => item.class === editFeeStructureClass
    );
    if (temp.length) {
      setTuition(temp[0].tuition);
      setAdmission(temp[0].admission);
      setTransport(temp[0].transport);
      setSports(temp[0].sports);
    }
  }, [editFeeStructureClass]);

  useEffect(() => {
    handleViewFeeStructure();
  }, []);

  const handleFeeEditSubmit = async (evt) => {
    evt.preventDefault();
    const adm = JSON.parse(window.localStorage.getItem("userdata"));
    let res = await axios.post(
      `/editFeeStructure?schoolId=${adm.schoolId}&class=${editFeeStructureClass}`,
      {
        tuition: evt.target.elements.tuition.value,
        transport: evt.target.elements.transport.value,
        admission: evt.target.elements.admission.value,
        sports: evt.target.elements.sports.value,
      }
    );
    if (res.status === 200) {
      swal("Fee structure updated successfully", "", "success").then(
        (value) => {
          window.location.reload();
        }
      );
    }
  };

  const toggleToFetch = () => {
    setToggle("fetch");
  };

  const toggleToUpdate = () => {
    setToggle("update");
  };

  const items = [
    { name: "Fee Structure", click: toggleToFetch },
    { name: "Update structure", click: toggleToUpdate },
  ];

  return (
    <div className="body">
      <h1 className="title">Fee Structure</h1>
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
          <table class="table table-striped">
            <thead>
              <tr className="schedule-heading">
                <th scope="col">Sr No.</th>
                <th scope="col">Class</th>
                <th scope="col">Tuition</th>
                <th scope="col">Admission</th>
                <th scope="col">Sports</th>
                <th scope="col">Transport</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {feeStructureData.map((item, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.class}</td>
                    <td>{item.tuition}</td>
                    <td>{item.admission}</td>
                    <td>{item.sports}</td>
                    <td>{item.transport}</td>
                    <td>
                      {item.tuition +
                        item.admission +
                        item.sports +
                        item.transport}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}

        {toggle === "update" ? (
          <div>
            <form onSubmit={(evt) => handleFeeEditSubmit(evt)}>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th scope="row">
                      <label className="mx-3" htmlFor="admissionClass">
                        Class
                      </label>
                    </th>
                    <td>
                      <select
                        id="admissionClass"
                        style={{ width: "200px" }}
                        className="form-control mx-3 mt-1"
                        onChange={(evt) =>
                          setEditFeeStructureClass(evt.target.value)
                        }
                      >
                        <option value=""></option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <label className="mx-3 mt-3" htmlFor="tuition">
                        Tuition
                      </label>
                    </th>
                    <td>
                      <input
                        onChange={(evt) => setTuition(evt.target.value)}
                        value={tuition}
                        name="tuition"
                        style={{ width: "250px" }}
                        className="form-control mx-3 mt-1"
                        id="tuition"
                        type="text"
                      />
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <label className="mx-3 mt-3" htmlFor="admission">
                        Admission
                      </label>
                    </th>
                    <td>
                      <input
                        onChange={(evt) => setAdmission(evt.target.value)}
                        value={admission}
                        name="admission"
                        style={{ width: "250px" }}
                        className="form-control mx-3 mt-1"
                        id="admission"
                        type="text"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <label className="mx-3 mt-3" htmlFor="sports">
                        Sports
                      </label>
                    </th>
                    <td>
                      <input
                        onChange={(evt) => setSports(evt.target.value)}
                        value={sports}
                        name="sports"
                        style={{ width: "250px" }}
                        className="form-control mx-3 mt-1"
                        id="sports"
                        type="text"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <label className="mx-3 mt-3" htmlFor="transport">
                        Transport
                      </label>
                    </th>
                    <td>
                      <input
                        onChange={(evt) => setTransport(evt.target.value)}
                        value={transport}
                        name="transport"
                        style={{ width: "250px" }}
                        className="form-control mx-3 mt-1"
                        id="transport"
                        type="text"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                className="btn mx-5 mt-5"
                style={{ backgroundColor: "#eeb316", color: "white" }}
                type="submit"
              >
                Save
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FeeStructure;
