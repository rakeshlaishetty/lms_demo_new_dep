import React, { useState, useEffect } from "react";
import "../../styles/styles.css";
import axios from "axios";
import { Button } from "@material-ui/core";
import AddDocument from "../addDocument/AddDocument";
import TopMenu from "../../components/TopMenu/TopMenu";
import empty from '../../images/empty-folder.png';

import ShareDocument from "./shareDocument";

export default  () => {
  const [toggle, setToggle] = useState("library");
  const [loading ,setLoading]= useState(false)
  const [libraryData,setLibraryData]= useState([])
  const [shareDocument,setShareDocumet]=useState('')
  const [ showShareDocument,setShowShareDocument ] = useState(false)
  const [ showLibrary,setShowLibrary ] = useState(true)
  
  const toggleToAddDocument = () => {
    // alert("function not defiend");
    setToggle("addDocument");
  };
  const back=()=>{
    setShowShareDocument(false)
    setShowLibrary(true)
  }
  const toggleToLibrary=()=>{
    setToggle("library");
  }

  const getDocuments = async () => {
    const teacher = JSON.parse(window.localStorage.getItem('userdata'))
    // console.log(teacher)
    axios.get("/LibraryData",{params:{teacherId:teacher._id,schoolId:teacher.schoolId}})
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

  const items = [{ name: "Your Documents", click: toggleToLibrary }, {name: 'Add Document', click: toggleToAddDocument}];
  
  return (
    
   <div className="body">
    {
      showLibrary?(
        <div className="body">
        <h1 className="title">LIBRARY</h1>
        <TopMenu items={items} />
    {
      toggle==="library"?
      <div
        className="mt-3"
        style={{
          width: "95%",
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
      {/* <button
        className='mt-5 mb-4 ms-4 attendance-button btn-rounded'
        type="submit"
        style={{width: 'auto'}}
        onClick={toggleToAddDocument}
      >
        Add Document
      </button> */}
    

        {
          libraryData.length ?
          <table class="table table-striped mt-5">
          <thead>
            <tr className="schedule-heading">
              <th scope="col">Sr No.</th>
              <th scope="col">Date</th>
              <th scope="col">Documents Name</th>
              <th scope="col">Document Type</th>
              <th scope="col">Share</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              libraryData.map((item, index) => 
              <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>{item.name}</td>
                  <td>{item.DocType}</td>
                  <td><button className="btn-rounded attendance-button py-2" onClick={()=>{
                    setShareDocumet( item ) 
                    setShowShareDocument(true)
                    setShowLibrary(false)
                  }}>Share</button></td>
                  <td><button className="btn-rounded attendance-button py-2" 
                  onClick={async()=>{
                    let res = await axios.post("/deleteLibraryDocument",{params:{_id:item._id}})
                    if( res.status==200 ) console.log("deleted",res.data)
                  }}
                  >Delete</button></td>
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
    </div>:null
    }

  {toggle==="addDocument"?<div>
  
  <AddDocument/>
  </div>:""}
 
</div>
      ):""
    }
    {
      showShareDocument?( <div className="bg-white">
          <Button
        variant="contained"
        color="secondary"
        type="submit"
        className="mb-4 mt-5 ms-4"
        onClick={back}
      >
        back
      </Button>
      <ShareDocument shareDocument={shareDocument} />
    </div>):""
    }

   </div>
  );
};