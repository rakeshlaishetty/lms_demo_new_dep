import React, { useState, useEffect } from "react";
import "../../styles/styles.css";
import TopMenu from "../../components/TopMenu/TopMenu";
import axios from "axios";
import { Button } from "@material-ui/core";
export default  () => {
  const [toggle, setToggle] = useState("announcements");
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
      .get("/getTeacherAnnouncement", {
        params: { schoolId, TeacherId: _id, seen: false },
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
      .get("/getTeacherAnnouncement", {
        params: { schoolId, TeacherId: _id, seen: true },
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
      <h1 className="title">Teacher Announcement</h1>
      {toggle === "announcements" ? (
      
        <div className="mt-3">
          <h3 className="mt-5">please Select </h3>
          <div style={{maxWidth:'450px'}} className="d-flex">
          <TopMenu items={items1} />
          </div>
            
            {loading?<h1>loading ...</h1>:""}
          
        </div>
      ) : (
        ""
      )}
      {toggle === "newAnnouncement" ? (
            <div className="main">
              <Button
            variant="contained"
            color="secondary"
            className="mb-3"
            onClick={back2}
          >
           Back
          </Button>
              <h1>new announcement</h1>
              
              {newAnnouncement.map((x, i) => {
                return (
                  <div key={i}>
                    <p>{x.message}</p>
                  </div>
                );
              })}
              {!loading && !newAnnouncement.length?<div>no new Announcement</div>:<Button
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
            <div className="">
                <Button
            variant="contained"
            color="secondary"
            className="mb-3"
            onClick={back2}
          >
           Back
          </Button>
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
};