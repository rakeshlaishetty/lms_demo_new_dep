import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import empty from "../../images/empty-folder.png";
import gold from '../../images/1.png'
import silver from '../../images/2.png'
import bronze from '../../images/3.png'
import "../../styles/styles.css";

const Rank = (props) => {
    const [data, setData] = useState([]);

    const getAssignment = async () => {
        let res = await axios.get(`/assignments/getAssignmentsPerformance?id=${props.id}`);
        if(res.status === 200){
            setData(res.data);
        }
    }

    useEffect(() => {
        getAssignment();
    }, [])

    const location = useLocation();

    return(
        <div className="body">
    <h1 className="title">YOUR RANKING</h1>

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

        <table className="table table-striped">
        <thead>
    <tr className="schedule-heading">
      <th scope="col">Rank</th>
      <th scope="col">Name</th>
      <th scope="col">Marks</th>
    </tr>
  </thead>
  <tbody>
    {
        data.map((item, index) => 
            <tr>
                <td>{index+1 === 1 ? <img className="medal" src={gold}/> : index+1 === 2 ? <img className="medal" src={silver}/> : index+1 === 3 ? <img className="medal" src={bronze}/> : index+1}</td>
                <td>{item.name}</td>
                <td>{item.marks}</td>
            </tr>
        )
    }   
    </tbody>
        </table>
        </div>

        </div>
    )
}

export default Rank;