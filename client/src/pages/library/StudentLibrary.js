import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import TopMenu from "../../components/TopMenu/TopMenu";
import empty from '../../images/empty-folder.png';

const StudentLibrary = () => {
    const [toggle, setToggle] = useState('view');
    const [libraryData, setLibraryData] = useState([]);

    const toggleToView = () => {
        setToggle('view');
    }

    const items = [{name: 'Your Documents', click: toggleToView}];

    const getDocuments = async () => {
        const student = JSON.parse(window.localStorage.getItem('userdata'))

        axios.get(`/getStudentDocuments?schoolId=${student.schoolId}&classId=${student.class}`)
        .then(res=>{
          if ( res.status==200 ){
            setLibraryData(res.data)
          }
          else{
            console.log('error while getting library data')
          }
        })
        .catch(e=>console.log(e))
      }
    
      useEffect(() => {
        getDocuments();   
      }, [])

    return(
        <div className="body">
      <h1 className="title">YOUR LIBRARY</h1>
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

{
          libraryData.length ?
          <table class="table table-striped mt-5">
          <thead>
            <tr className="schedule-heading">
              <th scope="col">Sr No.</th>
              <th scope="col">Date</th>
              <th scope="col">Documents Name</th>
              <th scope="col">Document Type</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
              libraryData.map((item, index) => 
              <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>{new Date(item.date).toDateString()}</td>
                  <td>{item.name}</td>
                  <td>{item.DocType}</td>
                  <td><button>Download</button></td>
              </tr>
          )
            }
          </tbody>
        </table>
        :
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img src={empty} style={{height: '150px'}}/>
          <h5 className="mt-3">No Documents added.</h5>
          </div>
        }
        </div>
        </div>)
}

export default StudentLibrary;