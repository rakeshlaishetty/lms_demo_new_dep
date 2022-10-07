import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import TopMenu from "../../components/TopMenu/TopMenu";
import { FaDownload } from "react-icons/fa";

import jobs from '../../components/helpers/jobs';
import "../../styles/styles.css";

const Salary = () => {
  const [toggle, setToggle] = useState("credit");
  const [staffType, setStaffType] = useState('');
  const [staff, setStaff] = useState([]);
  const [salaryData, setSalaryData] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [salaryTransactions, setSalaryTransactions] = useState([]);

  const history = useHistory();

  const getStaff = async () => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));

    if(staffType && staffType !== 'Teacher'){
      let res = await axios.get(`/staff/getStaff?staffType=${staffType}&schoolId=${adm.schoolId}`);
      if(res.status === 200){
        setStaff(res.data);
        return;
      }
    }
    else if(staffType === 'Teacher'){
      let res = await axios.get(`/getTeachers?schoolId=${adm.schoolId}`);
      if(res.status === 200){
        setStaff(res.data);
        return;
      }
    }
  }

  useEffect(() => {
    setStaffType('')
  }, [toggle])

  useEffect(() => {
    if(staffType){
      getStaff();
    }
  }, [staffType])

  const handleSalaryTransactions = async (evt) => {
    evt.preventDefault();

    let res = await axios.get(`/staff/getSalaryTransactions?empId=${evt.target.elements.empId.value}`)
    if(res.status === 200){
      setSalaryTransactions(res.data);
    }

  }

  const creditSalary = async (empId, amount) => {
    let res = await axios.post('/staff/creditSalary', {empId, amount});
    if(res.status === 200){
      swal('Salary credited successfully', '', 'success');
    }else{
      swal('Something went wrong', '', 'error');
    }
  }

  const confirmation = (name, empId, amount) => {
    swal({
      title: `Salary being credited to ${name}`,
      text: "Do you wish to proceed?",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        creditSalary(empId, amount);
      } else {
        return
      }
    });
  }

  const generateSalarySlip = async (item) => {
    const data = {};

    let res = await axios.get(`/staff/getEmployee?empId=${item.employeeId}`);
        if(res.status === 200){
            data['staff'] = res.data;
        }

        const adm = JSON.parse(window.localStorage.getItem('userdata'));

        data['admin'] = adm;

        res = await axios.get(`/getSchool?id=${adm.schoolId}`);
        if(res.status === 200){
            data['school'] = res.data
        }

      history.push({
        pathname: `/app/salary-slip/${item.employeeId}`,
        state: {data: data}
      }
      )
  }

  
  const toggleToCredit = () => {
    setToggle('credit');
  }
  const toggleToTransactions = () => {
    setToggle('transactions');
  }

  const items = [
    { name: "Credit salary", click: toggleToCredit },
    { name: "View transactions", click: toggleToTransactions }
  ];

  return(
    <div className='body'>
        <h1 className="title">SALARY</h1>
      <TopMenu items={items} />

      <div className="mt-3"
        style={{
          width: "95%",
          padding: "5%",
          background: "white",
          borderRadius: "12px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}>
        
        {
            toggle === 'credit' ?
            
<div>
<h5>Select staff</h5>
          <select className="form-control mt-4" onChange={(evt) => setStaffType(evt.target.value)}>
            <option key={0} value=''></option>
            {
              jobs.map((item, index) => <option key={index+1} value={item}>{item}</option>)
            }
          </select>

          {
                  staff.length ?
                  <table class="table table-striped mt-5">
                    
                    <thead>
                      <tr className="schedule-heading">
                        {/* <th scope="col">Employee ID</th> */}
                        <th scope="col">Name</th>
                        <th scope="col">Base</th>
                        <th scope="col">HRA</th>
                        <th scope="col">DA</th>
                        <th scope="col">Incentives</th>
                        <th scope="col">PF</th>
                        <th scope="col">TDS</th>
                        <th scope="col">Other</th>
                        <th scope="col">Net</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        staff.map((item, index) => (
                          <tr key={index}>
                            {/* <th scope='row'>{item._id}</th> */}
                            <td>{item.name}</td>
                            <td>{item.salary.base}</td>
                            <td>{item.salary.hra}</td>
                            <td>{item.salary.da}</td>
                            <td>{item.salary.incentives}</td>
                            <td>{item.salary.tds}</td>
                            <td>{item.salary.pf}</td>
                            <td>{item.salary.other}</td>
                            <td><strong>{
                              item.salary?
                              item.salary.base+
                              item.salary.hra+
                              item.salary.da+
                              item.salary.incentives-
                              item.salary.tds-
                              item.salary.pf-
                              item.salary.other
                              :""
                              }</strong></td>
                              <td><button onClick={() => confirmation(item.name, item._id, item.salary.base+
                              item.salary.hra+
                              item.salary.da+
                              item.salary.incentives-
                              item.salary.tds-
                              item.salary.pf-
                              item.salary.other)} className="btn-rounded py-2 attendance-button">Credit</button></td>
                          </tr>
                          )
                        )
                      }
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
            toggle === 'transactions' ?
            <div>
              <form onSubmit={handleSalaryTransactions} className="d-flex justify-content-between align-items-center">
                <div>
                    <h6>Select staff type</h6>
                    <select className="form-control" onChange={(evt) => setStaffType(evt.target.value)}>
                    {
                      jobs.map((item, index) => <option key={index+1} value={item}>{item}</option>)
                    }
                    </select>
                </div>
                <div className='mx-5'>
                    <h6>Select Employee</h6>
                    <select style={{width: '300px'}} name='empId' className="form-control">
                    {
                      staff.map((item, index) => <option key={index} value={item._id}>{item.name}</option>)
                    }
                    </select>
                </div>
                <button className="btn-rounded attendance-button">Fetch</button>
              </form>

              {
                salaryTransactions.length ?
                <table class="table table-striped mt-5">
                    
                <thead>
                  <tr className="schedule-heading">
                    {/* <th scope="col">Employee ID</th> */}
                    <th scope="col">Sr No.</th>
                    <th scope="col">Date</th>
                    <th scope="col">Amount (₹)</th>
                    <th scope="col"></th>
                  </tr>
                </thead>

                <tbody>
                    {
                      salaryTransactions.map((item, index) => 
                        <tr>
                          <td>{index+1}</td>
                          <td>{item.date}</td>
                          <td>{item.amount}</td>
                          <td><button onClick={() => generateSalarySlip(item)} className="btn-rounded py-2 attendance-button"><FaDownload/> Salary slip</button></td>
                        </tr>
                      )
                    }
                </tbody>

                </table>
                :
                null

              }
            </div>
            :
            null
        }
      </div>

    </div>)
}

export default Salary;