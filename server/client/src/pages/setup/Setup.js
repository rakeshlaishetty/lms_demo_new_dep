import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import TopMenu from "../../components/TopMenu/TopMenu";
import { FaUserCircle, FaUserFriends } from "react-icons/fa";
import books from '../../images/books2.png'
import pencil from '../../images/pencil.png'

import "../../styles/styles.css";

const Setup = () => {
    const [toggle, setToggle] = useState('view');
    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [chosenClass, setChosenClass] = useState('');

    const history = useHistory();

    const getTeachers = async () => {
        const adm = JSON.parse(window.localStorage.getItem('userdata'));
        let res = await axios.get(`/getTeachers?schoolId=${adm.schoolId}`);
        if(res.status === 200){
            setTeachers(res.data);
        }
    }

    const getClasses = async () => {
        const adm = JSON.parse(window.localStorage.getItem('userdata'));
        let res = await axios.get(`/classes/getClasses?schoolId=${adm.schoolId}`);
        if(res.status === 200){
            setClasses(res.data);
        }
    }

    useEffect(() => {
        getTeachers();
        getClasses();
    }, [])

    const toggleToAdd = () => {
        setToggle('add');
    }

    const toggleToView = () => {
        setToggle('view');
    }

    const handleClassSubmit = async (evt) => {
        evt.preventDefault();

        if(evt.target.elements.class.value === ''){
            swal('Please choose a class!', '', 'warning');
            return
        }

        const adm = JSON.parse(window.localStorage.getItem('userdata'));

        let data = {
            class: evt.target.elements.class.value,
            division: evt.target.elements.division.value,
            faculty: evt.target.elements.faculty.value,
            school: adm.schoolId
        }

        let res = await axios.post('/addClass', data);
        if(res.status === 200){
            swal('Class created successfully!', 'You can now assign students, subjects and create schedules', 'success');
            
        }else{
            swal('Something went wrong!', 'Please try again', 'error');
        }
    }

    const handleFacultySubmit = async (evt) => {
        evt.preventDefault();
    }

    const items = [{name: 'View classes', click: toggleToView}, {name: 'Add class', click: toggleToAdd}]

    return(
        <div className='body'>

        <h1 className="title">SETUP</h1>
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
            toggle === 'view' ?
            <div style={{width: '100%'}}>
                {
                    classes.length ?
                    <table className="table table-striped">
                        <thead>
    <tr className="schedule-heading">
      <th scope="col">Sr No.</th>
      <th scope="col">Class</th>
      <th scope="col">Students</th>
      <th scope="col">Faculty</th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {
        classes.map((item, index) => 
            <tr style={{height: '50px'}} key={index}>
                <th scope="row">{index+1}</th>
      <td>{item.class} {item.division}</td>
      <td>{item.count}</td>
      <td>{item.faculty.name}</td>
      <td><a className='link mx-3' onClick={() => history.push({pathname: `/app/class-details/${item._id}/${item.class}/${item.division}`, state:{id: item._id, class: item.class, division: item.division}})}>Details</a></td>
      <td>
      <div>
                    <input
                      class="modal-btn"
                      type="checkbox"
                      id="modal-btn"
                      name="modal-btn"
                    />
                    <label onClick={() => setChosenClass(item._id)} htmlFor="modal-btn">Assign faculty</label>
                    <div class="modal">
                      <div class="modal-wrap">
                        <h3 className="mt-2">Assign faculty</h3>
                        <hr />
                        <form
                          onSubmit={(evt) =>
                            handleFacultySubmit(evt)
                          }
                        >
                          <p>Choose faculty from the list below</p>
                          <select
                            name="facultyId"
                            className="form-control"
                            style={{ width: "50%" }}
                          >
                            {teachers.map((item) => (
                              <option value={item._id}>{item.name}</option>
                            ))}
                          </select>

                          <button
                            type="submit"
                            className="btn mt-3"
                            style={{
                              backgroundColor: "#eeb316",
                              color: "white",
                            }}
                          >
                            Save
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
      </td>
            </tr>
        
        )
    }
  </tbody>
                    </table>
                    // <div className='d-flex flex-wrap justify-content-between align-items-center'>
                    //     {
                    //         classes.map((item, index) => 
                    //             <div key={index} className="class-card d-flex">
                    //                 <div className='class-card-left d-flex justify-content-around align-items-center'>
                    //                     <h3>{item.class} {item.division}</h3>
                    //                 </div>
                    //                 <div className='class-card-right d-flex flex-column align-items-start justify-content-around'>
                    //                     <div className="mx-1"><FaUserFriends/> <span className="mx-2">{item.count} students</span></div>
                    //                     <div className="d-flex justify-content-between align-items-center">
                    //                         <span style={{fontStyle: 'italic'}}><FaUserCircle/> {item.faculty.name}</span>
                    //                         <a className='link mx-3' onClick={() => history.push({pathname: `/app/class-details/${item._id}/${item.class}/${item.division}`, state:{id: item._id, class: item.class, division: item.division}})}>Details</a>
                    //                     </div>
                    //                 </div>
                    //             </div>
                    //         )
                    //     }
                    // </div>
                    :
                    <div style={{textAlign: 'center'}}>
                        <img src={books} style={{height: '150px'}}/>
                        <h2 className="mt-2">You haven't added any class yet...</h2>
                    </div>
                }
            </div>
            :
            null
        }

        {
            toggle === 'add' ?
            <div className='bg-white px-5 py-4' style={{height: 'auto', borderRadius: '12px', width: '90%', marginLeft: 'auto', marginRight: 'auto'}}>
                <form onSubmit={handleClassSubmit}>
                    <div className="form-group">
                        <label for="class-select"><h6>Class</h6></label>
                        <select name='class' className="form-control mt-1" id="class-select" style={{width: '40%'}} required>
                            <option value=''></option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                            <option value='7'>7</option>
                            <option value='8'>8</option>
                            <option value='9'>9</option>
                            <option value='10'>10</option>
                        </select>
                    </div>
                    <div class="form-group mt-3">
                        <label for="division"><h6>Division</h6></label>
                        <input type="text" name='division' className="form-control mt-1" id="division" style={{width: '40%'}} placeholder="Ex. A/B/C" required/>
                    </div>
                    <div className="form-group mt-3">
                        <label for="class-select"><h6>Assign faculty</h6></label>
                        <select name='faculty' className="form-control mt-1" id="class-select" style={{width: '40%'}} required>
                            {
                                teachers.map((item) => <option value={item._id}>{item.name}</option>)
                            }
                        </select>
                    </div>

                    <button type='submit' className="btn mt-5" style={{width: '15%', backgroundColor: "#eeb316", color: "white" }}>Save</button>
                </form>
            </div>
            :
            null
        }

      </div>

        </div>
    )
}

export default Setup;