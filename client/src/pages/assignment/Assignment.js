import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import TopMenu from "../../components/TopMenu/TopMenu";
import Switch from "react-switch";
import { FaDownload } from "react-icons/fa";

import "../../styles/styles.css";
import trash from "../../images/trash.png";

const Assignment = () => {
  const [toggle, setToggle] = useState("view");
  const [assignments, setAssignments] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [chapter, setChapter] = useState(null);
  const [classes, setClasses] = useState([]);
  const [timeLimit, setTimeLimit] = useState(false);

  const history = useHistory();

  const getClasses = async () => {
    const teacher = JSON.parse(window.localStorage.getItem("userdata"));
    let res = await axios.get(`/classes/getClasses?schoolId=${teacher.schoolId}`);
    if (res.status === 200) {
      setClasses(res.data);
    }
  };

  useEffect(() => {
    getClasses();
  }, [])

  const getAssignments = async () => {
    const teacher = JSON.parse(window.localStorage.getItem("userdata"));

    let res = await axios.get(
      `/assignments/getAssignments?facultyId=${teacher._id}`
    );
    if (res.status === 200) {
      setAssignments(res.data);
    }
  };

  const toggleToView = () => {
    setToggle("view");
  };
  const toggleToCreate = () => {
    setToggle("create");
  };

  useEffect(() => {
    getAssignments();
  }, []);

  const items = [
    { name: "View Assignments", click: toggleToView },
    { name: "Create Assignment", click: toggleToCreate },
  ];

  const deleteAssignment = async (id) => {
    swal({
      title: "Are you sure you want to delete this assignment?",
      text: "Once deleted, you will not be able to recover this assignment",
      icon: "warning",
      buttons: true
    })
    .then(async (willDelete) => {
      if (willDelete) {
        let res = await axios.post(`/assignments/deleteAssignment`, {id: id});
        if(res.status === 200){
          window.location.reload();
        }
      } else {
        return;
      }
    });
  }

  const handleAssignmentSubmit = async (evt) => {
      evt.preventDefault();
      const teacher = JSON.parse(window.localStorage.getItem("userdata"));

      let subjectId = null;
      for(let item of classes){
        if(item._id === evt.target.elements.class.value){
          if(!item.subjects.length){
            swal('No subjects!', 'The chosen class does not seem to have been assigned any subjects. Please contact the administrator to assign subjects', 'warning');
            return;
          }
          for(let subject of item.subjects){
            if(subject.faculty === teacher._id){
              subjectId = subject.subjectId;
            }
          }
          
        }
        
      }

      if(!subjectId){
        swal('Please choose the right class', 'You do not seem to be teaching any subject to the chosen class. Please ensure you have selected the right class and division', 'warning');
        return;
      }

      let res = await axios.post('/assignments/createAssignment', 
      { facultyId: teacher._id, 
        name: evt.target.elements.name.value, 
        class: evt.target.elements.class.value, 
        deadline: evt.target.elements.deadline.value,
        subjectId: subjectId,
        mins: typeof evt.target.elements.mins !== 'undefined' ? evt.target.elements.mins.value : null,
        sec: typeof evt.target.elements.sec !== 'undefined' ? evt.target.elements.sec.value : null
      });
      if(res.status === 200){
        swal('Assignment created successfully', 'Make sure you assign questions to this assignment', 'success')
        .then((value) => {
          window.location.reload();
        });
        
      }

  }

  return (
    <div className="body">
      <h1 className="title">ASSIGNMENTS</h1>
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
        {toggle === "view" ? (
          <div>
            {assignments.length ? (
              <table className="table table-striped">
                <thead>
                  <tr className="schedule-heading">
                    <th scope="col">Sr No.</th>
                    <th scope="col">Assignment Name</th>
                    {/* <th scope="col">Class</th> */}
                    <th scope="col">Created</th>
                    <th scope="col">Deadline</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>

                <tbody>
                  {assignments.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.assignmentName}</td>
                      {/* <td>{item.class}</td> */}
                      <td>{new Date(item.date).toDateString()}</td>
                      <td>{new Date(item.deadline).toDateString()}</td>
                      <td>
                        <button
                          className="btn-rounded attendance-button py-2 px-2"
                          onClick={() =>
                            history.push({
                                pathname: `/app/assignments/${item._id}`,
                                state: {
                                    id: item._id
                                }
                            })
                          }
                        >
                          View more
                        </button>
                      </td>
                      <td>
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                          }}
                          onClick={() => deleteAssignment(item._id)}
                        >
                          <img style={{height: '24px', width: 'auto'}} className="trash" src={trash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>
        ) : null}

        {toggle === "create" ? 
        
        <form onSubmit={handleAssignmentSubmit}>
            <div className="form-group">
    <label htmlFor="name">Assignment name</label>
    <input type="text" className="form-control" id="name" placeholder="Ex. Quadratic equations Assignment"/>
  </div>

  <div className="form-group mt-4">
    <label htmlFor="class">Class</label>
    <select name='class' className="form-control" id="class">
        {
          classes.map((item, index) => <option value={item._id} key={index}>{item.class} - {item.division}</option>)
        }
    </select>
  </div>

  <div className="form-group mt-4">
        <label htmlFor="date">Deadline</label>
        <input type='datetime-local' name='deadline' className='form-control' id='date'/>
  </div>

  <div className="form-group mt-4">
      <div className="d-flex align-items-center">
      <label>Time limit</label>
      <Switch className="mx-5" height={20} width={45} checkedIcon={false} uncheckedIcon={false} onColor="#eeb316" onChange={() => setTimeLimit(!timeLimit)} checked={timeLimit} />
      </div>
      {
        timeLimit ?
        <div style={{width: '65%'}} className="mt-3 d-flex justify-content-between align-items-center">
          <label htmlFor='mins'>Minutes</label>
        <input id='mins' name="mins" type='number' className="form-control" style={{width: '150px'}}/>
        <label htmlFor='sec'>Seconds</label>
        <input id='sec' name="sec" type='number' className="form-control" style={{width: '150px'}}/>
        </div>
        :
        null
      }
  </div>

  <button style={{width: '100px', marginLeft: 'auto', marginRight: 'auto'}} type='submit' className='bt-rounded attendance-button py-2 mt-5'>Create</button>
        </form> 
        
        : 
        null}
      </div>
    </div>
  );
};

export default Assignment;
