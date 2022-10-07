import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import TopMenu from "../../components/TopMenu/TopMenu";
import { FaInfoCircle } from "react-icons/fa";

import jobs from '../../components/helpers/jobs';
import "../../styles/styles.css";

const AddStaff = () => {

    const [toggle, setToggle] = useState("add");
    const [staff, setStaff] = useState('');
    const [teachers, setTeachers] = useState([]);

  const toggleToAdd = () => {
    setToggle('add')
  }

  const items = [{name: 'Add Staff', click: toggleToAdd}]

  const submitStaff = async (evt) => {
    evt.preventDefault();
    const adm = JSON.parse(window.localStorage.getItem('userdata'));

    const data = {
      staffType: staff,
      name: evt.target.elements.name.value,
      gender: evt.target.elements.gender.value,
      spouse: evt.target.elements.spouse.value,
      father: evt.target.elements.father.value,
      born: evt.target.elements.born.value,
      address: evt.target.elements.address.value,
      phone: evt.target.elements.phone.value,
      email: evt.target.elements.email.value,
      bankName: evt.target.elements.bankName.value,
      bank_acc_no: evt.target.elements.bank_acc_no.value,
      bankIFSC: evt.target.elements.bankIFSC.value,
      aadhar: evt.target.elements.aadhar.value,
      pan: evt.target.elements.pan.value,
      salary: {
        base: evt.target.elements.base.value,
        hra: evt.target.elements.hra.value,
        da: evt.target.elements.da.value,
        incentives: evt.target.elements.incentives.value,
        pf: evt.target.elements.pf.value,
        tds: evt.target.elements.tds.value,
        other: evt.target.elements.other.value,
      },
      schoolId: adm.schoolId
    }
    let res = await axios.post('/staff/addStaff', data);
    if(res.status === 200){
      swal('Staff added succesfully!', '', 'success')
    }

  }

  const submitTeacher = async (evt) => {
    evt.preventDefault();
    const adm = JSON.parse(window.localStorage.getItem('userdata'));

    const data = {
      name: evt.target.elements.name.value,
      gender: evt.target.elements.gender.value,
      spouse: evt.target.elements.spouse.value,
      father: evt.target.elements.father.value,
      born: evt.target.elements.born.value,
      address: evt.target.elements.address.value,
      phone: evt.target.elements.phone.value,
      email: evt.target.elements.email.value,
      bankName: evt.target.elements.bankName.value,
      bank_acc_no: evt.target.elements.bank_acc_no.value,
      bankIFSC: evt.target.elements.bankIFSC.value,
      aadhar: evt.target.elements.aadhar.value,
      pan: evt.target.elements.pan.value,
      salary: {
        base: evt.target.elements.base.value,
        hra: evt.target.elements.hra.value,
        da: evt.target.elements.da.value,
        incentives: evt.target.elements.incentives.value,
        pf: evt.target.elements.pf.value,
        tds: evt.target.elements.tds.value,
        other: evt.target.elements.other.value,
      },
      schoolId: adm.schoolId
    }
    let res = await axios.post('/addTeacher', data);
    if(res.status === 200){
      swal('Teacher added succesfully!', '', 'success');
    }
  }

    return(
        <div className='body'>
            <h1 className="title">ADD STAFF</h1>

        
      <TopMenu items={items} />

      <div className="mt-3"
        style={{
          width: "95%",
          padding: "5%",
          background: "white",
          borderRadius: "12px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}>

          <h5>Select staff</h5>
          <select className="form-control mt-4" onChange={(evt) => setStaff(evt.target.value)}>
            <option key={0} value=''></option>
            {
              jobs.map((item, index) => <option key={index+1} value={item}>{item}</option>)
            }
          </select>

        {toggle === "add" ?
            <div className="mt-5">
              <hr/>
                <h2 className="fw-bolder">{staff}</h2>
                {
                  staff !== 'Teacher' && staff !== '' ?
                  <form onSubmit={submitStaff} style={{width: '70%'}}>
                      <h3 className='mt-5 mb-2'>Personal details</h3>
                      <div class="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input name="name" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Full name"/>
                      </div>
                      <div class="form-group mt-3">
                        <label for="exampleFormControlSelect1">Gender</label>
                        <select name="gender" class="form-control" id="exampleFormControlSelect1">
                          <option value='male'>Male</option>
                          <option value='female'>Female</option>
                          <option value='other'>Other</option>
                        </select>
                      </div>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Spouse's name</label>
                        <input name="spouse" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Husband's/Wife's name"/>
                      </div>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Father's name</label>
                        <input name="father" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Father's name"/>
                      </div>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email address"/>
                      </div>
                      <label className="mt-3" for="inlineFormInputGroup">Mobile Number</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <div class="input-group-text">+91</div>
                        </div>
                        <input name="phone" type="text" class="form-control" id="inlineFormInputGroup" placeholder="Mobile number"/>
                      </div>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Date of birth</label>
                        <input name="born" type="date" class="form-control" id="exampleInputEmail1"/>
                      </div>
                      <div class="form-group mt-3 mb-4">
                        <label htmlFor="exampleInputEmail1">Address</label>
                        <input name="address" type="text" class="form-control" id="exampleInputEmail1" placeholder="Full Address"/>
                      </div>
                      <h3 className='mt-5 mb-2'>Id Documents</h3>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Aadhar Number</label>
                        <input name="aadhar" type="text" class="form-control" id="exampleInputEmail1" placeholder="Aadhar number"/>
                      </div>
                      <div class="form-group mt-3 mb-4">
                        <label htmlFor="exampleInputEmail1">PAN Number</label>
                        <input name="pan" type="text" class="form-control" id="exampleInputEmail1" placeholder="PAN number"/>
                      </div>
                      <h3 className='mt-5 mb-2'>Salary Structure</h3>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Base salary</label>
                        <input name="base" type="text" class="form-control" id="exampleInputEmail1" placeholder="Base pay"/>
                      </div>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">House Rent Allowance</label>
                        <input name="hra" type="text" class="form-control" id="exampleInputEmail1" placeholder="HRA"/>
                      </div>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Dearness Allowance</label>
                        <input name="da" type="text" class="form-control" id="exampleInputEmail1" placeholder="DA"/>
                      </div>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Incentives</label>
                        <input name="incentives" type="text" class="form-control" id="exampleInputEmail1" placeholder="If any"/>
                      </div>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Provident Fund Deductions</label>
                        <input name="pf" type="text" class="form-control" id="exampleInputEmail1" placeholder="PF"/>
                      </div>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Tax Deducted at Source</label>
                        <input name="tds" type="text" class="form-control" id="exampleInputEmail1" placeholder="TDS"/>
                      </div>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Other deductions</label>
                        <input name="other" type="text" class="form-control" id="exampleInputEmail1" placeholder="If any"/>
                      </div>
                      <h3 className='mt-5 mb-2'>Bank Details</h3>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Bank name</label>
                        <input name="bankName" type="text" class="form-control" id="exampleInputEmail1" placeholder="Bank name"/>
                      </div>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Bank Account Number</label>
                        <input name="bank_acc_no" type="text" class="form-control" id="exampleInputEmail1" placeholder="Account number"/>
                      </div>
                      <div class="form-group mt-3 mb-5">
                        <label htmlFor="exampleInputEmail1">Bank IFSC Code</label>
                        <input name="bankIFSC" type="text" class="form-control" id="exampleInputEmail1" placeholder="IFSC number"/>
                      </div>
                      <button
                        className="btn-rounded attendance-button"
                        type='submit'
                      >Add Staff</button>
                    </form>
                  :
                  null
                }
                
                {
                  staff === 'Teacher' ?
                  <form onSubmit={submitTeacher} style={{width: '70%'}}>
                      <h3 className='mt-5 mb-2'>Personal details</h3>
                      <div class="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input name="name" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Full name"/>
                      </div>
                      <div class="form-group mt-3">
                        <label for="exampleFormControlSelect1">Gender</label>
                        <select name="gender" class="form-control" id="exampleFormControlSelect1">
                          <option value='male'>Male</option>
                          <option value='female'>Female</option>
                          <option value='other'>Other</option>
                        </select>
                      </div>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Spouse's name</label>
                        <input name="spouse" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Husband's/Wife's name"/>
                      </div>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Father's name</label>
                        <input name="father" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Father's name"/>
                      </div>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email address"/>
                      </div>
                      <label className="mt-3" for="inlineFormInputGroup">Mobile Number</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <div class="input-group-text">+91</div>
                        </div>
                        <input name="phone" type="text" class="form-control" id="inlineFormInputGroup" placeholder="Mobile number"/>
                      </div>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Date of birth</label>
                        <input name="born" type="date" class="form-control" id="exampleInputEmail1"/>
                      </div>
                      <div class="form-group mt-3 mb-4">
                        <label htmlFor="exampleInputEmail1">Address</label>
                        <input name="address" type="text" class="form-control" id="exampleInputEmail1" placeholder="Full Address"/>
                      </div>
                      <h3 className='mt-5 mb-2'>Id Documents</h3>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Aadhar Number</label>
                        <input name="aadhar" type="text" class="form-control" id="exampleInputEmail1" placeholder="Aadhar number"/>
                      </div>
                      <div class="form-group mt-3 mb-4">
                        <label htmlFor="exampleInputEmail1">PAN Number</label>
                        <input name="pan" type="text" class="form-control" id="exampleInputEmail1" placeholder="PAN number"/>
                      </div>
                      <h3 className='mt-5 mb-2'>Salary Structure</h3>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Base salary</label>
                        <input name="base" type="text" class="form-control" id="exampleInputEmail1" placeholder="Base pay"/>
                      </div>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">House Rent Allowance</label>
                        <input name="hra" type="text" class="form-control" id="exampleInputEmail1" placeholder="HRA"/>
                      </div>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Dearness Allowance</label>
                        <input name="da" type="text" class="form-control" id="exampleInputEmail1" placeholder="DA"/>
                      </div>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Incentives</label>
                        <input name="incentives" type="text" class="form-control" id="exampleInputEmail1" placeholder="If any"/>
                      </div>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Provident Fund Deductions</label>
                        <input name="pf" type="text" class="form-control" id="exampleInputEmail1" placeholder="PF"/>
                      </div>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Tax Deducted at Source</label>
                        <input name="tds" type="text" class="form-control" id="exampleInputEmail1" placeholder="TDS"/>
                      </div>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Other deductions</label>
                        <input name="other" type="text" class="form-control" id="exampleInputEmail1" placeholder="If any"/>
                      </div>
                      <h3 className='mt-5 mb-2'>Bank Details</h3>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Bank name</label>
                        <input name="bankName" type="text" class="form-control" id="exampleInputEmail1" placeholder="Bank name"/>
                      </div>
                      <div class="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Bank Account Number</label>
                        <input name="bank_acc_no" type="text" class="form-control" id="exampleInputEmail1" placeholder="Account number"/>
                      </div>
                      <div class="form-group mt-3 mb-5">
                        <label htmlFor="exampleInputEmail1">Bank IFSC Code</label>
                        <input name="bankIFSC" type="text" class="form-control" id="exampleInputEmail1" placeholder="IFSC number"/>
                      </div>
                      <button
                        className="btn-rounded attendance-button"
                        type='submit'
                      >Add Teacher</button>
                    </form>
                    :
                    null
                }
            </div>
            :
            null
        }

        </div>
        </div>
    )

}

export default AddStaff;