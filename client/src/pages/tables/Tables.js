import React, { useEffect, useState } from "react";
import {
  Grid,
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableHead,
} from "@material-ui/core";
// import MUIDataTable, { TableBody, TableHead } from "mui-datatables";
import {
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  TextField,
  makeStyles,
  Button,
} from "@material-ui/core";
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import CustomTable from "../dashboard/components/Table/Table";
import useStyles from "../dashboard/styles";
// data
import mock from "../dashboard/mock";
import axios from "axios";
const datatableData = [
  ["Joe James", "Example Inc.", "Yonkers", "NY"],
  ["John Walsh", "Example Inc.", "Hartford", "CT"],
  ["Bob Herm", "Example Inc.", "Tampa", "FL"],
  ["James Houston", "Example Inc.", "Dallas", "TX"],
  ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
  ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
  ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
  ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
  ["Meral Elias", "Example Inc.", "Hartford", "CT"],
  ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
  ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
  ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
  ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
  ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
  ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
  ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
  ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
];

const assign = ["No.", "Assignment Name", "Subject", "Chapter", "Action"];
const assignStatusCol = ["No.", "Name", "Roll NO.", "Marks", "Submission Date"];
export default function Tables() {
  const [teachers, setTeachers] = useState([]);
  const [addBTN, setAddBTN] = useState(false);
  const [currentAssignmentName, setCurrentAssignmentName] = useState("");
  const [assignStatus, setAssignStatus] = useState(false);

  var classes = useStyles();
  const btnClick = () => {
    console.log("latest report btn is clicked");
    setAddBTN(!addBTN);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher({ ...newTeacher, [name]: value });
    console.log("the new student is ", newTeacher);
    console.log("teacher input is made");
  };

  const [newTeacher, setNewTeacher] = useState({});
  const [currentUser, setCurrentUser] = useState("");
  const [loggedUser, setLoggedUser] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [isAssign, setIsAssign] = useState(false);
  const [perticularAssignment, setPerticularAssignment] = useState({});

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3008/addTeacher", newTeacher).then((res) => {
      console.log("the res api is ,", res.data);

      if (res.data.status == true) {
        getAllTeachers();
        setAddBTN(false);
        console.log(
          "the student is save dand the api is hit and that is false",
        );
      }
    });
    console.log("the new student is ", newTeacher);
  };
  const getAllTeachers = () => {
    axios
      .get("http://localhost:3008/allTeachers")
      .then((res) => {
        console.log("res from api teachers ", res.data.teachers);
        setTeachers(res.data.teachers);

        console.log("froms states ", teachers);
      })
      .catch((e) => {
        console.log("error while getting all the students , ", e);
      });
  };

  const getAllAssignmets = () => {
    // if (currentUser == "teacher") {
    axios
      .post("/getAllAssignment", { facName: loggedUser.name })
      .then((res) => {
        console.log("this is the getAllAssignment", res.data);
        setAssignments(res.data.aiss);
      })
      .catch((e) => {
        console.log("error while getAllAssignment client ", e);
      });
    // }
  };

  const getPerticularAssignment = (id) => {
    axios
      .post("/getPerticularAssignment", {
        id: id,
      })
      .then((res) => {
        console.log("this is the getPerticularAssignment", res.data);
        // setAssignments(res.data.aiss);
        setPerticularAssignment(res.data.aiss);
        console.log("quesions for pa", res.data.aiss.questions);
      })
      .catch((e) => {
        console.log("error while getAllAssignmentStudent client ", e);
      });
  };
  useEffect(() => {
    const cuser = window.localStorage.getItem("user");
    setCurrentUser(cuser);
    setLoggedUser(JSON.parse(localStorage.getItem("userdata")));
    getAllTeachers();
    // getAllAssignmets();
  }, []);
  return (
    <>
      <PageTitle
        button={currentUser == "admin" ? "Add Teacher" : ""}
        handleClick={currentUser == "admin" ?  btnClick  : ""}
        title={currentUser == "admin" ? "Teachers" : "Assignment Status"}
      />

      {currentUser == "admin" ? (
        <>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              {/* <MUIDataTable
            title="Employee List"
            data={datatableData}
            columns={["Name", "Company", "City", "State"]}
            options={{
              filterType: "checkbox",
            }}
          /> */}
            </Grid>
            <Grid item xs={12}>
              {addBTN == false ? (
                <Widget
                  title={`${currentUser} Teachers`}
                  upperTitle
                  noBodyPadding
                >
                  <CustomTable thisUser="teacher" data={teachers} setData={setTeachers} />
                </Widget>
              ) : (
                <>
                  <form>
                    <Grid
                      container
                      spacing={2}
                      style={{ marginBottom: "20px" }}
                    >
                      <Grid item xs={1}></Grid>
                      <Grid item xs={5}>
                        <TextField
                          // id="outlined-textarea"
                          label="Name"
                          placeholder="Name"
                          name="name"
                          fullWidth
                          style={{ width: "350px" }}
                          className={classes.textfield}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          // id="outlined-textarea"
                          label="Email"
                          placeholder="Email"
                          name="email"
                          style={{ width: "350px" }}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        />
                      </Grid>
                      <Grid item xs={1}></Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      style={{ marginBottom: "20px" }}
                    >
                      <Grid item xs={1}></Grid>
                      <Grid item xs={5}>
                        <TextField
                          // id="outlined-textarea"
                          label="Phone"
                          placeholder="Phone Number"
                          name="phone"
                          fullWidth
                          style={{ width: "350px" }}
                          className={classes.textfield}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          // id="outlined-textarea"
                          label="Address"
                          placeholder="Address"
                          name="address"
                          style={{ width: "350px" }}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        />
                      </Grid>
                      <Grid item xs={1}></Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      style={{ marginBottom: "20px" }}
                    >
                      <Grid item xs={1}></Grid>
                      <Grid item xs={5}>
                        <TextField
                          // id="outlined-textarea"
                          label="Employee ID"
                          placeholder="Employee ID"
                          name="employee_id"
                          fullWidth
                          style={{ width: "350px" }}
                          className={classes.textfield}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          // id="outlined-textarea"
                          label="Division"
                          placeholder="Division"
                          name="division"
                          style={{ width: "350px" }}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        />
                      </Grid>
                      <Grid item xs={1}></Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      style={{ marginBottom: "20px" }}
                    >
                      <Grid item xs={1}></Grid>
                      <Grid item xs={2}>
                        <TextField
                          // id="outlined-textarea"
                          label="Attendence"
                          placeholder="Attendence"
                          name="attendence"
                          fullWidth
                          style={{ width: "100px" }}
                          className={classes.textfield}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          // id="outlined-textarea"
                          label="Class"
                          placeholder="only Number"
                          name="class"
                          style={{ width: "100px" }}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          // id="outlined-textarea"
                          label="Age"
                          placeholder="Age"
                          name="age"
                          style={{ width: "100px" }}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          // id="outlined-textarea"
                          label="Degree"
                          placeholder="Degree"
                          name="degree"
                          style={{ width: "100px" }}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        />
                      </Grid>

                      <Grid item xs={1}></Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={5}>
                        <TextField
                          // id="outlined-textarea"
                          label="Salary"
                          placeholder="Salary"
                          name="salary"
                          fullWidth
                          style={{ width: "150px" }}
                          className={classes.textfield}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submitt"
                          onClick={(e) => {
                            handleStudentSubmit(e);
                            console.log("subit teacher is clicked");
                          }}
                        >
                          Admit Faculty
                        </Button>
                      </Grid>
                      <Grid item xs={1}></Grid>
                    </Grid>
                  </form>
                </>
              )}
            </Grid>
            {/* <h1>this is new</h1> */}
          </Grid>
        </>
      ) : (
        ""
      )}

      {currentUser == "teacher" ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setAssignStatus(false);
                  setIsAssign(true);
                  getAllAssignmets();
                }}
              >
                All Assignments
              </Button>
              {isAssign == true ? (
                <div>
                  <br />

                  <Table className="mb-0" style={{ width: "900px" }}>
                    <TableHead>
                      <TableRow>
                        {assign.map((col, i) => (
                          <TableCell>
                            <h4>{col}</h4>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {assignments.map((a, i) => (
                        <TableRow key={i}>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell>{a.assignmentName}</TableCell>
                          <TableCell>{a.subject}</TableCell>
                          <TableCell>{a.chapter}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                setCurrentAssignmentName(a.assignmentName);
                                getPerticularAssignment(a._id);
                                setIsAssign(false);
                                setAssignStatus(true);
                              }}
                            >
                              Status
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                ""
              )}

              {assignStatus == true ? (
                <>
                  <div>
                    <br />
                    <h2>{currentAssignmentName}</h2>
                    <br />
                    {perticularAssignment.submission?.length > 0 ? (
                      <Table className="mb-0" style={{ width: "900px" }}>
                        <TableHead>
                          <TableRow>
                            {assignStatusCol.map((col, i) => (
                              <TableCell>
                                <h4>{col}</h4>
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {perticularAssignment.submission?.map((s, i) => (
                            <TableRow key={i}>
                              <TableCell>{i + 1}</TableCell>
                              <TableCell>{s.name}</TableCell>
                              <TableCell>{s.rollnumber}</TableCell>
                              <TableCell>{s.marks}</TableCell>
                              <TableCell>00/00/00</TableCell>
                              {/* <TableCell>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                setCurrentAssignmentName(a.assignmentName);
                                getPerticularAssignment(a.assignmentName);
                              }}
                            >
                              Status
                            </Button>
                          </TableCell> */}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <h1 style={{ color: "red" }}>No responses yet...</h1>
                    )}
                  </div>
                </>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </>
      ) : (
        ""
      )}
    </>
  );
}
