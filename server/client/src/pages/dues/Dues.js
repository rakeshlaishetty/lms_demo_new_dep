import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import TopMenu from "../../components/TopMenu/TopMenu";
import { FaDownload } from "react-icons/fa";

import "../../styles/styles.css";

const Dues = () => {
  const [toggle, setToggle] = useState("dues");
  const [classes, setClasses] = useState([]);
  const [duesClass, setDuesClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [duesData, setDuesData] = useState(null);
  const [totalPaid, setTotalPaid] = useState(0);
  const [date, setDate] = useState(new Date());

  const history = useHistory();

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                  'October', 'November', 'December'];

  const getClasses = async () => {
    const adm = JSON.parse(window.localStorage.getItem("userdata"));
    let res = await axios.get(`/classes/getClasses?schoolId=${adm.schoolId}`);
    if (res.status === 200) {
      setClasses(res.data);
    }
  };

  const getStudents = async () => {
    let res = await axios.get(`/getStudentsList?classId=${duesClass}`);
    if (res.status === 200) {
      setStudents(res.data);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  useEffect(() => {
    if (duesClass) {
      getStudents();
    }
  }, [duesClass]);

  const getDues = async (evt) => {
    evt.preventDefault();
    const adm = JSON.parse(window.localStorage.getItem("userdata"));
    let res = await axios.get(
      `/fees/getDues?studentId=${evt.target.elements.studentId.value}&schoolId=${adm.schoolId}`
    );
    if (res.status === 200) {
      setDuesData(res.data);
      let total = 0;
      for (let item of res.data.installmentData) {
        total += item.amount;
      }
      setTotalPaid(total);
    }
  };

  const handleEmail = async (item) => {
    const data = {
      title: "Request for Payment of fees",
      email: item.email,
      dues:
        (item.fees.admission +
          item.fees.tuition +
          item.fees.sports +
          item.fees.transport) /
        12,
    };
    let res = await axios.post("/sendEmail", data);
    if (res.status === 200) {
      swal("Email sent successfully", "", "success");
    }
  };

  const generateReceipt = async (item, index) => {
    const data = {};
    const adm = JSON.parse(window.localStorage.getItem('userdata'));


      let res = await axios.post(`getStudent`, {id: item.studentId});
        if(res.status === 200){
            data['student'] = res.data;
        }

        data['admin'] = adm;

        res = await axios.get(`/getSchool?id=${adm.schoolId}`);
        if(res.status === 200){
            data['school'] = res.data
        }

        data['feeData'] = item;
        data['installmentNumber'] = index;

      history.push({
        pathname: `/app/fee-receipt/${item._id}`,
        state: {data: data}
      }
      )
  }

  const toggleToDues = () => {
    setToggle("dues");
  };
  const toggleToPenalty = () => {
    setToggle("penalty");
  };
  const toggleToEmail = () => {
    setToggle("email");
  };
  const toggleToSMS = () => {
    setToggle("sms");
  };

  const items = [{ name: "View dues", click: toggleToDues }];

  return (
    <div className="body">
      <h1 className="title">DUES</h1>
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
        {toggle === "dues" ? (
          <div>
            <form
              className="mt-4 d-flex justify-content-start align-items-center"
              onSubmit={getDues}
            >
              <label htmlFor="admissionClass">Class</label>
              <select
                id="admissionClass"
                style={{ width: "200px" }}
                className="form-control mx-3"
                onChange={(evt) => setDuesClass(evt.target.value)}
                required
              >
                <option value=""></option>
                {classes.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.class} {item.division}
                  </option>
                ))}
              </select>

              <label htmlFor="admissionClass">Student</label>
              <select
                name="studentId"
                style={{ width: "200px" }}
                className="form-control mx-3"
                required
              >
                {students.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="btn-rounded attendance-button mx-5"
              >
                Fetch
              </button>
            </form>

            {duesData ? (
              <div>
                <div className="d-flex justify-content-between align-items-center mt-5">
                  <div style={{width: '30%'}} className="attendance-card">
                    <h1>₹ {totalPaid}</h1>
                    <p className="mt-4">Total Amount Paid</p>
                  </div>
                  <div style={{width: '30%'}} className="attendance-card">
                    <h1>₹ {duesData.totalPayable - totalPaid}</h1>
                    <p className="mt-4">Total Amount Pending</p>
                  </div>
                  <div style={{width: '30%'}} className="attendance-card">
                    <h1>{duesData.paymentType}</h1>
                    <p className="mt-4">Payment Type</p>
                  </div>
                </div>

                {
                  duesData.installmentData.length ?
                  <table className="mt-5 table table-striped">
                  <thead>
                    <tr className="schedule-heading">
                      <th scope="col">Transaction ID</th>
                      <th scope="col">Date</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Installment</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {duesData.installmentData.map((item, index) => (
                      <tr>
                        <td>{item._id}</td>
                        <td>{new Date(item.date).toDateString()}</td>
                        <td>₹ {item.amount}</td>
                        <td>
                          {index + 1}/{duesData.totalInstallments}
                        </td>
                        <td>
                          <button onClick={() => generateReceipt(item, index+1)} className="btn-rounded attendance-button py-2">
                            <FaDownload /> Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                :
                <h3 style={{width: '100%', marginLeft: 'auto', marginRight: 'auto'}} className="text-muted my-5">No transactions yet!</h3>
                }

                <div style={{width: '100%'}} className={duesData.defaulter ? 'alert alert-danger' : 'alert alert-warning'}>
                      {
                        duesData.defaulter ?
                        <p>Due date elapsed on {(new Date(duesData.nextDue)).toDateString()}</p>
                        :
                        duesData.nextDue ?
                        <p>Next Due Date: {(new Date(duesData.nextDue)).toDateString()}</p>
                        :
                        null
                      }
                </div>

                <div
                  style={{
                    width: "80%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  className="mt-4 d-flex justify-content-around align-items-center"
                >
                  {
                    duesData.defaulter ?
                    <button
                    style={{ width: "auto" }}
                    className="btn-rounded attendance-button"
                  >
                    Send reminder Email
                  </button>
                  :
                  null
                  }
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Dues;
