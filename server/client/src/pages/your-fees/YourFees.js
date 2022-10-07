import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";


import TopMenu from "../../components/TopMenu/TopMenu";
import { FaDownload } from "react-icons/fa";

import "../../styles/styles.css";

const YourFees = () => {

    const [toggle, setToggle] = useState("structure");
    const [student, setStudent] = useState(null);
    const [duesData, setDuesData] = useState(null);
    const [totalPaid, setTotalPaid] = useState(0);

    const history = useHistory();

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                  'October', 'November', 'December'];

    const getStudent = async () => {
        let student = JSON.parse(window.localStorage.getItem("userdata"));

        let res = await axios.post(`/getStudent`, {id: student._id});
        if(res.status === 200){
            setStudent(res.data);
        }
    }

    const getDues = async () => {
        const stud = JSON.parse(window.localStorage.getItem("userdata"));
        let res = await axios.get(
          `/fees/getDues?studentId=${stud._id}&schoolId=${stud.schoolId}`
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
    

    useEffect(() => {
        getStudent();
    }, []);


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
    
    
    useEffect(() => {
        if(student){
            getDues();
        }
    }, [student]);

    const toggleToStructure = () => {
        setToggle("structure");
    };

    const toggleToInstallments = () => {
        setToggle("installments");
    };

    const toggleToDues = () => {
        setToggle("dues");
    };

    const items = [{ name: "Fee Structure", click: toggleToStructure }, 
                   { name: "Your Installments", click: toggleToInstallments }
                  ];

    return(
        <div className="body">
    <h1 className="title">YOUR FEES</h1>
    <TopMenu items={items} />

    <div
        className="mt-3"
        style={{
          width: "98%",
          padding: "5%",
          background: "white",
          borderRadius: "12px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch'
        }}
      >

        {
            toggle === 'structure' ?
            <div>
                {
                    student ?
                    <table className="table table-striped">
                        <thead>
    <tr className="schedule-heading">
      <th scope="col">Sr. No.</th>
      <th scope="col">Particulars</th>
      <th scope="col">Amount</th>
    </tr>
  </thead> 

  <tbody>
    {
        Object.entries(student.fees).map((key, i) => 
            (
                <tr>
                <th scope="row">{i+1}</th>
                <td>{key[0].toUpperCase()}</td>
                <td>₹ {key[1]}</td>
           </tr>
            )
          )
    }
    <tr>
        <td></td>
        <td></td>
        <td><strong>₹ {student.fees.tuition + student.fees.transport + student.fees.sports + student.fees.admission}</strong></td>
    </tr>
  </tbody>

                    </table>
                    :
                    null
                }

            </div>
            :
            null
        }

        {
            toggle === 'installments' ?
            <div>
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
            :
            null
        }


        {
            toggle === 'dues' ?
            <div>

            </div>
            :
            null
        }
        </div>

        </div>
    )
    
}

export default YourFees;