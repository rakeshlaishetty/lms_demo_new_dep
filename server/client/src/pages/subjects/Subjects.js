import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import TopMenu from "../../components/TopMenu/TopMenu";
import { Checkbox } from "@material-ui/core";
import FormControlLabel from "@mui/material/FormControlLabel";

import "../../styles/styles.css";

const Subjects = (props) => {
  const [toggle, setToggle] = useState("view");
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [chosenClass, setChosenClass] = useState("");
  const [index, setIndex] = useState(0);

  const history = useHistory();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const toggleToView = () => {
    setToggle("view");
  };

  const toggleToAdd = () => {
    setToggle("add");
  };

  const items = [
    { name: "Subjects", click: toggleToView },
    { name: "Create", click: toggleToAdd },
  ];

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const checkboxes = document.getElementsByName("division");
    const selectedCboxes = Array.prototype.slice
      .call(checkboxes)
      .map((ch) => (ch.checked ? ch.value : null));

    if (!selectedCboxes.length) {
      swal("Please choose the divisions to assign the subject", "", "warning");
      return;
    }
    const adm = JSON.parse(window.localStorage.getItem("userdata"));
    let data = {
      name: evt.target.elements.subjectName.value,
      class: evt.target.elements.subjectClass.value,
      divisions: selectedCboxes,
      schoolId: adm.schoolId,
    };

    let res = await axios.post("/addSubject", data);
    if (res.status === 200) {
      swal(
        "Course created successfully",
        "Please assign faculties to the new course created for all divisions",
        "success"
      ).then((res) => window.location.reload());
    } else {
      swal("Something went wrong", "Please try again", "error");
    }
  };

  const getSubjects = async () => {
    const adm = JSON.parse(window.localStorage.getItem("userdata"));
    let res = await axios.get(`/getSubjects?schoolId=${adm.schoolId}`);
    if (res.status === 200) {
      setSubjects(res.data);
    }
  };
  const getClasses = async () => {
    const adm = JSON.parse(window.localStorage.getItem("userdata"));
    let res = await axios.get(`/classes/getClasses?schoolId=${adm.schoolId}`);
    if (res.status === 200) {
      setClasses(res.data);
    }
  };

  useEffect(() => {
    getSubjects();
    getClasses();
  }, []);

  return (
    <div className="body">
      <h1 className="title">SUBJECTS</h1>
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
            <h5>Choose class</h5>
            <select
              style={{ width: "200px" }}
              className="form-control mt-1"
              onChange={(evt) => setIndex(evt.target.value)}
            >
              <option value="0">5</option>
              <option value="1">6</option>
              <option value="2">7</option>
              <option value="3">8</option>
              <option value="4">9</option>
              <option value="5">10</option>
            </select>
            {subjects.length ? (
              <div className="d-flex justify-content-between mt-4 flex-wrap">
                {subjects[index].map((item) => (
                  <div className="class-card mb-4">
                    <div className="class-card-top">
                      <h3>{item.name}</h3>
                    </div>
                    <div className="class-card-bottom px-4 py-3">
                      Class {item.class}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {toggle === "add" ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="inputSubject" className="label">
                Subject name
              </label>
              <input
                name="subjectName"
                type="text"
                className="form-control mt-2"
                id="inputSubject"
                placeholder="Ex. Geography"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="inputClass" className="label">
                Assign class
              </label>
              <select
                name="subjectClass"
                id="inputClass"
                className="form-control mt-2"
                onChange={(evt) => setChosenClass(evt.target.value)}
              >
                <option value=""></option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            {chosenClass !== "" ? (
              <div className="mt-3">
                <label className="label">Choose divisions</label>
                <div
                  className="form-group mt-1 d-flex justify-content-between flex-wrap"
                  style={{ width: "30%" }}
                >
                  {classes.map((item, index) =>
                    item.class === parseInt(chosenClass) ? (
                      <div
                        key={index}
                        className="custom-control custom-checkbox"
                      >
                        {/* <input name='division' value={item.division} type="checkbox" className="custom-control-input" id={index}/>
                                        <label className="custom-control-label" htmlFor={index}>{item.class} {item.division}</label> */}
                        <FormControlLabel
                          name="division"
                          value={item.division}
                          control={<Checkbox defaultChecked style={{ color: "#eeb316" }}/>}
                          label={item.class + " " + item.division}
                        />
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            ) : null}
            <button
              type="submit"
              className="btn mt-4"
              style={{ backgroundColor: "#eeb316", color: "white" }}
            >
              Create course
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default Subjects;
