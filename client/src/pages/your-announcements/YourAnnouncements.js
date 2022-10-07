import React, { useState, useEffect } from "react";
import "../../styles/styles.css";
import TopMenu from "../../components/TopMenu/TopMenu";
import axios from "axios";
import { Button } from "@material-ui/core";
import speaker from "../../images/speaker.png";


export default  () => {
  const [toggle, setToggle] = useState("newAnnouncement");
  const [newAnnouncement, setNewAnnouncement] = useState([]);
  const [oldAnnouncement, setOldAnnouncement] = useState([]);
  const [loading ,setLoading]= useState(false)

  const toggleToNewAnnouncement=()=>{
    setToggle("newAnnouncement")
  }
  const toggleToOldAnnouncement=()=>{
    setToggle("oldAnnouncement")
  }
 
  const back2=()=>{
    setToggle("announcements");
  }

  const items1 = [
    { name: "New Announcement", click: toggleToNewAnnouncement },
    { name: "Old Announcement", click: toggleToOldAnnouncement },
  ];


  function getNewAnnouncement() {
    const { _id, schoolId } = JSON.parse(
      window.localStorage.getItem("userdata")
    );
    setLoading(true)
    console.log(_id, "_id");
    axios
      .get("/getStudentAnnouncement", {
        params: { schoolId, studentId: _id, seen: false },
      })
      .then((res) => {
        if (res.status == 200) {
          setNewAnnouncement(res.data);
          setLoading(false)
        }
      })
      .catch((e) => {console.log(e)
      setLoading(false)});
  }
  function getOldAnnouncement() {
    const { _id, schoolId } = JSON.parse(
      window.localStorage.getItem("userdata")
    );
    setLoading(true)
    axios
      .get("/getStudentAnnouncement", {
        params: { schoolId, studentId: _id, seen: true },
      })
      .then((res) => {
        if (res.status == 200) {
          setOldAnnouncement(res.data);
          console.log("here you ready to go", res.data, "here you go");
        }
        setLoading(false)
      })
      .catch((e) => {console.log(e)
      setLoading(false)});
  }
  useEffect(() => {
    getNewAnnouncement();
    getOldAnnouncement();
  }, []);


  return (
    <div className="body">
      <h1 className="title">YOUR ANNOUNCEMENTS</h1>
      <TopMenu items={items1} />
      {toggle === "announcements" ? (
      
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
      
          <div style={{maxWidth:'450px'}} className="d-flex">
          
          </div>
            
            {loading?<h1>loading ...</h1>:""}
          
        </div>
      ) : (
        ""
      )}
      {toggle === "newAnnouncement" ? (
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
              {newAnnouncement.map((x, i) => {
                return (
                  <div key={i}>
                    <p>{x.message}</p>
                  </div>
                );
              })}
              {!loading && !newAnnouncement.length?<div className="mt-5 d-flex flex-column justify-content-evenly align-items-center">
                      <img style={{ height: "140px" }} src={speaker} />
                      <h6 className="text-muted mt-4">No new announcements</h6>
                    </div>:<Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  console.log("mark as done");
                  const { _id, schoolId } = JSON.parse(
                    window.localStorage.getItem("userdata")
                  );
                  console.log("====+", schoolId, " ++*", _id);
                  axios
                    .post("/updateTeacherAnnouncement/status", {
                      schoolId: schoolId,
                      TeacherId: _id,
                      seen: false,
                    })
                    .then((res) => {
                      if (res.status === 200) {
                        console.log(res.data);
                        console.log("hey man");
                      }
                    });
                }}
              >
                Mark all as Read
              </Button>}
              
            </div>
          ) : (
            ""
          )}
          
          {toggle === "oldAnnouncement" ? (
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
                
              <h1>oldAnnouncement</h1>
              {oldAnnouncement.map((x, i) => {
                return (
                  <div key={i}>
                    <p>{x.message}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
      
     
    </div>
  );

}
