import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link, animateScroll as scroll } from "react-scroll";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";

// components
import { Button } from "../../../../components/Wrappers";
import axios from "axios";

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data, thisUser, setData }) {
  const [teacherMounted, setTeacherMounted] = useState(false);
  const [studentMounted, setStudentMounted] = useState(false);
  const [col, setCol] = useState([]);
  const [user, setUser] = useState("");
  const [student, setStudent] = useState("student");
  const [teacher, setTeacher] = useState("teacher");
  const [admin, setAdmin] = useState("admin");

  const location = useLocation();

  useEffect(() => {
    setUser(window.localStorage.getItem("user"));
    if (thisUser == "admin") {
      setCol([
        "name",
        "email",
        "class",
        "roll",
        "phone",
        "division",
        "address",
        "fees",
      ]);
    } else if (thisUser == "teacher") {
      setCol([
        "name",
        "email",
        "phone",
        "Employee_id",
        "class",
        "Age",
        "degree",
      ]);
    }

    console.log("data table from useeffet..", data);
  }, []);

  console.log("table data ", data);
  // var keys = Object.keys(data[0]).map((i) => i.toUpperCase());
  // keys.shift(); // delete "id" key
  // const handleTeache rFilter = (e,urlKeyword) => {
  //   return fetch(
  //     `http://localhost:3008/filter/teacher?${urlKeyword}=${e.target.value}`
  //   ).then((data) => data.json());
  // };

  const handleDelete = async (id) => {
    let res = await axios.post('/deleteStudent', {id: id})
    if (res.status === 200){
      window.location.reload();
    }else{
      alert('Something went wrong!')
    }
  }

  return (
    <>
           <div style={{display:(thisUser!=teacher)?"none":"block"}}>
            <input
              placeholder="search by Teacher name"
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  console.log(e.target.value)
                  e.target.value = e.target.value.trim()
                    fetch(`http://localhost:3008/filter/teacher?name=${e.target.value}`)
                    .then(data=>data.json())
                    .then((data) => {
                      setData(data);
                    });
                  e.target.value = "";
                }
              }}
            />
            <select
              name="class Name"
              onChange={(e) => {
                if (e.target.value != "not") {
                  fetch(
                    `http://localhost:3008/filter/teacher?class=${e.target.value}`
                  )
                    .then((data) => data.json())
                    .then((data) => {
                      setData(data);
                    });
                }
              }}
            >
              <option value={"not"}> choose by class</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
            </select>
          </div>
         
      

      <Table className="mb-0">
        <TableHead>
          <TableRow>
            {console.log(col, "col")}
            {col.map((key, i) => (
              <TableCell key={i}>
                {key}
                {/* "sangham" */}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {data.map(({ id, name, email, product, price, date, city, status }) => ( */}
          {data &&
            data.map((st, i) => {
              {
                if (thisUser == admin) {
                  return (
                    <TableRow key={i}>
                      {/* <TableCell className="pl-3 fw-normal">{name}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{product}</TableCell>
        <TableCell>{price}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell>{city}</TableCell> */}
                <TableCell onClick={()=>{localStorage.setItem('student', JSON.stringify(st));
                      // console.log(localStorage.getItem('student'))
                    }}>
                        <Link style={{textDecoration: "none", color: "black"}} to={`/student/${st._id}`}>
                        {st.name}
                        </Link>
                        </TableCell>
                        
                      <TableCell>{st.name}</TableCell>
                      <TableCell>{st.email}</TableCell>
                      <TableCell>{st.class}</TableCell>
                      <TableCell>{st.rollnumber}</TableCell>
                      <TableCell>{st.phone}</TableCell>
                      <TableCell>{st.division}</TableCell>
                      <TableCell>{st.address}</TableCell>
                      <TableCell>
                        <Button
                          // color={states[status.toLowerCase()]}
                          size="small"
                          className="px-2"
                          variant="contained"
                        >
                          {/* {status} */}
                          Edit
                        </Button>
                        <Button
                        onClick={() => handleDelete(st._id)}
                        size='small'
                        className='px-0'
                        variant='contained'
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }

                {
                  if (thisUser == teacher) {
                    return (
                      <TableRow key={i}>
                        {/* <TableCell className="pl-3 fw-normal">{name}</TableCell>
          <TableCell>{email}</TableCell>
          <TableCell>{product}</TableCell>
          <TableCell>{price}</TableCell>
          <TableCell>{date}</TableCell>
          <TableCell>{city}</TableCell> */}
                        <TableCell>{st.name}</TableCell>
                        <TableCell>{st.email}</TableCell>
                        <TableCell>{st.phone}</TableCell>
                        <TableCell>{st.employee_id}</TableCell>
                        <TableCell>{"st.class[0].division"}</TableCell>
                        <TableCell>{st.age}</TableCell>
                        <TableCell>{"st.degree[0]"}</TableCell>
                        <TableCell>
                          <Button
                            // color={states[status.toLowerCase()]}
                            size="small"
                            className="px-2"
                            variant="contained"
                          >
                            {/* {status} */}
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  }
                }
              }

              // for teacher showing the data
            })}

          {!data && "data is empty"}
        </TableBody>
      </Table>
    </>
  );
}
