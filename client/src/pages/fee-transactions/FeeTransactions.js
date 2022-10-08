import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import TopMenu from "../../components/TopMenu/TopMenu";

import "../../styles/styles.css";

const FeeTransactions = () => {
  const [toggle, setToggle] = useState("fetch");
  const [transactions, setTransactions] = useState([]);
  const [feesClass, setFeesClass] = useState("");
  const [feesData, setFeesData] = useState([]);
  const [chosenClass, setChosenClass] = useState("");
  const [chosenDivision, setChosenDivision] = useState("");
  const [students, setStudents] = useState([]);
  const [recentData, setRecentData] = useState([]);

  useEffect(() => {
    getRecentData();
  }, []);

  const getStudents = async () => {
    if (chosenClass && chosenDivision) {
      let res = await axios.get(
        `/getStudents?class=${chosenClass}&division=${chosenDivision}`
      );
      if (res.status === 200) {
        setStudents(res.data);
      }
    }
  };

  const getRecentData = async () => {
    let res = await axios.get("/fees/getRecentFeePayments");
    if (res.status === 200) {
      setRecentData(res.data);
    }
  };

  useEffect(() => {
    getStudents();
  }, [chosenClass, chosenDivision]);

  const getPayments = async (id) => {
    let res = await axios.get(`/getFeesData?studentId=${id}`);
    if (res.status === 200) {
      setTransactions(res.data);
    }
  };

  const getFees = async () => {
    let res = await axios.get(`/getFees?class=${feesClass}`);
    if (res.status === 200) {
      if (!res.data.length) {
        swal(
          "No data available",
          "It seems there is no fees data present yet",
          "warning"
        );
        return;
      }
      setFeesData(res.data);
    }
  };

  const history = useHistory();

  const toggleToFetch = () => {
    setToggle("fetch");
  };

  const toggleToUpdate = () => {
    setToggle("update");
  };
  const toggleToRecent = () => {
    setToggle("recent");
  };

  const items = [
    { name: "View transactions", click: toggleToFetch },
    { name: "Update transaction", click: toggleToUpdate },
    { name: "Recent transactions", click: toggleToRecent },
  ];

  const handlePayFees = async (id, type, total, student) => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));

    if (type === "Monthly") {
      swal({
        title: "Please check the details once",
        text: `Fee Payment type for ${student} is set as ${type}. Do you wish to update a payment of Rs. ${total}?`,
        icon: "warning",
        buttons: true,
      }).then(async (yes) => {
        if (yes) {
          let res = await axios.post(`/fees/addTransaction`, {
            amount: total,
            id: id,
            type: type,
            schoolId: adm.schoolId
          });
          if (res.status === 200) {
            swal(
              "Transaction updated!",
              `Transaction ID: ${res.data.transactionId}`,
              "success"
            );
          }
        } else {
          return;
        }
      });
    } else if (type === "Quarterly") {
      swal({
        title: "Please check the details once",
        text: `Fee Payment type for ${student} is set as ${type}. Do you wish to update a payment of Rs. ${
          total * 3
        }?`,
        icon: "warning",
        buttons: true,
      }).then(async (yes) => {
        if (yes) {
          let res = await axios.post(`/fees/addTransaction`, {
            amount: total * 3,
            id: id,
            type: type,
            schoolId: adm.schoolId
          });
          if (res.status === 200) {
            swal(
              "Transaction updated!",
              `Transaction ID: ${res.data.transactionId}`,
              "success"
            );
          }
        } else {
          return;
        }
      });
    } else if (type === "Yearly") {
      swal({
        title: "Please check the details once",
        text: `Fee Payment type for ${student} is set as ${type}. Do you wish to update a payment of Rs. ${
          total * 12
        }?`,
        icon: "warning",
        buttons: true,
      }).then(async (yes) => {
        if (yes) {
          let res = await axios.post(`/fees/addTransaction`, {
            amount: total * 12,
            id: id,
            type: type,
            schoolId: adm.schoolId
          });
          if (res.status === 200) {
            swal(
              "Transaction updated!",
              `Transaction ID: ${res.data.transactionId}`,
              "success"
            );
          }
        } else {
          return;
        }
      });
    }
  };

  return (
    <div className="body">
      <h1 className="title">Fee Transactions</h1>
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
            <div className="mt d-flex justify-content-start align-items-center">
              <label htmlFor="admissionClass">Class</label>
              <select
                id="admissionClass"
                style={{ width: "200px" }}
                className="form-control mx-3"
                onChange={(evt) => setFeesClass(evt.target.value)}
              >
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <button
                className="btn-rounded attendance-button mx-5"
                onClick={() => getFees()}
              >
                Fetch
              </button>
            </div>
            {feesData.length ? (
              <table className="table table-striped mt-5">
                <thead>
                  <tr className="schedule-heading">
                    <th scope="col">No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Division</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Tuition</th>
                    <th scope="col">Admission</th>
                    <th scope="col">Sports</th>
                    <th scope="col">Transport</th>
                    <th scope="col">Total</th>
                    {/* <th scope="col"></th>
                          <th scope="col"></th> */}
                  </tr>
                </thead>
                <tbody>
                  {feesData.map((item, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.division.toUpperCase()}</td>
                      <td>{item.paymentType}</td>
                      <td>{item.fees.tuition}</td>
                      <td>{item.fees.admission}</td>
                      <td>{item.fees.sports}</td>
                      <td>{item.fees.transport}</td>
                      <td>
                        {item.fees.tuition +
                          item.fees.transport +
                          item.fees.sports +
                          item.fees.admission}
                      </td>
                      {/* <td><button 
                                          onClick={() => getPayments(item._id)}
                                          className='btn-rounded attendance-button'
                                          style={{ backgroundColor: "#eeb316", color: "white" }}
                                          variant="contained"
                                          color="secondary">Details</button></td>
                              <td><button className='btn-rounded attendance-button'
                                          style={{ backgroundColor: "#eeb316", color: "white" }}
                                          variant="contained"
                                          color="secondary">Update</button></td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>
        ) : null}

        {toggle === "update" ? (
          <div>
            <div
              style={{ width: "60%" }}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <h6>Class</h6>
                <select
                  style={{ width: "250px" }}
                  className="form-control"
                  onChange={(evt) => setChosenClass(evt.target.value)}
                >
                  <option value=""></option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              <div className="mx-5">
                <h6>Division</h6>
                <select
                  style={{ width: "250px" }}
                  className="form-control"
                  onChange={(evt) => setChosenDivision(evt.target.value)}
                >
                  <option value=""></option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </select>
              </div>
            </div>

            {students.length ? (
              <table className="table table-striped mt-5">
                <thead>
                  <tr className="schedule-heading">
                    <th scope="col">Name</th>
                    <th scope="col">Tuition</th>
                    <th scope="col">Admission</th>
                    <th scope="col">Sports</th>
                    <th scope="col">Transport</th>
                    <th scope="col">Total</th>
                    <th scope="col">Payment</th>
                    <th scope="col"></th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((item, index) => (
                    <tr>
                      <td>{item.name}</td>
                      <td>₹ {item.fees.tuition}</td>
                      <td>₹ {item.fees.admission}</td>
                      <td>₹ {item.fees.sports}</td>
                      <td>₹ {item.fees.transport}</td>
                      <td>
                        ₹ {item.fees.tuition +
                          item.fees.transport +
                          item.fees.sports +
                          item.fees.admission}
                      </td>
                      <td>{item.paymentType}</td>
                      <td>
                        <button
                          className="btn-rounded attendance-button py-2"
                          onClick={() =>
                            handlePayFees(
                              item._id,
                              item.paymentType,
                              item.fees.tuition +
                                item.fees.transport +
                                item.fees.sports +
                                item.fees.admission,
                              item.name
                            )
                          }
                        >
                          Update transaction
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>
        ) : null}
        {toggle === "recent" ? (
          <div>
            {recentData.length ? (
              <table className="table table-striped mt-5">
                <thead>
                  <tr className="schedule-heading">
                    <th scope="col">Transaction Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {recentData.map((item, index) => (
                    <tr>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{new Date(item.date).toDateString()}</td>
                      <td>{item.amount}</td>
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

export default FeeTransactions;
